@echo off
REM ==============================================================================
REM SwipeX — 1-Click Complete Platform Launcher
REM Starts: Job Service (:8002), AI/ML Service (:8003), Gateway (:8000), Frontend (:5173)
REM Automatically launches the web browser to http://localhost:5173
REM ==============================================================================

echo ==============================================================================
echo [SwipeX] Launching SwipeX Platform Services...
echo ==============================================================================

REM 1. Start Job & Data Intelligence Service (Port 8002)
echo [1/4] Starting Job and Data Intelligence Service on port 8002...
start "SwipeX - Job Service (8002)" cmd /k "cd /d ""e:\infosys\data intelligence\SwipeX_Job_Data_Intelligence_Shubham"" && python -m uvicorn app.main:app --host 127.0.0.1 --port 8002"

REM 2. Start AI/ML Career Intelligence Service (Port 8003)
echo [2/4] Starting AI/ML Career Intelligence Service on port 8003...
start "SwipeX - AI/ML Service (8003)" cmd /k "cd /d ""e:\infosys\aiml\AI-Powered-Swipe-Based-Job-Discovery-and-Personalized-Career-Intelligence-Platform\AI-Powered-Swipe-Based-Job-Discovery-and-Personalized-Career-Intelligence-Platform"" && python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8003"

REM 3. Start Gateway (Port 8000)
echo [3/4] Starting Unified API Gateway on port 8000...
start "SwipeX - API Gateway (8000)" cmd /k "cd /d ""e:\infosys\integration\docker\gateway"" && set JOB_SERVICE_URL=http://127.0.0.1:8002&& set RESUME_SERVICE_URL=http://127.0.0.1:8003&& python -m uvicorn main:app --host 127.0.0.1 --port 8000"

REM 4. Start Frontend React/Vite (Port 5173)
echo [4/4] Starting React Frontend on port 5173...
start "SwipeX - Frontend (5173)" cmd /k "cd /d ""e:\infosys\frontend\swipex-frontend"" && npm run dev"

echo.
echo ==============================================================================
echo [SwipeX] All 4 services launched in separate windows!
echo Waiting for services to initialize...
echo ==============================================================================

timeout /t 6 /nobreak >nul 2>&1 || ping -n 7 127.0.0.1 >nul
start http://localhost:5173
