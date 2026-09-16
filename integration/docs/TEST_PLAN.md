# 📋 SwipeX — Master Test Plan (Milestones 1 & 2)

**Author:** Intern 5 — Platform, Testing & Deployment  
**Project:** SwipeX (Intelligent Job Discovery Platform)  
**Target Increment:** Milestone 1 (Initialization & Core Setup) & Milestone 2 (Swipe System & Job Discovery)  
**Environment:** Local/Dev Docker Compose (Production deployment explicitly deferred to Milestone 4)  
**Tooling Policy:** 100% Free and Open Source (Golden Rule SRS Section 1.5)

---

## 1. Objectives & Scope
This test plan defines the testing strategy, test scenarios, execution schedule, and acceptance gates for validating the integration of all five intern domains:
1. **Intern 1 / Backend Lead:** API Gateway routing, JWT Authentication, and RBAC enforcement.
2. **Intern 2 & 3 / Job & Data Intelligence:** Job catalog (317 seed jobs across 29 employers), search indexing, swipe history, freshness, and applicant competition tags.
3. **Intern 3 & 4 / AI/ML Career Intelligence:** Heuristic ATS scoring (`heuristic-v0`), 250+ skill taxonomy extraction, and personalized recommendation feeds.
4. **Intern 4 / Frontend & UX:** React swipe-deck, filter bar, company pages, candidate dashboard, and recruiter job-posting views.
5. **Intern 5 / Platform & Testing:** Integration verification, CI pipeline, defect tracking, and regression sign-off.

---

## 2. Test Strategy & Levels

| Test Level | Scope & Tooling | Success Metric | Owner |
| :--- | :--- | :--- | :--- |
| **Unit Testing** | Individual services tested in isolation via `pytest` (Backend/Data/AI) and Jest/React Testing Library (Frontend). | 100% pass rate (30 data tests, 28 AI tests). | Interns 1, 2, 3, 4 |
| **Integration Testing** | Inter-service HTTP communication routed via Gateway (`:8000`) using `pytest` + `httpx`. | All 12 core API contracts pass with status 200/201. | Intern 5 |
| **RBAC / Security Testing** | Verification of JWT role claims (Job Seeker, Recruiter, Admin) and 401/403 HTTP error status codes. | Unauthorized actions strictly blocked. | Intern 5 |
| **NFR / Performance Testing** | Latency benchmark under dev load and rapid sequential swipe writes. | P95 latency < 500ms; 0 dropped writes. | Intern 5 |
| **Regression Testing** | Automated re-run of all test suites on pull requests via GitHub Actions. | Zero regression bugs before merge. | Intern 5 |

---

## 3. Detailed Test Matrix

### 3.1 Authentication & Role-Based Access Control (FR-01, FR-02, FR-09)
- **TC-AUTH-01:** Candidate user registration with email, password, and role.
- **TC-AUTH-02:** User login returning JWT `access_token` and `refresh_token`.
- **TC-AUTH-03:** Protected endpoint access (`/api/v1/auth/me`) with valid Bearer token.
- **TC-AUTH-04:** Rejection of expired or tampered token with HTTP 401 Unauthorized.
- **TC-AUTH-05:** Role enforcement: Job Seeker restricted from posting jobs; Recruiter restricted from candidate swipes.

### 3.2 Job & Data Intelligence (FR-03, FR-04, FR-05)
- **TC-JOB-01:** Retrieve paginated job catalog with 317 seeded jobs.
- **TC-JOB-02:** Filter jobs by `type` (MNC, Startup, Newly Founded) and `location` (Remote, Hybrid, Onsite).
- **TC-JOB-03:** Full-text smart search across title, description, and required skills (`/api/v1/jobs/search?q=Python`).
- **TC-JOB-04:** Verify job cards include `competition_level` badge (Low, Medium, High) based on applicant thresholds.
- **TC-JOB-05:** Verify `posted_time` freshness indicator displays accurately.

### 3.3 Swipe System & Candidate Interaction (FR-05, FR-10)
- **TC-SWIPE-01:** Record right-swipe action (`POST /api/v1/swipes` with `direction: "right"`).
- **TC-SWIPE-02:** Record left-swipe action (`POST /api/v1/swipes` with `direction: "left"`).
- **TC-SWIPE-03:** Retrieve user swipe history (`GET /api/v1/swipes/history`).
- **TC-SWIPE-04:** Validate Redis cache speedup on repeated job feed queries.

### 3.4 AI/ML Career Intelligence & ATS Stub (FR-06, FR-07, FR-08)
- **TC-AI-01:** Resume upload in `.txt` and `.pdf` formats returning extracted skills.
- **TC-AI-02:** Heuristic ATS score calculation returning `match_score` and `missing_keywords`.
- **TC-AI-03:** Verify response includes `generated_by: "heuristic-v0"`.
- **TC-AI-04:** Personalized recommendation feed ordered descending by match percentage.

---

## 4. Non-Functional Requirements (NFRs)

- **NFR-01 (Performance):** Typical job search and listing queries respond in under 500ms on the local dev stack.
- **NFR-02 (Reliability):** Rapid swipe gestures (10 consecutive swipes within 3 seconds) complete with 100% write integrity without duplicate IDs or 500 crashes.
- **NFR-03 (Security):** RBAC enforced consistently; unauthenticated or forbidden requests return clear 401 or 403 responses.
- **NFR-06 (Portability & Zero Cost):** The entire stack runs on Docker Compose on a single developer machine with zero paid third-party dependencies.

---

## 5. Defect Severity & Priority Guidelines

- **Critical (P1 / S1):** System crash, database failure, unauthenticated data leak, or Gateway proxy blockage.
- **High (P2 / S2):** Broken core functional requirement (e.g., swipe not saved, search query returning 500).
- **Medium (P3 / S3):** Minor response schema deviation, UI styling glitch, or caching miss.
- **Low (P4 / S4):** Typo, non-blocking cosmetic alignment, or documentation note.
