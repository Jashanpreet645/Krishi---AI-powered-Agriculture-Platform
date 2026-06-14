---
title: Crop Recommendation
emoji: 🌱
colorFrom: green
colorTo: blue
sdk: docker
pinned: false
---

# 🌾 Crop Recommendation Service

FastAPI service for recommending crops based on environmental and soil conditions.

## Features

- Predicts top 3 most suitable crops
- Uses CatBoost/XGBoost machine learning model
- Fast inference with pre-trained models
- RESTful API interface

## Model Details

- **Model Type**: CatBoost/XGBoost Classifier
- **Input Features**: Temperature, Moisture, Rainfall, pH, Nitrogen, Phosphorous, Potassium, Carbon, Soil Type
- **Output**: Top 3 crop recommendations with confidence scores

## API Endpoints

### POST /predict
Get crop recommendations based on input parameters.

**Request Body:**
```json
{
  "Temperature": 25.0,
  "Moisture": 0.6,
  "Rainfall": 150.0,
  "PH": 6.5,
  "Nitrogen": 50.0,
  "Phosphorous": 50.0,
  "Potassium": 50.0,
  "Carbon": 1.0,
  "Soil": "Loamy Soil"
}
```

**Response:**
```json
[
  {
    "rank": 1,
    "crop": "Wheat",
    "confidence": "95.23%"
  },
  {
    "rank": 2,
    "crop": "Rice",
    "confidence": "3.45%"
  },
  {
    "rank": 3,
    "crop": "Corn",
    "confidence": "1.32%"
  }
]
```

### GET /health
Health check endpoint.

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run the service
python app.py
```

The service will start on `http://localhost:7860`

## Docker

```bash
# Build image
docker build -t crop-recommendation .

# Run container
docker run -p 7860:7860 crop-recommendation
```

## Hugging Face Deployment

This service is deployed on Hugging Face Spaces:
https://huggingface.co/spaces/khushal-grover2005/Crop_Recommendation

