from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils.predictor import predict_disease_risk
from utils.advice import get_health_advice

router = APIRouter()

class PatientData(BaseModel):
    # Personal Info
    age: int
    gender: str  # "male" / "female"
    language: str = "english"

    # Lifestyle
    physical_activity: str  # "none" / "light" / "moderate" / "heavy"
    smoking: bool
    alcohol: bool
    diet_type: str  # "vegetarian" / "non-vegetarian" / "mixed"
    sleep_hours: float

    # Symptoms
    fatigue: bool
    frequent_urination: bool
    excessive_thirst: bool
    blurred_vision: bool
    headache: bool
    chest_pain: bool
    pale_skin: bool
    weight_change: bool
    cold_intolerance: bool
    hair_loss: bool

    # Vitals (optional)
    blood_pressure_systolic: Optional[float] = None
    blood_pressure_diastolic: Optional[float] = None
    blood_sugar_fasting: Optional[float] = None
    bmi: Optional[float] = None

    # Location for PHC finder
    district: Optional[str] = "Unknown"
    state: Optional[str] = "Telangana"


class PredictionResponse(BaseModel):
    diabetes_risk: str
    hypertension_risk: str
    anemia_risk: str
    thyroid_risk: str
    overall_risk_score: int
    risk_color: str
    advice: dict
    nearest_phc: dict
    diet_plan: list


@router.post("/", response_model=PredictionResponse)
def predict(data: PatientData):
    try:
        result = predict_disease_risk(data.dict())
        advice = get_health_advice(result)
        
        return {
            "diabetes_risk": result["diabetes"],
            "hypertension_risk": result["hypertension"],
            "anemia_risk": result["anemia"],
            "thyroid_risk": result["thyroid"],
            "overall_risk_score": result["overall_score"],
            "risk_color": result["risk_color"],
            "advice": advice,
            "nearest_phc": result["nearest_phc"],
            "diet_plan": result["diet_plan"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
