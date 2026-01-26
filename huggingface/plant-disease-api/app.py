# Import your main application
from main import app

# Create app instance for Hugging Face
application = app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(application, host="0.0.0.0", port=8000)

print("✅ Plant Disease API imported successfully!")
print("🚀 FastAPI app is ready for Hugging Face deployment")