import os
import joblib
import uvicorn
import pandas as pd
from fastapi import FastAPI, HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel

# --- Server Configuration ---
SERVER_HOST = "0.0.0.0"
SERVER_PORT = 7860

# Get Bearer Token from Environment Variable (Hugging Face Secret)
BEARER_TOKEN = os.environ.get("BEARER_TOKEN")

# --- Model Configuration ---
MODEL_DIR = "models"
MODEL_NAME = "fertilizer_recommendation_model.pkl"
ENCODER_NAME = "fertilizer_label_encoder.pkl"
SCALER_NAME = "fertilizer_scaler.pkl"
COLUMNS_NAME = "fertilizer_model_columns.pkl"
NUMERIC_COLUMNS_NAME = "fertilizer_numeric_columns.pkl"
REMARK_MAP_NAME = "fertilizer_remark_map.pkl"

# --- Initialize FastAPI App ---
app = FastAPI(
    title="Fertilizer Recommendation API",
    description="An API to predict the most suitable fertilizer based on environmental and crop data.",
    version="1.0.0"
)

# --- Bearer Token Security ---
security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    """Checks if the provided Bearer token is valid."""
    if not BEARER_TOKEN:
        raise HTTPException(
            status_code=500, detail="Bearer token not configured"
        )
    if credentials.scheme != "Bearer" or credentials.credentials != BEARER_TOKEN:
        raise HTTPException(
            status_code=403, detail="Invalid or missing Bearer token"
        )
    return credentials.credentials

# --- Load Model and Preprocessors ---
model = None
label_encoder = None
scaler = None
model_columns = None
numeric_columns = None
remark_map = None
load_error = None

try:
    # Suppress sklearn version warnings
    import warnings
    from sklearn.exceptions import InconsistentVersionWarning
    warnings.filterwarnings("ignore", category=InconsistentVersionWarning)
    
    model = joblib.load(os.path.join(MODEL_DIR, MODEL_NAME))
    label_encoder = joblib.load(os.path.join(MODEL_DIR, ENCODER_NAME))
    scaler = joblib.load(os.path.join(MODEL_DIR, SCALER_NAME))
    model_columns = joblib.load(os.path.join(MODEL_DIR, COLUMNS_NAME))
    numeric_columns = joblib.load(os.path.join(MODEL_DIR, NUMERIC_COLUMNS_NAME))
    remark_map = joblib.load(os.path.join(MODEL_DIR, REMARK_MAP_NAME))
    print("✅ Fertilizer model and all preprocessors loaded successfully!")
    
except FileNotFoundError as e:
    load_error = f"File not found: {e}"
    print(f"❌ {load_error}")
    
except ModuleNotFoundError as e:
    load_error = f"Missing dependency: {e}"
    print(f"❌ {load_error}")
    
except Exception as e:
    load_error = f"Error loading model: {e}"
    print(f"❌ {load_error}")

# --- Define Input and Output Schemas ---
class FertilizerInput(BaseModel):
    Temperature: float
    Moisture: float
    Rainfall: float
    PH: float
    Nitrogen: float
    Phosphorous: float
    Potassium: float
    Carbon: float
    Soil: str
    Crop: str

class FertilizerOutput(BaseModel):
    fertilizer: str
    remark: str

# --- Prediction Endpoint ---
@app.post("/predict", response_model=FertilizerOutput)
async def predict_fertilizer(data: FertilizerInput, credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    Predicts the most suitable fertilizer and provides a remark.
    Requires a valid Bearer token in the 'Authorization' header.
    """
    # Verify token
    verify_token(credentials)
    
    if not all([model, label_encoder, scaler, model_columns, numeric_columns, remark_map]):
        raise HTTPException(
            status_code=503, 
            detail=f"Model is not available. Error: {load_error or 'Unknown error during loading'}"
        )

    try:
        input_df = pd.DataFrame([data.dict()])

        # One-hot encode categorical features ('Soil' and 'Crop')
        input_df_processed = pd.get_dummies(input_df, columns=['Soil', 'Crop'])
        
        # Align columns with the training data
        input_df_aligned = input_df_processed.reindex(columns=model_columns, fill_value=0)

        # Scale numerical features
        input_df_aligned[numeric_columns] = scaler.transform(input_df_aligned[numeric_columns])

        # Make a single prediction
        pred_encoded = model.predict(input_df_aligned)[0]
        
        # Decode the prediction to get the fertilizer name
        predicted_fertilizer = label_encoder.inverse_transform([pred_encoded])[0]
        
        # Look up the remark for the predicted fertilizer
        predicted_remark = remark_map.get(predicted_fertilizer, "No remark available.")

        return FertilizerOutput(fertilizer=predicted_fertilizer, remark=predicted_remark)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred during prediction: {e}")

# --- Health Check Endpoint ---
@app.get("/")
def read_root():
    model_status = "loaded" if all([model, label_encoder, scaler, model_columns, numeric_columns, remark_map]) else "failed"
    return {
        "status": "Fertilizer Recommendation API is running.", 
        "version": "1.0.0",
        "model_status": model_status,
        "load_error": load_error,
        "authentication_required": BEARER_TOKEN is not None
    }

# --- Run the application ---
if __name__ == "__main__":
    uvicorn.run(app, host=SERVER_HOST, port=SERVER_PORT)