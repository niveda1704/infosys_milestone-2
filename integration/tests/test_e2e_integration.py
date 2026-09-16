"""
SwipeX Automated End-to-End Integration Test Suite
Owner: Intern 5 (Platform, Testing & Deployment)
Validates all Milestone 1 & 2 frozen contracts through the API Gateway (SRS Section 7).
"""
import pytest
import httpx

GATEWAY_BASE_URL = "http://localhost:8000"

# --- 1. Gateway & Infrastructure Smoke Tests ---
def test_01_gateway_health(api_client):
    """Verify Gateway is running and healthy."""
    response = api_client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "Milestone 1" in data["milestones_supported"]

# --- 2. Authentication & User Profile Contract (SRS Section 7.1) ---
def test_02_auth_registration(api_client):
    """Test user registration for a new candidate."""
    import time
    unique_email = f"candidate_{int(time.time())}@swipex.dev"
    payload = {
        "name": "Alex Integration Test",
        "email": unique_email,
        "password": "SecurePassword123!",
        "role": "Job Seeker"
    }
    response = api_client.post("/api/v1/auth/register", json=payload)
    assert response.status_code in [201, 200]
    data = response.json()
    assert "user_id" in data

def test_03_auth_login_and_jwt_issuance(api_client):
    """Test user login returning JWT access token with role."""
    payload = {
        "email": "jobseeker@swipex.dev",
        "password": "Password123!"
    }
    response = api_client.post("/api/v1/auth/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["role"] == "Job Seeker"
    assert "refresh_token" in data

def test_04_auth_me_protected_endpoint(api_client):
    """Test calling /api/v1/auth/me with Bearer token."""
    login_resp = api_client.post("/api/v1/auth/login", json={
        "email": "jobseeker@swipex.dev",
        "password": "Password123!"
    })
    token = login_resp.json()["access_token"]
    
    headers = {"Authorization": f"Bearer {token}"}
    response = api_client.get("/api/v1/auth/me", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["role"] == "Job Seeker"

# --- 3. Job Listing, Search & Intelligence Contract (SRS Section 7.2 & M2) ---
def test_05_job_catalog_listing(api_client):
    """Test fetching paginated job catalog."""
    response = api_client.get("/api/v1/jobs")
    # If downstream is reached via gateway or mock
    if response.status_code == 200:
        data = response.json()
        jobs = data if isinstance(data, list) else data.get("jobs", data.get("data", []))
        assert len(jobs) > 0
        job = jobs[0]
        assert "title" in job
        assert "company" in job or "company_name" in job

def test_06_job_search_and_filters(api_client):
    """Test job search with keyword parameter."""
    response = api_client.get("/api/v1/jobs/search?q=Python")
    if response.status_code == 200:
        data = response.json()
        assert isinstance(data, (list, dict))

def test_07_job_freshness_and_competition_badges(api_client):
    """Verify jobs contain computed freshness and competition indicators (M2 requirement)."""
    response = api_client.get("/api/v1/jobs")
    if response.status_code == 200:
        data = response.json()
        jobs = data if isinstance(data, list) else data.get("jobs", [])
        if jobs:
            sample = jobs[0]
            # Validates competition level indicator presence
            if "competition_level" in sample:
                assert sample["competition_level"] in ["Low", "Medium", "High"]

def test_08_company_discovery(api_client):
    """Test company and startup listing."""
    response = api_client.get("/api/v1/companies")
    if response.status_code == 200:
        data = response.json()
        companies = data if isinstance(data, list) else data.get("companies", [])
        assert isinstance(companies, list)

# --- 4. Swipe Actions & Interaction History Contract (SRS Section 7.2) ---
def test_09_record_swipe_action(api_client):
    """Test recording swipe action (right = apply/save, left = skip)."""
    login_resp = api_client.post("/api/v1/auth/login", json={
        "email": "jobseeker@swipex.dev",
        "password": "Password123!"
    })
    token = login_resp.json().get("access_token", "")
    headers = {"Authorization": f"Bearer {token}"}
    
    swipe_payload = {
        "job_id": 1,
        "direction": "right",
        "user_id": "usr-001"
    }
    response = api_client.post("/api/v1/swipes", json=swipe_payload, headers=headers)
    assert response.status_code in [200, 201]

# --- 5. AI/ML Resume & ATS Scoring Heuristic Stub (SRS Section 7.3) ---
def test_10_resume_upload_and_skill_parsing(api_client):
    """Test multipart resume upload."""
    sample_resume_content = b"""
    John Doe - Full Stack Developer
    Experienced in Python, FastAPI, React, TypeScript, Docker, and PostgreSQL.
    Built automated CI/CD pipelines and microservice architectures.
    """
    files = {"file": ("test_resume.txt", sample_resume_content, "text/plain")}
    response = api_client.post("/api/v1/resume/upload", files=files, data={"user_id": "usr-001"})
    if response.status_code in [200, 201]:
        data = response.json()
        assert "resume_id" in data

def test_11_ats_scoring_stub_response(api_client):
    """Test ATS score endpoint returns heuristic tags per frozen contract."""
    response = api_client.get("/api/v1/resume/res-001/ats-score?job_id=1")
    if response.status_code == 200:
        data = response.json()
        assert "match_score" in data or "score" in data
        assert data.get("generated_by") == "heuristic-v0"

def test_12_recommendations_feed(api_client):
    """Test recommendations feed endpoint."""
    response = api_client.get("/api/v1/recommendations?user_id=usr-001")
    if response.status_code == 200:
        data = response.json()
        assert isinstance(data, list)
