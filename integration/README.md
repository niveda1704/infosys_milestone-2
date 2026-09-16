# 🚀 SwipeX — Integration, Platform & QA (Milestone 1 & 2)

**Domain:** Platform, Testing & Deployment / Integration  
**Owner:** Intern 5  
**SRS Reference:** Milestone 1 & 2 SRS (Section 4, Section 7, Section 9.5, Section 10.5, Section 13)

---

## 📌 1. Domain Responsibilities
This directory contains the orchestration, automation, testing, and quality assurance deliverables for the **SwipeX** platform. It unites the 4 individual modules created by the team:
- `backend/swipex-backend` (Intern 1: Gateway & Identity)
- `data intelligence/SwipeX_Job_Data_Intelligence_Shubham` (Intern 2 & 3: Job & Data Intelligence)
- `aiml/...` (Intern 3 & 4: AI/ML Career Intelligence & ATS Scoring)
- `frontend/swipex-frontend` (Intern 4: Frontend UI & Discovery)

---

## 📂 2. Directory Structure

```
integration/
├── .github/
│   └── workflows/
│       └── ci.yml                     # 4-Job GitHub Actions Continuous Integration pipeline
├── docker/
│   ├── docker-compose.dev.yml         # Master multi-service Docker Compose environment
│   ├── .env.dev                       # Integrated development environment configuration
│   ├── .env.example                   # Environment variable template
│   ├── career.Dockerfile              # Container build for AI/ML Career Intelligence
│   ├── frontend.Dockerfile            # Container build for React Frontend
│   └── gateway/                       # Integration Gateway with unified reverse-proxy
│       ├── Dockerfile
│       ├── main.py
│       ├── router.py
│       └── requirements.txt
├── tests/
│   ├── test_e2e_integration.py        # Automated End-to-End API contract test suite
│   ├── test_rbac_matrix.py            # RBAC security tests (Candidate / Recruiter / Admin)
│   ├── test_performance_nfr.py        # NFR-01 (latency) & NFR-02 (rapid swipe reliability)
│   ├── SwipeX_M1_M2_Integration.postman_collection.json # Shared Postman collection
│   └── requirements-test.txt          # Test runner dependencies
├── docs/
│   ├── TEST_PLAN.md                   # Master Test Plan for Milestones 1 & 2
│   ├── DEFECT_LOG.md                  # QA Defect Tracking Register
│   ├── CODE_QUALITY_REPORT.md         # Static code analysis & test coverage audit
│   └── QA_SIGN_OFF_REPORT.md          # Formal Acceptance Sign-Off Certificate
├── run_integration_tests.bat          # 1-Click Batch runner for Windows
├── run_integration_tests.ps1          # 1-Click PowerShell runner
└── README.md                          # This documentation file
```

---

## ⚡ 3. Quick Start

### 1. Launch Full Stack with Docker Compose
From `integration/docker/`:
```bash
docker compose -f docker-compose.dev.yml up --build
```

**Port Mapping:**
- **Frontend App:** `http://localhost:5173`
- **Integration Gateway:** `http://localhost:8000` (Swagger UI: `http://localhost:8000/docs`)
- **Job & Data Intelligence Service:** `http://localhost:8002`
- **AI/ML Career Intelligence Service:** `http://localhost:8003`
- **PostgreSQL Database:** `localhost:5432`
- **Redis Cache:** `localhost:6379`

### 2. Run Automated Integration Tests
In Windows, run:
```cmd
run_integration_tests.bat
```
Or with PowerShell:
```powershell
.\run_integration_tests.ps1
```
Or directly with pytest:
```bash
pip install -r tests/requirements-test.txt
pytest tests/ -v
```

---

## 🔒 4. Milestone Boundaries (Golden Rule)
- **Deployment Excluded:** Production deployment (AWS, Azure, Cloud hosting) is intentionally excluded from Milestones 1 & 2, and is scheduled strictly after Milestone 4 (SRS Section 1.2 & 14).
- **Free Tools Only:** 100% of tools used are free and open-source (Docker Compose, GitHub Actions, Pytest, React, Vite).
