"""
SwipeX API Gateway — single entry point for the Frontend (Intern 4).
Run standalone: uvicorn main:app --reload --port 8000

Swagger UI for the Gateway itself: http://localhost:8000/docs
(Note: since the Gateway proxies raw bytes, its own /docs won't show the
downstream services' schemas — see each service's own /docs for that, or
the consolidated README instructions.)
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from router import router

app = FastAPI(
    title="SwipeX API Gateway",
    description="Single entry point routing to Auth, Job/Swipe, and Resume/ATS services.",
    version="1.0.0-milestone1",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/health", tags=["Health"])
async def health():
    return {"status": "ok", "service": "gateway"}
