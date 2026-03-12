from fastapi import APIRouter

router = APIRouter()

@router.get("/status")
def health_check():
    return {
        "status": "healthy",
        "service": "SwasthyaAI Backend",
        "version": "1.0.0",
        "models_loaded": True
    }

@router.get("/diseases")
def get_diseases():
    return {
        "supported_diseases": [
            {"id": "diabetes", "name": "Diabetes", "icon": "🩸"},
            {"id": "hypertension", "name": "Hypertension", "icon": "💓"},
            {"id": "anemia", "name": "Anemia", "icon": "🔴"},
            {"id": "thyroid", "name": "Thyroid Disorder", "icon": "🦋"}
        ]
    }
