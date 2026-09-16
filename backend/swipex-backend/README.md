# SwipeX Backend — Milestone 1

**Owner:** Intern 1 — Team Lead / Backend & Identity Management
**Scope:** Repository/architecture setup, API Gateway, Auth Service (JWT + Google OAuth2), RBAC middleware,
and integration points for the Job/Swipe Service (Intern 2) and Resume/ATS Service (Intern 3) stubs.

All tooling used is 100% free/open-source, per the SRS Golden Rule (Section 1.5). No production deployment
is included here — that's explicitly out of scope until after Milestone 4.

---

## Architecture

```
                        ┌─────────────┐
   Frontend (React)  →  │   Gateway   │  :8000
                        └──────┬──────┘
              ┌────────────────┼────────────────┐
              ▼                ▼                 ▼
      ┌───────────────┐ ┌─────────────┐ ┌────────────────┐
      │ Auth Service  │ │ Job Service │ │ Resume Service  │
      │    :8001      │ │    :8002    │ │     :8003       │
      │ (PostgreSQL)  │ │ (in-memory) │ │  (in-memory,    │
      │               │ │             │ │  calls Job Svc) │
      └───────┬───────┘ └─────────────┘ └─────────────────┘
              ▼
        ┌───────────┐   ┌───────┐
        │ PostgreSQL│   │ Redis │
        └───────────┘   └───────┘
```

- **Gateway** — single entry point the frontend talks to (`localhost:8000`). Proxies `/api/v1/*` requests
  to the correct downstream service based on path prefix.
- **Auth Service** — the only service backed by a real database (PostgreSQL via async SQLAlchemy). Owns
  registration, login, Google OAuth2, JWT issuance, and RBAC identity.
- **Job Service** — Milestone 1 stub with realistic in-memory seed data (6 sample jobs) so the frontend/QA
  can integrate today, ahead of Intern 2's full Postgres-backed implementation.
- **Resume Service** — Milestone 1 heuristic stub (`generated_by: "heuristic-v0"`) using keyword-overlap
  scoring, calling the Job Service internally for job skill data. Real NLP scoring lands in Milestone 2.
- **RBAC** — every service independently verifies the same shared-secret JWT (no auth service round-trip
  per request), keeping services decoupled and fast.

---

## Prerequisites

- Docker + Docker Compose (free, no account needed for local use)
- (Optional, for running a service outside Docker) Python 3.11+

---

## Setup & Run — Full Stack (Recommended)

```bash
# 1. Clone / unzip the project, then from the swipex-backend/ root:
cp .env.example .env
# Edit .env if you want real Google OAuth2 — otherwise leave the defaults,
# the /oauth/google endpoint will return a clear 501 until credentials are set.

# 2. Build and start everything
docker compose -f docker-compose.dev.yml up --build

# 3. Wait for all containers to report healthy/running, then open:
#    Gateway health check:   http://localhost:8000/health
#    Auth Service Swagger:   http://localhost:8001/docs
#    Job Service Swagger:    http://localhost:8002/docs
#    Resume Service Swagger: http://localhost:8003/docs
```

> The Gateway itself proxies raw requests, so its own `/docs` won't render the downstream schemas —
> use each service's own Swagger UI (linked above) to explore and test the exact request/response shapes,
> then hit the same paths through `http://localhost:8000` once you're ready to test end-to-end.

---

## Testing the Flow End-to-End (via Gateway, port 8000)

```bash
# 1. Register a Job Seeker
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Asha Rao","email":"asha@example.com","password":"SecurePass123","role":"Job Seeker"}'

# 2. Log in — copy the access_token from the response
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"asha@example.com","password":"SecurePass123"}'

# 3. Call a protected endpoint
curl http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer <access_token>"

# 4. Browse jobs (no auth required)
curl "http://localhost:8000/api/v1/jobs?type=Startup"

# 5. Swipe right on a job (auth required)
curl -X POST http://localhost:8000/api/v1/swipes \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"job_id":"job-002","direction":"right"}'

# 6. View swipe history
curl http://localhost:8000/api/v1/swipes/history \
  -H "Authorization: Bearer <access_token>"

# 7. Upload a resume (auth required, multipart)
curl -X POST http://localhost:8000/api/v1/resume/upload \
  -H "Authorization: Bearer <access_token>" \
  -F "file=@/path/to/resume.pdf"

# 8. Get an ATS score against a job — use the resume_id from step 7
curl "http://localhost:8000/api/v1/resume/<resume_id>/ats-score?job_id=job-001"

# 9. Get recommendations — use the user_id from step 3 (/auth/me)
curl "http://localhost:8000/api/v1/recommendations?user_id=<user_id>"
```

---

## Running a Single Service Locally (Without Docker)

Useful while actively developing one service:

```bash
cd services/auth_service   # or job_service / resume_service, or gateway/
python -m venv venv && source venv/bin/activate
pip install -r ../../requirements.txt   # adjust path as needed
uvicorn main:app --reload --port 8001   # match the service's assigned port
```

Note: `auth_service` needs a reachable PostgreSQL instance (`docker compose up postgres` is enough on
its own), and `resume_service` needs `JOB_SERVICE_URL` pointing at a running `job_service`.

---

## Role-Based Access Control

Roles: `Job Seeker`, `Recruiter`, `Admin` — enforced via the `require_roles([...])` dependency
(`services/auth_service/utils/rbac.py`), reusable across every protected route:

```python
from utils.rbac import require_roles

@router.post("/jobs")
async def create_job(payload: JobCreate, user=Depends(require_roles(["Recruiter", "Admin"]))):
    ...
```

Unauthenticated requests → `401`. Authenticated but wrong role → `403`.

---

## Notes for the Team

- **Google OAuth2**: the `/api/v1/auth/oauth/google` endpoint is fully implemented but requires real
  `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` in `.env` (free to create in Google Cloud Console — no
  billing required for OAuth consent screen + credentials). Until then it returns a `501` with a clear
  message, so Frontend/QA can mock this per the SRS Risk table (Section 14) instead of blocking.
- **Job/Resume services use in-memory data** for Milestone 1, per the SRS scope (heuristic stub, no real
  ML model yet). This means data resets on container restart — expected and fine for this milestone.
- **Alembic** is included in `requirements.txt` for the Auth Service's future schema migrations; Milestone 1
  uses `create_all()` on startup for simplicity. Set up `alembic init` when real schema evolution starts.
- **Shared JWT secret**: all three services read the same `JWT_SECRET_KEY` from `.env` to verify tokens
  independently — if you rotate the secret, update `.env` and restart all services together.
