import requests

BASE_URL = "http://localhost:8000"

def run_intern3_demo():
    print("=== SwipeX AI/ML Career Intelligence Service Demo ===")
    
    print("\n1. Testing Resume Upload (POST /api/v1/resume/upload)...")
    txt_content = (
        "Alex Rivera\n"
        "Senior Python Backend Developer\n"
        "Skills: Python, FastAPI, PostgreSQL, Docker, Redis, Microservices, REST API, Git, AWS.\n"
        "Experience: 5 years building scalable web services and cloud backends."
    )
    files = {"file": ("alex_backend_resume.txt", txt_content, "text/plain")}
    data = {"user_id": "candidate_alex_99"}
    
    upload_resp = requests.post(f"{BASE_URL}/api/v1/resume/upload", files=files, data=data)
    print(f"Status Code: {upload_resp.status_code}")
    upload_json = upload_resp.json()
    print(f"Response: {upload_json}")
    
    resume_id = upload_json.get("resume_id")
    if not resume_id:
        print("Upload failed.")
        return

    print(f"\n2. Testing ATS Scoring (GET /api/v1/resume/{resume_id}/ats-score?job_id=job_py_01)...")
    ats_resp = requests.get(f"{BASE_URL}/api/v1/resume/{resume_id}/ats-score", params={"job_id": "job_py_01"})
    print(f"Status Code: {ats_resp.status_code}")
    print(f"Response: {ats_resp.json()}")

    print("\n3. Testing Recommendations (GET /api/v1/recommendations?user_id=candidate_alex_99)...")
    rec_resp = requests.get(f"{BASE_URL}/api/v1/recommendations", params={"user_id": "candidate_alex_99", "limit": 5})
    print(f"Status Code: {rec_resp.status_code}")
    print(f"Recommendations: {rec_resp.json()}")

if __name__ == "__main__":
    run_intern3_demo()
