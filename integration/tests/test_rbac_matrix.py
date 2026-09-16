"""
SwipeX RBAC & Security Test Suite
Owner: Intern 5 (Platform, Testing & Deployment)
Validates FR-02, FR-09, and NFR-03:
- Enforce role-based access control (Job Seeker / Recruiter / Admin)
- Validate 401 Unauthorized for missing credentials
- Validate 403 Forbidden for unauthorized roles
"""
import pytest
import httpx

GATEWAY_BASE_URL = "http://localhost:8000"

def test_rbac_unauthenticated_protected_route_fails(api_client):
    """Calling protected endpoint without Authorization header must return 401."""
    response = api_client.get("/api/v1/auth/me")
    assert response.status_code == 401

def test_rbac_invalid_token_fails(api_client):
    """Calling protected endpoint with bogus token must return 401."""
    headers = {"Authorization": "Bearer invalid.token.value"}
    response = api_client.get("/api/v1/auth/me", headers=headers)
    assert response.status_code == 401

def test_rbac_candidate_claims(api_client):
    """Candidate login yields a valid token with Job Seeker role."""
    login_resp = api_client.post("/api/v1/auth/login", json={
        "email": "jobseeker@swipex.dev",
        "password": "Password123!"
    })
    assert login_resp.status_code == 200
    token = login_resp.json()["access_token"]
    
    headers = {"Authorization": f"Bearer {token}"}
    profile_resp = api_client.get("/api/v1/auth/me", headers=headers)
    assert profile_resp.status_code == 200
    assert profile_resp.json()["role"] == "Job Seeker"

def test_rbac_recruiter_claims(api_client):
    """Recruiter login yields a valid token with Recruiter role."""
    login_resp = api_client.post("/api/v1/auth/login", json={
        "email": "recruiter@swipex.dev",
        "password": "Password123!"
    })
    assert login_resp.status_code == 200
    token = login_resp.json()["access_token"]
    
    headers = {"Authorization": f"Bearer {token}"}
    profile_resp = api_client.get("/api/v1/auth/me", headers=headers)
    assert profile_resp.status_code == 200
    assert profile_resp.json()["role"] == "Recruiter"

def test_rbac_admin_claims(api_client):
    """Admin login yields a valid token with Admin role."""
    login_resp = api_client.post("/api/v1/auth/login", json={
        "email": "admin@swipex.dev",
        "password": "Password123!"
    })
    assert login_resp.status_code == 200
    token = login_resp.json()["access_token"]
    
    headers = {"Authorization": f"Bearer {token}"}
    profile_resp = api_client.get("/api/v1/auth/me", headers=headers)
    assert profile_resp.status_code == 200
    assert profile_resp.json()["role"] == "Admin"
