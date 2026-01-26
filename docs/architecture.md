# 🏗️ System Architecture

## Overview

Krishi is a full-stack agricultural AI platform consisting of:

1. **Frontend** - React/TypeScript web application
2. **Backend** - Node.js/Express API server
3. **ML Services** - Three FastAPI services for AI predictions

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│                  (React + TypeScript)                        │
│                  Vite + Tailwind CSS                         │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST API
                     │
┌────────────────────▼────────────────────────────────────────┐
│                        Backend                               │
│                  (Node.js + Express)                         │
│  - Authentication (JWT)                                      │
│  - Request Routing                                           │
│  - Validation                                                │
│  - Error Handling                                            │
└───┬──────────┬──────────────┬───────────────────────────────┘
    │          │              │
    │          │              │
    ▼          ▼              ▼
┌─────────┐ ┌──────────┐ ┌─────────────┐
│  Crop   │ │Fertilizer│ │   Disease   │
│Recommend│ │Recommend │ │  Detection  │
│ Service │ │ Service  │ │   Service   │
│(FastAPI)│ │(FastAPI) │ │  (FastAPI)  │
│         │ │          │ │             │
│ CatBoost│ │   ML     │ │ MobileNetV2 │
│   Model │ │  Model   │ │    Model    │
└─────────┘ └──────────┘ └─────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19
- **Styling**: Tailwind CSS 3.4.17 + shadcn/ui
- **State Management**: React Context API
- **Routing**: React Router DOM
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt
- **Validation**: express-validator
- **File Upload**: Multer

### ML Services
- **Framework**: FastAPI
- **Server**: Uvicorn
- **ML Libraries**: 
  - scikit-learn
  - CatBoost/XGBoost (Crop)
  - PyTorch (Disease Detection)

## Data Flow

### 1. Crop Recommendation Flow
```
User Input (Soil Data)
    ↓
Frontend Validation
    ↓
POST /api/crop/recommend
    ↓
Backend Validation
    ↓
POST to Crop ML Service
    ↓
ML Model Prediction
    ↓
Response with Top 3 Crops
    ↓
Frontend Display
```

### 2. Disease Detection Flow
```
User Uploads Image
    ↓
Frontend (File Validation)
    ↓
POST /api/disease/detect (Multipart)
    ↓
Backend (Multer Processing)
    ↓
POST to Disease ML Service
    ↓
CNN Model Inference
    ↓
Disease Classification
    ↓
Response with Treatment
    ↓
Frontend Display
```

## Security Architecture

### Authentication Flow
```
User Login
    ↓
Backend Validates Credentials
    ↓
JWT Token Generated
    ↓
Token Stored in HTTP-only Cookie
    ↓
Subsequent Requests Include Token
    ↓
Middleware Validates Token
    ↓
Request Proceeds
```

### ML Service Authentication
- Crop Service: Optional Bearer Token
- Fertilizer Service: Required Bearer Token
- Disease Service: Required Bearer Token

## Deployment Architecture

### Current Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **ML Services**: Hugging Face Spaces

### Environment Variables
Each service requires specific environment variables (see `.env.example` files).

## Scalability Considerations

### Current Limitations
- Single MongoDB instance
- ML services on Hugging Face (shared resources)

### Future Improvements
- Database connection pooling
- Redis for caching
- Load balancing for ML services
- CDN for static assets
- Database replication

## Error Handling

### Backend Error Flow
```
Request Error
    ↓
Express Error Middleware
    ↓
Error Handler Middleware
    ↓
Formatted Error Response
    ↓
Client Receives Error
```

### ML Service Error Handling
- Timeout handling (30s default)
- Fallback responses
- Graceful degradation

