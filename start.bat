@echo off
echo ========================================
echo    SwasthyaAI - Starting Application
echo ========================================
echo.

echo [1/2] Starting Backend (FastAPI)...
start "SwasthyaAI Backend" cmd /k "cd backend && pip install -r requirements.txt -q && python main.py"

echo Waiting for backend to start...
timeout /t 4 /nobreak > nul

echo [2/2] Starting Frontend (React)...
start "SwasthyaAI Frontend" cmd /k "cd frontend && npm install --legacy-peer-deps && npm start"

echo.
echo ========================================
echo  SwasthyaAI is starting up!
echo  Backend:  http://localhost:8000
echo  Frontend: http://localhost:3000
echo  API Docs: http://localhost:8000/docs
echo ========================================
pause
