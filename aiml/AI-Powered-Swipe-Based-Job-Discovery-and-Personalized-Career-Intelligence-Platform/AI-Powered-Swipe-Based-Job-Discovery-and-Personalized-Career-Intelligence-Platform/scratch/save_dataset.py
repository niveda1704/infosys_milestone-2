import json
from pathlib import Path

data_dir = Path("data")
data_dir.mkdir(exist_ok=True)

# Parse raw text provided by user and save valid items
raw_user_input = """[
  {
    "job_id": 1,
    "company_id": 1,
    "company_name": "Google",
    "company_type": "MNC",
    "company_industry": "Internet & Cloud Technology",
    "job_title": "Software Development Engineer in Test (SDET / QA)",
    "role_category": "QA/Testing",
    "job_description": "Build automated test suites for REST APIs, validate RBAC security policies, and maintain regression test beds.",
    "responsibilities": "Develop automated integration test cases using Pytest; maintain Postman collections; perform load and security tests.",
    "requirements": "Strong Python test automation skills and deep understanding of HTTP status codes and API specifications.",
    "skills_required": "[\"Python\", \"Pytest\", \"Postman\", \"REST APIs\", \"Selenium\", \"Jest\", \"CI/CD\"]",
    "job_type": "Full-time",
    "workplace_type": "Remote",
    "location": "Remote (Global)",
    "salary_min": 917725,
    "salary_max": 1606019,
    "salary_currency": "INR",
    "salary_period": "Per Annum",
    "experience_level": "Entry-level",
    "experience_years_min": 1,
    "experience_years_max": 3,
    "competition_level": "High",
    "applicant_count": 127,
    "is_fresher_friendly": true,
    "is_active": true,
    "posted_at": "2026-08-25 18:03:58"
  }
]"""

print("Saving dataset...")
