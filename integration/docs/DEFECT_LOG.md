# 🐞 SwipeX — Defect Tracking Register (Milestones 1 & 2)

**Managed by:** Intern 5 — Platform, Testing & Deployment  
**Project:** SwipeX Job Discovery Platform  
**Tracking Cycle:** Day 3 to Day 7 (Continuous Integration & QA Rounds)

---

## 1. Defect Summary Metrics

| Total Logged | Critical (P1) | High (P2) | Medium (P3) | Low (P4) | Resolved & Verified | Closed Rate |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **8** | 2 | 3 | 2 | 1 | **8** | **100%** |

---

## 2. Defect Register

| Defect ID | Module | Description | Sev / Pri | Found In | Assigned To | Resolution & Verification | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **DEF-001** | Gateway | Hop-by-hop headers (`content-length`, `connection`) were forwarded causing downstream HTTP connection resets. | **Critical (P1)** | Day 3 | Intern 1 / 5 | Filtered `HOP_BY_HOP_HEADERS` in Gateway router proxy. Verified with test `test_01_gateway_health`. | **CLOSED** |
| **DEF-002** | Job Service | Search endpoint failed with 500 when query parameter `q` contained uppercase characters. | **High (P2)** | Day 3 | Intern 2 | Added case-insensitive query matching (`lower()`) in Job Data Service search filters. | **CLOSED** |
| **DEF-003** | AI/ML ATS | Missing skills list was returning duplicates when a skill appeared in multiple job sections. | **Medium (P3)** | Day 4 | Intern 3 | Added `sorted(list(set(missing_skills)))` in `ats_scorer.py`. Verified in test suite. | **CLOSED** |
| **DEF-004** | Frontend | Rapid right-swipes triggered concurrent state mutations causing card index out-of-sync. | **High (P2)** | Day 4 | Intern 4 | Added optimistic state locking during swipe transition animations (250ms debounce). | **CLOSED** |
| **DEF-005** | Gateway | Unhandled route for `/api/v1/companies` returned 404 through the proxy. | **Critical (P1)** | Day 5 | Intern 1 / 5 | Registered `/api/v1/companies` and `/api/v1/saved-jobs` in Gateway `ROUTE_TABLE`. | **CLOSED** |
| **DEF-006** | Data Service | SQLite database file lock occurred during concurrent rapid swipe writes. | **High (P2)** | Day 5 | Intern 2 / 5 | Configured SQLite connection pool with `check_same_thread=False` and timeout=15s. | **CLOSED** |
| **DEF-007** | Frontend | Empty state on search filters displayed a blank white screen instead of "No jobs found" card. | **Medium (P3)** | Day 6 | Intern 4 | Added EmptyState illustration component and "Reset Filters" action button. | **CLOSED** |
| **DEF-008** | Platform / Docker | Postgres Alpine container lacked dev healthcheck causing premature Gateway startup. | **Low (P4)** | Day 2 | Intern 5 | Added `healthcheck: test: ["CMD-SHELL", "pg_isready -U swipex"]` and `condition: service_healthy`. | **CLOSED** |

---

## 3. QA Triage & Verification Protocol
1. Any new defect identified by automated testing or manual walkthrough is logged with reproducible curl/payload steps.
2. The owning intern implements the fix and provides a unit test.
3. Intern 5 runs the regression test suite (`test_e2e_integration.py` and `test_rbac_matrix.py`) to confirm fix stability before closing.
