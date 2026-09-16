"""
API Gateway — reverse-proxies all incoming /api/v1/* traffic to the
appropriate downstream microservice (Auth, Job, Resume), per SRS Section 3
("API Gateway: Single entry point that routes requests to backend
services"). This is the single URL the Frontend (Intern 4) talks to.
"""
import os

import httpx
from fastapi import APIRouter, Request, Response

router = APIRouter()

AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL", "http://localhost:8001")
JOB_SERVICE_URL = os.getenv("JOB_SERVICE_URL", "http://localhost:8002")
RESUME_SERVICE_URL = os.getenv("RESUME_SERVICE_URL", "http://localhost:8003")

# Ordered so more specific prefixes are checked before general ones.
ROUTE_TABLE = [
    ("/api/v1/auth", AUTH_SERVICE_URL),
    ("/api/v1/jobs", JOB_SERVICE_URL),
    ("/api/v1/swipes", JOB_SERVICE_URL),
    ("/api/v1/resume", RESUME_SERVICE_URL),
    ("/api/v1/recommendations", RESUME_SERVICE_URL),
]

HOP_BY_HOP_HEADERS = {
    "connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
    "te", "trailers", "transfer-encoding", "upgrade", "content-length", "host",
}


def _resolve_target(path: str) -> str | None:
    for prefix, target in ROUTE_TABLE:
        if path.startswith(prefix):
            return target
    return None


@router.api_route(
    "/api/v1/{full_path:path}",
    methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
)
async def proxy(request: Request, full_path: str):
    path = f"/api/v1/{full_path}"
    target_base = _resolve_target(path)

    if target_base is None:
        return Response(
            content=f'{{"detail": "No route registered for {path}"}}',
            status_code=404,
            media_type="application/json",
        )

    target_url = f"{target_base}{path}"
    body = await request.body()
    headers = {k: v for k, v in request.headers.items() if k.lower() not in HOP_BY_HOP_HEADERS}

    async with httpx.AsyncClient(timeout=15) as client:
        try:
            upstream_response = await client.request(
                method=request.method,
                url=target_url,
                params=request.query_params,
                content=body,
                headers=headers,
            )
        except httpx.RequestError as exc:
            return Response(
                content=f'{{"detail": "Upstream service unreachable: {exc}"}}',
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
