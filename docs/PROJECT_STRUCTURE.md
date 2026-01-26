# 🏗️ Perfect Project Structure for Krishi

## 📋 Overview
This document outlines the ideal project structure for the Krishi agricultural AI platform, following industry best practices, scalability, and maintainability principles.

---

## 📁 Recommended Complete Structure

```
Krishi-Final/
│
├── 📄 README.md                      # Main project documentation
├── 📄 LICENSE                        # Project license
├── 📄 .gitignore                     # Git ignore rules for entire project
├── 📄 package.json                   # Root workspace configuration (optional)
├── 📄 docker-compose.yml             # Local development orchestration
├── 📄 .env.example                   # Environment variables template
│
├── 📁 docs/                          # 📚 Documentation
│   ├── architecture.md              # System architecture overview
│   ├── api.md                        # API documentation
│   ├── deployment.md                 # Deployment guides
│   ├── development.md                # Development setup guide
│   ├── contributing.md               # Contribution guidelines
│   └── database.md                   # Database schema and migrations
│
├── 📁 scripts/                       # 🔧 Build & deployment scripts
│   ├── setup.sh                     # Initial project setup
│   ├── build.sh                     # Build all services
│   ├── deploy.sh                    # Deployment script
│   └── test-all.sh                  # Run all tests
│
├── 📁 frontend/                      # ⚛️ React/TypeScript Frontend
│   ├── 📄 package.json
│   ├── 📄 package-lock.json
│   ├── 📄 tsconfig.json
│   ├── 📄 vite.config.ts
│   ├── 📄 tailwind.config.ts
│   ├── 📄 .env.example
│   ├── 📄 .gitignore
│   ├── 📄 .eslintrc.json
│   ├── 📄 .prettierrc
│   │
│   ├── 📁 public/                    # Static assets
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   └── assets/                   # Images, icons
│   │
│   ├── 📁 src/
│   │   ├── 📄 main.tsx               # Application entry point
│   │   ├── 📄 App.tsx                # Root component
│   │   ├── 📄 index.css              # Global styles
│   │   │
│   │   ├── 📁 api/                   # API integration layer
│   │   │   ├── client.ts             # Axios instance configuration
│   │   │   ├── endpoints.ts          # API endpoint definitions
│   │   │   ├── interceptors.ts       # Request/response interceptors
│   │   │   └── types.ts              # API-related TypeScript types
│   │   │
│   │   ├── 📁 components/            # Reusable UI components
│   │   │   ├── 📁 ui/                # shadcn/ui components
│   │   │   ├── 📁 layout/            # Layout components (Header, Footer, Navigation)
│   │   │   ├── 📁 features/          # Feature-specific components
│   │   │   │   ├── CropRecommendation.tsx
│   │   │   │   ├── DiseaseDetection.tsx
│   │   │   │   └── FertilizerRecommendation.tsx
│   │   │   └── 📁 common/            # Common reusable components
│   │   │
│   │   ├── 📁 pages/                 # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── CropRecommendationPage.tsx
│   │   │   ├── FertilizerRecommendationPage.tsx
│   │   │   ├── DiseaseDetectionPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   │
│   │   ├── 📁 hooks/                 # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useApi.ts
│   │   │   └── useToast.ts
│   │   │
│   │   ├── 📁 contexts/               # React contexts
│   │   │   └── AuthContext.tsx
│   │   │
│   │   ├── 📁 services/               # Business logic services
│   │   │   ├── authService.ts
│   │   │   ├── apiService.ts
│   │   │   └── storageService.ts
│   │   │
│   │   ├── 📁 store/                  # State management (if using Redux/Zustand)
│   │   │   ├── slices/
│   │   │   └── store.ts
│   │   │
│   │   ├── 📁 types/                  # TypeScript type definitions
│   │   │   ├── api.types.ts
│   │   │   ├── user.types.ts
│   │   │   └── crop.types.ts
│   │   │
│   │   ├── 📁 utils/                  # Utility functions
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   └── constants.ts
│   │   │
│   │   └── 📁 config/                 # Configuration files
│   │       └── env.ts                 # Environment variables
│   │
│   ├── 📁 tests/                      # Test files
│   │   ├── setup.ts
│   │   ├── __mocks__/
│   │   └── components/
│   │
│   └── 📁 dist/                        # Build output (gitignored)
│
├── 📁 backend/                        # 🚀 Node.js/Express Backend
│   ├── 📄 package.json
│   ├── 📄 package-lock.json
│   ├── 📄 .env.example
│   ├── 📄 .gitignore
│   ├── 📄 .eslintrc.js
│   ├── 📄 .prettierrc
│   ├── 📄 server.js                  # Application entry point (renamed from index.js)
│   │
│   ├── 📁 src/
│   │   ├── 📁 config/                 # Configuration files
│   │   │   ├── database.js           # Database connection (FIX: rename from connextion.js)
│   │   │   ├── environment.js       # Environment variable validation
│   │   │   └── constants.js          # Application constants
│   │   │
│   │   ├── 📁 models/                 # Database models (Mongoose schemas)
│   │   │   ├── User.js
│   │   │   ├── CropRecommendation.js
│   │   │   └── index.js              # Model exports
│   │   │
│   │   ├── 📁 routes/                 # API route definitions
│   │   │   ├── index.js               # Route aggregator
│   │   │   ├── auth.routes.js
│   │   │   ├── crop.routes.js
│   │   │   ├── fertilizer.routes.js
│   │   │   └── disease.routes.js
│   │   │
│   │   ├── 📁 controllers/            # Request handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── crop.controller.js
│   │   │   ├── fertilizer.controller.js
│   │   │   └── disease.controller.js
│   │   │
│   │   ├── 📁 services/               # Business logic layer
│   │   │   ├── auth.service.js
│   │   │   ├── crop.service.js
│   │   │   ├── fertilizer.service.js
│   │   │   ├── disease.service.js
│   │   │   └── mlGateway.service.js   # ML service communication
│   │   │
│   │   ├── 📁 middleware/             # Express middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   ├── validation.middleware.js
│   │   │   └── logger.middleware.js
│   │   │
│   │   ├── 📁 validators/              # Input validation schemas
│   │   │   ├── auth.validator.js
│   │   │   ├── crop.validator.js
│   │   │   └── fertilizer.validator.js
│   │   │
│   │   ├── 📁 utils/                  # Utility functions
│   │   │   ├── logger.js              # Winston/Pino logger
│   │   │   ├── errors.js               # Custom error classes
│   │   │   ├── responses.js           # Standardized API responses
│   │   │   └── fileHandler.js         # File upload utilities
│   │   │
│   │   └── 📁 types/                   # TypeScript/JSDoc type definitions
│   │       └── index.d.ts
│   │
│   ├── 📁 tests/                       # Test files
│   │   ├── unit/
│   │   ├── integration/
│   │   ├── e2e/
│   │   └── fixtures/
│   │
│   ├── 📁 migrations/                  # Database migrations (if using)
│   │
│   └── 📁 uploads/                     # File upload storage (gitignored)
│
├── 📁 ml-services/                     # 🤖 Machine Learning Services
│   │
│   ├── 📁 crop-recommendation/         # Crop Recommendation Service
│   │   ├── 📄 app.py                  # FastAPI application
│   │   ├── 📄 requirements.txt
│   │   ├── 📄 Dockerfile
│   │   ├── 📄 .env.example
│   │   ├── 📄 README.md               # Service-specific docs
│   │   ├── 📁 models/                 # Trained ML models
│   │   │   ├── crop_recommendation_model.pkl
│   │   │   ├── label_encoder.pkl
│   │   │   ├── scaler.pkl
│   │   │   └── model_columns.pkl
│   │   ├── 📁 src/                    # Source code (if needed)
│   │   │   ├── preprocessing.py
│   │   │   └── prediction.py
│   │   └── 📁 tests/
│   │
│   ├── 📁 fertilizer-recommendation/   # Fertilizer Recommendation Service
│   │   ├── 📄 app.py
│   │   ├── 📄 requirements.txt
│   │   ├── 📄 Dockerfile
│   │   ├── 📄 .env.example
│   │   ├── 📄 README.md
│   │   ├── 📁 models/
│   │   │   ├── fertilizer_recommendation_model.pkl
│   │   │   ├── fertilizer_label_encoder.pkl
│   │   │   ├── fertilizer_scaler.pkl
│   │   │   └── fertilizer_remark_map.pkl
│   │   └── 📁 tests/
│   │
│   └── 📁 plant-disease-detection/    # Disease Detection Service
│       ├── 📄 app.py                  # FastAPI wrapper (Hugging Face)
│       ├── 📄 main.py                 # Main application logic
│       ├── 📄 config.py               # Configuration
│       ├── 📄 requirements.txt
│       ├── 📄 Dockerfile
│       ├── 📄 .env.example
│       ├── 📄 README.md
│       ├── 📁 models/                 # Trained models
│       │   └── artifacts_backup/
│       │       ├── model_mnv2.pt
│       │       └── class_index.json
│       ├── 📁 src/                    # Source code
│       │   ├── model_loader.py
│       │   ├── image_processor.py
│       │   └── predictor.py
│       └── 📁 tests/
│
├── 📁 shared/                          # 🔄 Shared code/types (optional)
│   ├── 📁 types/                      # Shared TypeScript types
│   │   ├── api.types.ts
│   │   └── entities.types.ts
│   └── 📁 constants/                   # Shared constants
│
└── 📁 infrastructure/                  # 🏗️ Infrastructure as Code
    ├── 📁 docker/                      # Docker configurations
    │   ├── docker-compose.dev.yml
    │   └── docker-compose.prod.yml
    ├── 📁 kubernetes/                  # K8s manifests (if using)
    │   ├── backend/
    │   └── frontend/
    └── 📁 terraform/                   # Terraform configs (if using)
```

---

## 🔧 Key Improvements & Fixes

### 1. **Backend Structure Issues Fixed**
- ✅ Rename `Backend/index.js` → `backend/src/server.js` (clearer naming)
- ✅ Fix typo: `connextion.js` → `config/database.js`
- ✅ Move `controller/controller.js` → `src/controllers/auth.controller.js`
- ✅ Move `userRoute.js` → `src/routes/auth.routes.js`
- ✅ Move `Schema/` → `src/validators/` (more accurate naming)
- ✅ Consolidate all code under `src/` directory

### 2. **Frontend Structure Improvements**
- ✅ Rename `Frontend/` → `frontend/` (lowercase, consistent)
- ✅ Organize API code into dedicated `api/` folder
- ✅ Separate layout components from feature components
- ✅ Add proper `types/` directory for TypeScript definitions
- ✅ Add `utils/` for reusable functions

### 3. **ML Services Structure**
- ✅ Rename `huggingface/` → `ml-services/` (more descriptive)
- ✅ Use kebab-case for directory names
- ✅ Add service-specific README files
- ✅ Separate models into dedicated folders

### 4. **New Additions**
- ✅ Add `docs/` folder for comprehensive documentation
- ✅ Add `scripts/` for automation
- ✅ Add `.env.example` files for each service
- ✅ Add root-level `.gitignore`
- ✅ Add `docker-compose.yml` for local development
- ✅ Add `LICENSE` file

---

## 📝 Directory Naming Conventions

### ✅ **Best Practices**
- Use **lowercase** with **hyphens** for directories: `ml-services/`, `crop-recommendation/`
- Use **camelCase** for files in backend (JS): `auth.controller.js`
- Use **camelCase** for React components: `CropRecommendation.tsx`
- Use **kebab-case** for config files: `.eslintrc.js`, `docker-compose.yml`

### ❌ **Avoid**
- Mixed case directory names: `Frontend/`, `Backend/`
- Inconsistent naming: `Schema/` vs `schemas/`
- Typo-prone names: `connextion.js`

---

## 🔒 Security & Configuration

### Environment Files
Each service should have:
```
.env.example          # Template with dummy values
.env                  # Actual values (gitignored)
.env.local            # Local overrides (gitignored)
.env.production       # Production config (gitignored)
```

### .gitignore Structure
```
# Root
.gitignore           # Project-wide ignores

# Service-specific
frontend/.gitignore
backend/.gitignore
ml-services/*/.gitignore
```

---

## 📦 Monorepo vs Separate Repos

### **Current Structure (Monorepo)** ✅ Recommended
- All services in one repository
- Easier to maintain consistency
- Shared types and documentation
- Single point of deployment

### **Alternative (Microservices Repos)**
If scaling beyond current scope:
- `krishi-frontend`
- `krishi-backend`
- `krishi-ml-crop`
- `krishi-ml-fertilizer`
- `krishi-ml-disease`

---

## 🚀 Implementation Priority

### **Phase 1: Critical Fixes** (Do First)
1. Fix `connextion.js` → `database.js`
2. Move all backend code under `src/`
3. Standardize directory naming (lowercase)

### **Phase 2: Structure Improvements**
4. Create `docs/` folder with architecture docs
5. Add `.env.example` files
6. Organize frontend components better

### **Phase 3: Enhancements**
7. Add shared types folder
8. Create deployment scripts
9. Add comprehensive test structure

---

## 📚 Additional Recommendations

### 1. **Documentation Structure**
```
docs/
├── architecture.md        # System architecture diagrams
├── api/
│   ├── backend-api.md    # Backend API reference
│   └── ml-api.md         # ML services API reference
├── deployment/
│   ├── local-setup.md
│   ├── production.md
│   └── huggingface.md
└── development/
    ├── setup.md
    ├── coding-standards.md
    └── git-workflow.md
```

### 2. **Testing Structure**
```
tests/
├── unit/                 # Unit tests
├── integration/          # Integration tests
├── e2e/                  # End-to-end tests
└── fixtures/             # Test data
```

### 3. **CI/CD Configuration**
```
.github/
└── workflows/
    ├── frontend-ci.yml
    ├── backend-ci.yml
    └── ml-services-ci.yml
```

---

## 🎯 Summary

The perfect structure should:
1. ✅ Be **consistent** in naming conventions
2. ✅ **Separate concerns** clearly (controllers, services, routes)
3. ✅ Be **scalable** for future growth
4. ✅ Follow **industry standards** (src/, tests/, docs/)
5. ✅ Be **self-documenting** through clear folder names
6. ✅ Support **development** and **production** environments
7. ✅ Include **comprehensive documentation**

This structure maintains your current functionality while making the codebase more maintainable, scalable, and professional.

