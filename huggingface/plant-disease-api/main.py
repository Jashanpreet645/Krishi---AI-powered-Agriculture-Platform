import os
import json
import torch
import cv2
import numpy as np
import time
import base64
import io
from torchvision import models
import torch.nn as nn
import torch.nn.functional as F
from fastapi import FastAPI, File, UploadFile, Header, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import uvicorn

# Import our configuration
from config import settings, validate_setup

# Global variable for class_map
class_map = None

def setup_model():
    """Load and setup the ML model"""
    global class_map
    
    print("📁 Checking existing files:")
    print(f"Model: {'✅' if os.path.exists(settings.model_path) else '❌'} {settings.model_path}")
    print(f"Classes: {'✅' if os.path.exists(settings.class_path) else '❌'} {settings.class_path}")
    
    # Validate setup
    if not validate_setup():
        return None, None
    
    # Load class mapping
    with open(settings.class_path) as f:
        class_map = json.load(f)
    
    # Convert string keys to integers and create proper mapping
    class_map = {int(k): v for k, v in class_map.items()}
    num_classes = len(class_map)
    print(f"📊 Loaded {num_classes} classes")
    
    # Setup device and model
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"🔧 Using device: {device}")
    
    try:
        # Load MobileNetV2 model
        model = models.mobilenet_v2(weights=None)
        model.classifier[1] = nn.Linear(model.last_channel, num_classes)
        
        # Load the model with proper error handling
        model_data = torch.load(settings.model_path, map_location=device)
        
        # Handle different model saving formats
        if isinstance(model_data, dict) and 'state_dict' in model_data:
            model.load_state_dict(model_data['state_dict'])
        else:
            model.load_state_dict(model_data)
            
        model = model.to(device)
        model.eval()
        
        print("✅ Model loaded successfully!")
        return model, device
        
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        print("💡 Try checking if the model architecture matches MobileNetV2")
        return None, None

def preprocess_image(img_bgr, img_size=224):
    """Preprocess image for model inference"""
    img = cv2.resize(img_bgr, (img_size, img_size))
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB).astype(np.float32) / 255.0
    mean = np.array([0.485, 0.456, 0.406], dtype=np.float32)
    std = np.array([0.229, 0.224, 0.225], dtype=np.float32)
    img_norm = (img_rgb - mean) / std
    tensor = torch.from_numpy(img_norm.transpose(2, 0, 1)).unsqueeze(0)
    return tensor

def predict_image(model, device, img_bgr, topk=3):
    """Run prediction on image"""
    # Preprocess image
    tensor = preprocess_image(img_bgr)
    tensor = tensor.to(device)
    
    # Run inference
    model.eval()
    with torch.no_grad():
        logits = model(tensor)
        probs = F.softmax(logits, dim=1).cpu().numpy()[0]
    
    # Get top predictions
    topk_idx = probs.argsort()[-topk:][::-1]
    
    topk_pairs = []
    for i in topk_idx:
        topk_pairs.append({
            "label": class_map[int(i)], 
            "prob": float(probs[int(i)])
        })
    
    return topk_pairs

def setup_fastapi(model, device):
    """Setup FastAPI application"""
    app = FastAPI(
        title="Plant Disease Inference API",
        version=settings.model_version,
        description="AI-powered plant disease detection API"
    )
    
    # Add CORS middleware to allow frontend requests
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    @app.get("/")
    def root():
        return {
            "message": "Plant Disease Detection API",
            "version": settings.model_version,
            "endpoints": {
                "health": "/health",
                "infer": "/infer",
                "docs": "/docs"
            }
        }
    
    @app.get("/health")
    def health():
        return {
            "status": "ok",
            "model": "mobilenet_v2",
            "version": settings.model_version,
            "device": str(torch.cuda.get_device_name(0) if torch.cuda.is_available() else "CPU"),
            "classes_loaded": len(class_map) if class_map else 0
        }
    
    @app.post("/infer")
    async def infer(file: UploadFile = File(...), authorization: str = Header(default="")):
        if authorization != f"Bearer {settings.api_token}":
            raise HTTPException(status_code=401, detail="Unauthorized")
        
        try:
            # Validate file type
            if not file.content_type.startswith('image/'):
                raise HTTPException(status_code=400, detail="File must be an image")
            
            # Read and process image
            content = await file.read()
            img = Image.open(io.BytesIO(content)).convert("RGB")
            img_bgr = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
            
            # Run prediction
            predictions = predict_image(model, device, img_bgr, topk=3)
            top_prediction = predictions[0]
            
            return {
                "success": True,
                "disease": top_prediction["label"],
                "confidence": top_prediction["prob"],
                "top_predictions": predictions,
                "model_version": settings.model_version
            }
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")
    
    return app

def create_fallback_app():
    """Create a fallback app if model loading fails"""
    app = FastAPI(
        title="Plant Disease Inference API (Fallback Mode)",
        version=settings.model_version,
        description="API is running but model failed to load"
    )
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    @app.get("/")
    def root():
        return {
            "message": "Plant Disease Detection API",
            "status": "model_not_loaded",
            "error": "Model failed to load during initialization"
        }
    
    @app.get("/health")
    def health():
        return {
            "status": "error",
            "message": "Model failed to load",
            "model_path": settings.model_path,
            "class_path": settings.class_path
        }
    
    @app.post("/infer")
    async def infer(file: UploadFile = File(...), authorization: str = Header(default="")):
        if authorization != f"Bearer {settings.api_token}":
            raise HTTPException(status_code=401, detail="Unauthorized")
        
        raise HTTPException(
            status_code=503, 
            detail="Service unavailable: Model failed to load during initialization"
        )
    
    return app

def main():
    """Main application setup - returns the app for Hugging Face"""
    print(f"🚀 Initializing Plant Disease Detection API v{settings.model_version}")
    print(f"🔑 API Token: {settings.api_token}")
    print(f"🌐 Host: {settings.host}")
    print(f"🚪 Port: {settings.port}")
    
    # Setup model
    model, device = setup_model()
    if model is None or device is None:
        print("❌ Failed to setup model. Creating fallback API...")
        app = create_fallback_app()
    else:
        # Setup FastAPI app with loaded model
        app = setup_fastapi(model, device)
        print("✅ API setup complete! Ready for deployment.")
    
    return app

# Create app instance for Hugging Face
app = main()

# When run locally, this will still work
if __name__ == "__main__":
    # Only run the server locally if not on Hugging Face
    if "SPACES" not in os.environ:
        print("🔧 Running in local mode...")
        uvicorn.run(app, host=settings.host, port=settings.port, log_level=settings.log_level)
    else:
        print("🏢 Running on Hugging Face Spaces - server will be started by the platform")