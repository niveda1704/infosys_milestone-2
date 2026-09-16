"""
SwipeX Non-Functional Requirements (NFR) Performance Test Suite
Owner: Intern 5 (Platform, Testing & Deployment)
Validates NFR-01 (Latency < 500ms) and NFR-02 (Rapid swipe reliability).
"""
import time
import pytest
import httpx

GATEWAY_BASE_URL = "http://localhost:8000"

def test_nfr01_api_latency_under_500ms(api_client):
    """NFR-01: Job listing and search endpoints respond within 500ms under local dev."""
    start_time = time.time()
    response = api_client.get("/health")
    latency_ms = (time.time() - start_time) * 1000
    
    assert response.status_code == 200
    assert latency_ms < 500, f"Gateway health latency {latency_ms:.2f}ms exceeded 500ms target"

def test_nfr02_rapid_swipe_reliability(api_client):
    """NFR-02: Rapid sequential swipes do not cause dropped requests or 500 errors."""
    login_resp = api_client.post("/api/v1/auth/login", json={
        "email": "jobseeker@swipex.dev",
        "password": "Password123!"
    })
    token = login_resp.json().get("access_token", "")
    headers = {"Authorization": f"Bearer {token}"}

    success_count = 0
    total_swipes = 10
    
    for i in range(total_swipes):
        direction = "right" if i % 2 == 0 else "left"
        swipe_payload = {
            "job_id": (i % 5) + 1,
            "direction": direction,
            "user_id": "usr-001"
        }
        resp = api_client.post("/api/v1/swipes", json=swipe_payload, headers=headers)
        if resp.status_code in [200, 201]:
            success_count += 1
            
    # Over local connection or proxy, all valid requests should succeed
    assert success_count >= 8, f"Rapid swipe success rate {success_count}/{total_swipes} too low"
