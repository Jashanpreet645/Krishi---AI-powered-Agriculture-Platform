# 🧪 Fertilizer Recommendation Service

FastAPI service for recommending fertilizers based on crop type and soil conditions.

## Features

- Precise fertilizer recommendations
- Crop and soil-specific suggestions
- Includes application remarks
- Bearer token authentication

## Model Details

- **Model Type**: Machine Learning Classifier
- **Input Features**: Temperature, Moisture, Rainfall, pH, NPK levels, Carbon, Soil Type, Crop Name
- **Output**: Recommended fertilizer with remarks

## API Endpoints

### POST /predict
Get fertilizer recommendations.

**Authentication:** Required (Bearer Token)

**Headers:**
```
Authorization: Bearer team_krishi_fert
```

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
  "Soil": "Loamy Soil",
  "Crop": "Wheat"
}
```

**Response:**
```json
{
  "fertilizer": "Urea",
  "remark": "Apply Urea fertilizer for optimal growth..."
}
```

### GET /health
Health check endpoint.

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Set environment variables
export BEARER_TOKEN=team_krishi_fert

# Run the service
python app.py
```

## Hugging Face Deployment

This service is deployed on Hugging Face Spaces:
https://huggingface.co/spaces/khushal-grover2005/Fertilizer_Recommendation

