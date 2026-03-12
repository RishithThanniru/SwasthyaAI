#!/bin/bash
echo "========================================"
echo "   SwasthyaAI - Starting Application"
echo "========================================"

# Start Backend
echo "[1/2] Starting Backend (FastAPI)..."
cd backend
pip install -r requirements.txt -q
python main.py &
BACKEND_PID=$!
cd ..

echo "Waiting for backend to start..."
sleep 3

# Start Frontend
echo "[2/2] Starting Frontend (React)..."
cd frontend
npm install --legacy-peer-deps --silent
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================"
echo " SwasthyaAI is running!"
echo " Backend:  http://localhost:8000"
echo " Frontend: http://localhost:3000"
echo " API Docs: http://localhost:8000/docs"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
