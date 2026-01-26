# 🔬 Plant Disease Detection Service

FastAPI service for detecting plant diseases from images using deep learning.

## Features

- Instant disease identification
- MobileNetV2 CNN model
- High accuracy predictions
- Treatment recommendations

## Model Details

- **Model Type**: MobileNetV2 (PyTorch)
- **Input**: Plant leaf/stem image (JPEG, PNG, WebP)
- **Output**: Disease name, confidence, and treatment suggestions
- **Image Size**: 224x224 pixels (resized automatically)

## API Endpoints

### POST /infer
Detect plant disease from uploaded image.

**Authentication:** Required (Bearer Token)

**Headers:**
```
Authorization: Bearer hackathon-secret-token
```

**Request:** Multipart form data
- Field name: `file`
- File type: Image (JPEG, PNG, WebP)

**Response:**
```json
{
  "success": true,
  "disease": "Tomato Early Blight",
  "confidence": 0.95,
  "top_predictions": [
    {
      "label": "Tomato Early Blight",
      "prob": 0.95
    }
  ],
  "model_version": "mnv2-hf-v1"
}
```

### GET /health
Health check endpoint with model status.

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run the service
python app.py
# Or use uvicorn directly
uvicorn main:app --host 0.0.0.0 --port 7860
```

## Docker

```bash
# Build image
docker build -t plant-disease-detection .

# Run container
docker run -p 7860:7860 plant-disease-detection
```

## Hugging Face Deployment

This service is deployed on Hugging Face Spaces:
https://huggingface.co/spaces/khushal-grover2005/plant-disease-api

## Model Files

The model files should be in `artifacts_backup/`:
- `model_mnv2.pt` - Trained MobileNetV2 model
- `class_index.json` - Class labels mapping

