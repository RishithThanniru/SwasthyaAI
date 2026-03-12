from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn
from routes import predict, health

app = FastAPI(
    title="SwasthyaAI API",
    description="Silent Disease Risk Predictor for Rural India",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict.router, prefix="/api/predict", tags=["Prediction"])
app.include_router(health.router, prefix="/api/health", tags=["Health"])

@app.get("/")
def root():
    return {"message": "SwasthyaAI Backend Running ✅", "version": "1.0.0"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
