import os
import joblib
import uvicorn
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# --- Configuration ---
MODEL_DIR = "models"
MODEL_PATH = os.path.join(MODEL_DIR, "crop_recommendation_model.pkl")
ENCODER_PATH = os.path.join(MODEL_DIR, "label_encoder.pkl")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")
COLUMNS_PATH = os.path.join(MODEL_DIR, "model_columns.pkl")
NUMERIC_COLUMNS_PATH = os.path.join(MODEL_DIR, "numeric_columns.pkl")

# --- Initialize FastAPI App ---
app = FastAPI(
    title="Crop Recommendation API",
    description="An API to predict the top 3 most suitable crops based on environmental data.",
    version="1.0.0"
)

# Add CORS middleware to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Global variables for model components ---
model = None
label_encoder = None
scaler = None
model_columns = None
numeric_columns = None
load_error = None

# --- Load Model and Preprocessors ---
def load_components():
    global model, label_encoder, scaler, model_columns, numeric_columns, load_error
    
    try:
        print("🔍 Attempting to load model components...")
        
        # Try different loading methods for the model
        loading_methods = [
            ("joblib", lambda: joblib.load(MODEL_PATH)),
            ("xgboost", lambda: load_xgboost_model(MODEL_PATH)),
            ("catboost", lambda: load_catboost_model(MODEL_PATH)),
        ]
        
        for method_name, load_func in loading_methods:
            try:
                print(f"🔄 Trying to load model with {method_name}...")
                model = load_func()
                print(f"✅ Model loaded successfully with {method_name}")
                print(f"📊 Model type: {type(model)}")
                break
            except Exception as e:
                print(f"❌ Failed to load with {method_name}: {str(e)}")
                continue
        
        if model is None:
            raise Exception("All model loading methods failed")
        
        # Load other components
        print("🔄 Loading preprocessors...")
        label_encoder = joblib.load(ENCODER_PATH)
        scaler = joblib.load(SCALER_PATH)
        model_columns = joblib.load(COLUMNS_PATH)
        numeric_columns = joblib.load(NUMERIC_COLUMNS_PATH)
        
        print("✅ All components loaded successfully!")
        load_error = None
        
    except Exception as e:
        error_msg = f"Error loading components: {str(e)}"
        print(f"❌ {error_msg}")
        load_error = error_msg
        model = label_encoder = scaler = model_columns = numeric_columns = None

def load_xgboost_model(model_path):
    """Load XGBoost model"""
    try:
        import xgboost as xgb
        # Try loading as XGBoost model
        model = xgb.Booster()
        model.load_model(model_path)
        return model
    except:
        # If that fails, try joblib loading (which might work for XGBoost models too)
        return joblib.load(model_path)

def load_catboost_model(model_path):
    """Load CatBoost model"""
    try:
        from catboost import CatBoostClassifier
        model = CatBoostClassifier()
        model.load_model(model_path)
        return model
    except:
        # Fall back to joblib
        return joblib.load(model_path)

# Load components on startup
load_components()

# --- Define Input and Output Schemas ---
class CropInput(BaseModel):
    Temperature: float
    Moisture: float
    Rainfall: float
    PH: float
    Nitrogen: float
    Phosphorous: float
    Potassium: float
    Carbon: float
    Soil: str

class CropOutput(BaseModel):
    rank: int
    crop: str
    confidence: str

# --- Prediction function for XGBoost models ---
def predict_with_xgboost(model, input_data):
    """Make predictions with XGBoost model"""
    import xgboost as xgb
    
    # Convert to DMatrix for XGBoost
    dmatrix = xgb.DMatrix(input_data)
    
    # Get predictions
    predictions = model.predict(dmatrix)
    
    # For binary classification, convert probabilities
    if predictions.ndim == 1 and len(predictions) == input_data.shape[0]:
        # Assuming binary classification
        probabilities = np.column_stack([1 - predictions, predictions])
    else:
        probabilities = predictions
    
    return probabilities

# --- Prediction Endpoint ---
@app.post("/predict", response_model=list[CropOutput])
async def predict_crop(data: CropInput):
    """
    Predicts the top 3 most suitable crops based on input data.
    """
    if not all([model, label_encoder, scaler, model_columns, numeric_columns]):
        if load_error:
            raise HTTPException(status_code=503, detail=f"Model loading failed: {load_error}")
        else:
            raise HTTPException(status_code=503, detail="Model is not available. Please check server logs.")

    try:
        input_df = pd.DataFrame([data.dict()])

        # Feature Engineering (must match the training script)
        input_df['N_P_ratio'] = input_df['Nitrogen'] / (input_df['Phosphorous'] + 1)
        input_df['N_K_ratio'] = input_df['Nitrogen'] / (input_df['Potassium'] + 1)
        input_df['P_K_ratio'] = input_df['Phosphorous'] / (input_df['Potassium'] + 1)
        input_df['Rain_Temp_ratio'] = input_df['Rainfall'] / (input_df['Temperature'] + 1)
        input_df['Moisture_PH'] = input_df['Moisture'] * input_df['PH']

        input_df_processed = pd.get_dummies(input_df, columns=['Soil'])
        input_df_aligned = input_df_processed.reindex(columns=model_columns, fill_value=0)
        
        # Use the loaded numeric_columns list for scaling
        input_df_aligned[numeric_columns] = scaler.transform(input_df_aligned[numeric_columns])

        # Handle different model types
        model_type = type(model).__name__
        
        if 'XGB' in model_type or 'Booster' in model_type:
            # XGBoost model
            pred_proba = predict_with_xgboost(model, input_df_aligned.values)[0]
        elif hasattr(model, 'predict_proba'):
            # Scikit-learn style model
            pred_proba = model.predict_proba(input_df_aligned)[0]
        else:
            # Fallback: use predict and assume 100% confidence
            prediction = model.predict(input_df_aligned)[0]
            crop_name = label_encoder.inverse_transform([prediction])[0]
            return [CropOutput(rank=1, crop=crop_name, confidence="100.00%")]

        top3_indices = pred_proba.argsort()[-3:][::-1]
        top3_crops = label_encoder.inverse_transform(top3_indices)
        top3_confidences = pred_proba[top3_indices]

        response = [
            CropOutput(
                rank=i + 1,
                crop=crop,
                confidence=f"{confidence:.2%}"
            ) for i, (crop, confidence) in enumerate(zip(top3_crops, top3_confidences))
        ]
        return response

    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"An error occurred during prediction: {str(e)}"
        )

# --- Health Check Endpoint ---
@app.get("/")
def read_root():
    return {"status": "Crop Recommendation API is running."}

@app.get("/health")
def health_check():
    """Health check endpoint for monitoring"""
    model_loaded = all([model, label_encoder, scaler, model_columns, numeric_columns])
    model_type = type(model).__name__ if model else "None"
    
    return {
        "status": "healthy" if model_loaded else "unhealthy", 
        "model_loaded": model_loaded,
        "model_type": model_type,
        "load_error": load_error,
        "components_loaded": {
            "model": model is not None,
            "label_encoder": label_encoder is not None,
            "scaler": scaler is not None,
            "model_columns": model_columns is not None,
            "numeric_columns": numeric_columns is not None
        }
    }

# --- Reload endpoint for debugging ---
@app.post("/reload")
async def reload_components():
    """Force reload of model components (for debugging)"""
    load_components()
    return {"status": "Components reloaded", "error": load_error}

# Run the application
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7860)