import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).parent

class Settings:
    # API Configuration - use Hugging Face's provided port
    api_token: str = os.getenv("API_TOKEN", "hackathon-secret-token")
    port: int = int(os.getenv("PORT", "7860"))  # CHANGED TO 7860
    host: str = os.getenv("HOST", "0.0.0.0")
    log_level: str = os.getenv("LOG_LEVEL", "info")
    
    # Disable ngrok on Hugging Face
    use_ngrok: bool = False
    
    # Model Configuration
    artifacts_dir: str = "./artifacts_backup"
    model_version: str = "mnv2-hf-v1"
    
    @property
    def model_path(self) -> str:
        return os.path.join(self.artifacts_dir, "model_mnv2.pt")
    
    @property
    def class_path(self) -> str:
        return os.path.join(self.artifacts_dir, "class_index.json")

# Create global settings instance
settings = Settings()

# Validate required files
def validate_setup():
    """Validate that all required files and configurations are present"""
    errors = []
    
    if not os.path.exists(settings.model_path):
        errors.append(f"❌ Model file not found: {settings.model_path}")
    
    if not os.path.exists(settings.class_path):
        errors.append(f"❌ Class file not found: {settings.class_path}")
    
    if errors:
        for error in errors:
            print(error)
        return False
    
    return True