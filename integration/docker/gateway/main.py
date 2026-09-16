"""
SwipeX Integration Gateway Main Entrypoint
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import router

app = FastAPI(
    title="SwipeX Integration API Gateway",
    description="Unified API Gateway orchestrating Auth, Job & Data Intelligence, and AI/ML Career Intelligence services.",
    version="2.0.0",
)

# CORS configuration to allow Frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "service": "SwipeX Integration Gateway",
        "milestones_supported": ["Milestone 1", "Milestone 2"],
        "version": "2.0.0"
    }

@app.get("/", tags=["System"])
async def root():
    return {
        "message": "Welcome to SwipeX Unified API Gateway",
        "docs_url": "/docs",
        "health_url": "/health"
    }
