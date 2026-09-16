@echo off
REM ==============================================================================
REM SwipeX — 1-Click Automated Integration Test Runner
REM Owner: Intern 5 (Platform, Testing & Deployment)
REM ==============================================================================

echo [SwipeX] Running Multi-Service Automated Integration Tests...
echo ------------------------------------------------------------------------------

REM 1. Check Python
where python >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Python not found in PATH. Please install Python 3.10+
    pause
    exit /b 1
)

REM 2. Install test dependencies if needed
echo [SwipeX] Checking test dependencies...
python -m pip install -q -r tests\requirements-test.txt

REM 3. Run Pytest Suite
echo.
echo [SwipeX] Executing End-to-End Integration, RBAC, and Performance Tests...
echo ------------------------------------------------------------------------------
python -m pytest tests\test_e2e_integration.py tests\test_rbac_matrix.py tests\test_performance_nfr.py -v

if %ERRORLEVEL% equ 0 (
    echo.
    echo ==============================================================================
    echo [SUCCESS] All Integration Tests Passed! Milestone 1 & 2 Quality Gate Cleared.
    echo ==============================================================================
) else (
    echo.
    echo ==============================================================================
    echo [WARNING] One or more tests flagged issues. Check logs and DEFECT_LOG.md.
    echo ==============================================================================
)

pause
