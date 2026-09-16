# ==============================================================================
# SwipeX — 1-Click Automated Integration Test Runner (PowerShell)
# Owner: Intern 5 (Platform, Testing & Deployment)
# ==============================================================================

Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host "SwipeX — Running Multi-Service Automated Integration Tests (Milestone 1 & 2)" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Cyan

# 1. Install / Verify test dependencies
Write-Host "`n[1/3] Checking test requirements..." -ForegroundColor Yellow
python -m pip install -q -r tests\requirements-test.txt

# 2. Run Pytest Suite
Write-Host "`n[2/3] Executing Integration, RBAC, and Performance Test Suites..." -ForegroundColor Yellow
python -m pytest tests\test_e2e_integration.py tests\test_rbac_matrix.py tests\test_performance_nfr.py -v

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[3/3] [SUCCESS] All Integration Tests Passed!" -ForegroundColor Green
    Write-Host "Milestones 1 & 2 Acceptance Criteria satisfied." -ForegroundColor Green
} else {
    Write-Host "`n[3/3] [WARNING] Test suite flagged items. See docs/DEFECT_LOG.md." -ForegroundColor Red
}
