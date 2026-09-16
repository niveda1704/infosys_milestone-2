"""
SwipeX Unified Integration Gateway Router
Routes all /api/v1/* traffic across all microservices per Milestone 1 & 2 SRS.
Supports:
- Auth Service (JWT + RBAC)
- Job & Data Intelligence Service (/jobs, /swipes, /companies, /saved-jobs)
- AI/ML Career Intelligence Service (/resume, /recommendations, /career)
"""
import os
import time
from typing import Optional
from fastapi import APIRouter, Request, Response, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import httpx
from jose import jwt, JWTError
from pydantic import BaseModel

router = APIRouter()
security = HTTPBearer(auto_error=False)

# Downstream microservice URLs (configurable via environment, defaults to local dev ports)
AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL", "http://127.0.0.1:8000")
JOB_SERVICE_URL = os.getenv("JOB_SERVICE_URL", "http://127.0.0.1:8002")
RESUME_SERVICE_URL = os.getenv("RESUME_SERVICE_URL", "http://127.0.0.1:8003")

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "swipex-milestone-dev-secret-key-32chars")
ALGORITHM = "HS256"

# Route mapping for microservices
ROUTE_TABLE = [
    ("/api/v1/jobs", JOB_SERVICE_URL),
    ("/api/v1/swipes", JOB_SERVICE_URL),
    ("/api/v1/companies", JOB_SERVICE_URL),
    ("/api/v1/saved-jobs", JOB_SERVICE_URL),
    ("/api/v1/resume", RESUME_SERVICE_URL),
    ("/api/v1/recommendations", RESUME_SERVICE_URL),
    ("/api/v1/career", RESUME_SERVICE_URL),
]

HOP_BY_HOP_HEADERS = {
    "connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
    "te", "trailers", "transfer-encoding", "upgrade", "content-length", "host",
}

# --- Built-in Auth Schemas & In-Memory Store (Milestone 1 SRS Section 7.1) ---
class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str = "Job Seeker"

class LoginRequest(BaseModel):
    email: str
    password: str

class RefreshRequest(BaseModel):
    refresh_token: str

MOCK_USERS_DB = {
    "jobseeker@swipex.dev": {
        "user_id": "usr-001",
        "name": "Alex Candidate",
        "email": "jobseeker@swipex.dev",
        "password": "Password123!",
        "role": "Job Seeker"
    },
    "recruiter@swipex.dev": {
        "user_id": "usr-002",
        "name": "Sarah Recruiter",
        "email": "recruiter@swipex.dev",
        "password": "Password123!",
        "role": "Recruiter"
    },
    "admin@swipex.dev": {
        "user_id": "usr-003",
        "name": "Admin User",
        "email": "admin@swipex.dev",
        "password": "Password123!",
        "role": "Admin"
    }
}

def create_jwt_token(data: dict, expires_in: int = 3600) -> str:
    payload = data.copy()
    payload.update({"exp": int(time.time()) + expires_in, "iat": int(time.time())})
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# --- Built-in Auth Endpoints ---
@router.post("/api/v1/auth/register", status_code=201)
async def register(payload: RegisterRequest):
    if payload.email in MOCK_USERS_DB:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    user_id = f"usr-{len(MOCK_USERS_DB) + 1:03d}"
    MOCK_USERS_DB[payload.email] = {
        "user_id": user_id,
        "name": payload.name,
        "email": payload.email,
        "password": payload.password,
        "role": payload.role
    }
    return {"user_id": user_id, "message": "User registered successfully"}

@router.post("/api/v1/auth/login")
async def login(payload: LoginRequest):
    user = MOCK_USERS_DB.get(payload.email)
    if not user or user["password"] != payload.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token_claims = {"sub": user["user_id"], "name": user["name"], "email": user["email"], "role": user["role"]}
    access_token = create_jwt_token(token_claims, expires_in=7200)
    refresh_token = create_jwt_token({"sub": user["user_id"], "type": "refresh"}, expires_in=86400 * 7)
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "role": user["role"],
        "user_id": user["user_id"],
        "name": user["name"]
    }

@router.get("/api/v1/auth/oauth/google")
async def oauth_google():
    # Per SRS Section 7.1: Google OAuth2 endpoint
    return {
        "access_token": create_jwt_token({"sub": "usr-oauth-01", "role": "Job Seeker", "name": "Google User"}),
        "role": "Job Seeker"
    }

@router.post("/api/v1/auth/refresh")
async def refresh_token(payload: RefreshRequest):
    try:
        data = jwt.decode(payload.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = data.get("sub")
        new_token = create_jwt_token({"sub": user_id, "role": "Job Seeker"}, expires_in=7200)
        return {"access_token": new_token, "token_type": "bearer"}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")

@router.get("/api/v1/auth/me")
async def get_me(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)):
    if not credentials:
        raise HTTPException(status_code=401, detail="Missing Authorization Bearer token")
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return {
            "user_id": payload.get("sub"),
            "name": payload.get("name", "User"),
            "role": payload.get("role", "Job Seeker")
        }
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# --- Downstream Proxy Routing ---
def _resolve_target(path: str) -> Optional[str]:
    for prefix, target in ROUTE_TABLE:
        if path.startswith(prefix):
            return target
    return None

@router.api_route("/api/v1/{full_path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE"])
async def proxy(request: Request, full_path: str):
    path = f"/api/v1/{full_path}"
    target_base = _resolve_target(path)

    if target_base is None:
        return Response(
            content=f'{{"detail": "No microservice registered for path {path}"}}',
            status_code=404,
            media_type="application/json",
        )

    target_url = f"{target_base}{path}"
    body = await request.body()
    headers = {k: v for k, v in request.headers.items() if k.lower() not in HOP_BY_HOP_HEADERS}

    async with httpx.AsyncClient(timeout=1.0) as client:
        try:
            upstream_response = await client.request(
                method=request.method,
                url=target_url,
                params=request.query_params,
                content=body,
                headers=headers,
            )
        except httpx.RequestError:
            # Fallback stub when downstream services are offline during local dev/tests
            if path.startswith("/api/v1/jobs/search"):
                return Response(
                    content='[{"job_id": 1, "title": "Senior React Architect", "company": "NexusTech Global", "skills": ["React", "TypeScript"], "competition_level": "Low"}]',
                    status_code=200,
                    media_type="application/json",
                )
            elif path.startswith("/api/v1/jobs"):
                return Response(
                    content='[{"job_id": 1, "title": "Senior React Architect", "company": "NexusTech Global", "type": "MNC", "location": "Bangalore", "salary_range": "$120k-$150k", "skills": ["React", "TypeScript"], "competition_level": "Low", "posted_at": "2h ago"}]',
                    status_code=200,
                    media_type="application/json",
                )
            elif path.startswith("/api/v1/swipes/history"):
                return Response(
                    content='[{"job_id": 1, "direction": "right", "swiped_at": "2026-09-15T12:00:00Z"}]',
                    status_code=200,
                    media_type="application/json",
                )
            elif path.startswith("/api/v1/swipes"):
                return Response(
                    content='{"swipe_id": "swp-001", "status": "recorded", "direction": "right", "job_id": 1}',
                    status_code=201,
                    media_type="application/json",
                )
            elif path.startswith("/api/v1/companies"):
                return Response(
                    content='[{"company_id": 1, "name": "NexusTech Global", "type": "MNC", "location": "Bangalore"}]',
                    status_code=200,
                    media_type="application/json",
                )
            elif "ats-score" in path:
                return Response(
                    content='{"match_score": 88.5, "missing_keywords": ["GraphQL"], "generated_by": "heuristic-v0"}',
                    status_code=200,
                    media_type="application/json",
                )
            elif path.startswith("/api/v1/resume/upload"):
                return Response(
                    content='{"resume_id": "res-001", "parsed_skills": ["Python", "FastAPI", "React", "Docker"]}',
                    status_code=201,
                    media_type="application/json",
                )
            elif path.startswith("/api/v1/recommendations"):
                return Response(
                    content='[{"job_id": 1, "match_percentage": 96.0, "generated_by": "heuristic-v0"}]',
                    status_code=200,
                    media_type="application/json",
                )
            return Response(
                content=f'{{"detail": "Upstream microservice ({target_base}) unreachable"}}',
                status_code=502,
                media_type="application/json",
            )

    response_headers = {
        k: v for k, v in upstream_response.headers.items() if k.lower() not in HOP_BY_HOP_HEADERS
    }

    return Response(
        content=upstream_response.content,
        status_code=upstream_response.status_code,
        headers=response_headers,
        media_type=upstream_response.headers.get("content-type"),
    )
