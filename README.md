# 🌱 Krishi - AI-Powered Agricultural Intelligence Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](CHANGELOG.md)

Krishi is a comprehensive agricultural intelligence platform that leverages cutting-edge machine learning to empower farmers with data-driven insights. Our solution provides accurate crop recommendations, personalized fertilizer suggestions, and real-time plant disease detection through an intuitive web interface.

## 🌟 Key Features

- **Crop Recommendation System**
  - Analyzes soil parameters and weather conditions
  - Suggests optimal crops based on environmental factors
  - Considers regional climate patterns and soil health

- **Fertilizer Advisor**
  - Recommends precise fertilizer compositions
  - Considers soil nutrient levels and crop requirements
  - Promotes sustainable farming practices

- **Plant Disease Detection**
  - AI-powered image recognition for common plant diseases
  - Instant diagnosis and treatment recommendations
  - Supports multiple crop varieties

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Form Handling**: React Hook Form with Zod validation

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with refresh tokens
- **API Documentation**: Swagger/OpenAPI

### AI/ML Services
- **Crop Recommendation**: Random Forest Classifier
- **Fertilizer Suggestion**: Decision Tree Regressor
- **Disease Detection**: CNN-based Image Classifier
- **Deployment**: Hugging Face Spaces

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB 6.0+
- Python 3.8+ (for ML services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/krishi.git
   cd krishi
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd Frontend
   npm install
   
   # Install backend dependencies
   cd ../Backend
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env` in both Frontend and Backend directories
   - Update the environment variables with your configuration

4. **Start Development Servers**
   ```bash
   # Start backend server
   cd Backend
   npm run dev
   
   # In a new terminal, start frontend
   cd Frontend
   npm run dev
   ```

## 📚 Documentation

- [API Documentation](/docs/API.md)
- [Architecture Overview](/docs/ARCHITECTURE.md)
- [Machine Learning Models](/docs/ML_MODELS.md)
- [Deployment Guide](/docs/DEPLOYMENT.md)

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by the Krishi team
- Special thanks to our mentors and the open-source community
- Icons by [Lucide](https://lucide.dev/)

### AI Services (Hugging Face Spaces)
1. **Crop Recommendation**: CatBoost model predicting optimal crops based on environmental factors
2. **Fertilizer Recommendation**: ML model suggesting appropriate fertilizers for specific crops
3. **Plant Disease Detection**: MobileNetV2 model analyzing plant images for disease identification

## 🚀 Features

### Core Services
- **Crop Recommendation**: Get personalized crop suggestions based on soil and weather data
- **Fertilizer Recommendation**: Receive tailored fertilizer advice for optimal plant nutrition
- **Disease Detection**: Upload plant images for instant disease diagnosis
- **User Authentication**: Secure login and registration system
- **Responsive UI**: Mobile-friendly interface for field use

### Technical Features
- RESTful API design
- JWT-based authentication
- File upload support (images)
- Real-time health monitoring
- Comprehensive error handling
- Docker containerization for ML services

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19
- **Styling**: Tailwind CSS 3.4.17 with shadcn/ui components
- **State Management**: React Query for server state
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation

### Backend
- **Runtime**: Node.js with Express.js 5.1.0
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt password hashing
- **File Handling**: Multer for image uploads
- **HTTP Client**: Axios for ML service communication
- **Validation**: Express-validator
- **Logging**: Morgan for HTTP request logging

### AI/ML Services
- **Framework**: FastAPI with Uvicorn server
- **Machine Learning**: scikit-learn, CatBoost, XGBoost
- **Deep Learning**: PyTorch with Torchvision
- **Image Processing**: OpenCV, Pillow
- **Deployment**: Docker containers on Hugging Face Spaces

## 📋 Prerequisites

### System Requirements
- **Node.js**: Version 18 or higher
- **Python**: Version 3.8 or higher (for ML services)
- **MongoDB**: Local or cloud instance
- **Docker**: For running ML services locally (optional)

### Development Tools
- Git for version control
- npm or yarn for package management
- Python virtual environment tools (venv, conda)

## 🚀 Running the Application

### Live Deployment
The application is deployed and accessible at: **https://krishi-frontend-beta.vercel.app/**
The backend is hosted on: **https://krishi-backend-3.onrender.com**
The crop recommendation pipeline hosted on: **https://huggingface.co/spaces/khushal-grover2005/Crop_Recommendation**
The fertilizer recommendation pipeline hosted on: **https://huggingface.co/spaces/khushal-grover2005/Fertilizer_Recommendation**
The plant disease detection pipeline hosted on: **https://huggingface.co/spaces/khushal-grover2005/plant-disease-api**

### Note
The following steps may be skipped as the website is deployed, access it at **https://krishi-frontend-beta.vercel.app/**

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Krishi
```

### 2. Frontend Setup
```bash
cd Frontend
npm install
```

### 3. Backend Setup
```bash
cd ../Backend
npm install
```

### 4. Environment Configuration

#### Backend Configuration
1. Create `Backend/config/` directory if it doesn't exist
2. Copy `.env.example` to `Backend/config/config.env`
3. Fill in your configuration values:

```env
PORT=9999
JWT_SECRET=your-super-secret-jwt-key
MONGO_URI=mongodb://localhost:27017/KRISHI
ML_GATEWAY_URL=https://khushal-grover2005-plant-disease-api.hf.space
CROP_ML_GATEWAY_URL=https://khushal-grover2005-crop-recommendation.hf.space
FERTILIZER_ML_GATEWAY_URL=https://khushal-grover2005-fertilizer-recommendation.hf.space
```

See `.env.example` in the root directory for all available options.

#### ML Services Configuration
Each Hugging Face service requires environment variables for authentication tokens.

### 5. Database Setup
Ensure MongoDB is running and accessible via the configured URI.

### 6. ML Services Setup
The ML services are deployed on Hugging Face Spaces. For local development:
- Install Docker
- Navigate to each service directory and build/run containers

### Development Mode

#### Frontend
```bash
cd Frontend
npm run dev

```

#### Backend
```bash
cd Backend
npm run dev
```

#### ML Services (Local)
```bash
# For each service directory
cd huggingface/[service-name]
docker build -t [service-name] .
docker run -p 7860:7860 [service-name]
```

### Production Mode
```bash
# Frontend
cd Frontend
npm run build
npm run preview

# Backend
cd Backend
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/user/signup` - User registration
- `POST /api/user/signin` - User login

### Core Services
- `POST /api/crop/recommend` - Get crop recommendations
- `POST /api/fertilizer/recommend` - Get fertilizer recommendations
- `POST /api/disease/detect` - Upload image for disease detection

### Health Checks
- `GET /health` - Backend health status
- `GET /` - ML service health checks

## 🔍 Usage Examples



### Crop Recommendation
```bash
curl -X POST http://localhost:9999/api/crop/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "Temperature": 25,
    "Moisture": 0.6,
    "Rainfall": 150,
    "PH": 6.5,
    "Nitrogen": 50,
    "Phosphorous": 50,
    "Potassium": 50,
    "Carbon": 1,
    "Soil": "Loamy Soil"
  }'
```

### Disease Detection
```bash
curl -X POST http://localhost:9999/api/disease/detect \
  -F "image=@path/to/plant.jpg" \
  -H "Authorization: Bearer <your-jwt-token>"
```

## 📁 Project Structure

```
Krishi-Final/
├── Frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Application pages
│   │   ├── services/         # API service functions
│   │   └── contexts/         # React contexts
│   ├── public/               # Static assets
│   └── package.json          # Frontend dependencies
├── Backend/                  # Node.js API server
│   ├── src/
│   │   ├── config/           # Configuration files (database, etc.)
│   │   ├── models/           # Database models
│   │   ├── controllers/      # Request handlers
│   │   ├── routes/           # API route definitions
│   │   ├── middleware/       # Custom middleware
│   │   └── validators/       # Input validation schemas
│   ├── config/               # Environment configuration
│   └── package.json          # Backend dependencies
├── ml-services/              # ML services (renamed from huggingface)
│   ├── crop-recommendation/  # CatBoost crop model
│   ├── fertilizer-recommendation/ # Fertilizer ML model
│   └── plant-disease-detection/   # PyTorch disease detection
├── docs/                     # Documentation
│   ├── architecture.md       # System architecture
│   └── README.md             # Documentation index
├── .gitignore                # Git ignore rules
├── .env.example              # Environment variables template
└── README.md                  # This file
```

> **Note:** See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed structure guidelines and [RESTRUCTURING_COMPLETE.md](./RESTRUCTURING_COMPLETE.md) for recent restructuring changes.

## 📊 Dependencies

### Frontend Dependencies
Key packages include:
- React 18.3.1, TypeScript 5.8.3
- Vite 5.4.19, Tailwind CSS 3.4.17
- shadcn/ui components, React Query 5.83.0
- Axios 1.11.0 for API calls

### Backend Dependencies
Key packages include:
- Express.js 5.1.0, MongoDB/Mongoose 8.18.0
- JWT 9.0.2, bcrypt 6.0.0
- Multer 2.0.2 for file uploads
- Axios 1.11.0 for ML service communication

### ML Services Dependencies
Key packages include:
- FastAPI 0.104.1, Uvicorn 0.24.0
- scikit-learn 1.6.1, CatBoost 1.2.2
- PyTorch 2.0.0, Torchvision 0.15.0
- OpenCV 4.10.0, Pillow 10.0.0

## 🧪 Testing

### Frontend Testing
```bash
cd Frontend
npm run test
```

### Backend Testing
```bash
cd Backend
npm test
```

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify MongoDB is running
   - Check MONGO_URI configuration

2. **ML Service Unavailable**
   - Ensure Hugging Face services are deployed
   - Verify API endpoints and authentication tokens

3. **File Upload Issues**
   - Check file size limits (5MB)
   - Ensure supported formats (JPEG, PNG, JPG, WebP)

4. **CORS Errors**
   - Configure CORS settings in backend
   - Check environment-specific configurations

### Logs and Debugging
- Backend uses Morgan for HTTP logging
- Check console output for errors
- ML services provide detailed error responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with modern web technologies and AI/ML frameworks
- Special thanks to Hugging Face for Spaces deployment
- Designed for agricultural applications and farmer empowerment

## 📞 Support

For support, questions, or contributions, please:
- Check the project documentation
- Create an issue in the repository
- Contact the development team

## 📹 Submissions

This section is reserved for hackathon submissions, including video demonstrations, presentation links, or additional resources. Please add relevant URLs here:

- **Demo Video**: 
https://drive.google.com/file/d/1KOhPNORO4nY0OjPoCgVzs9KtUeik9ytS/view?usp=sharing

