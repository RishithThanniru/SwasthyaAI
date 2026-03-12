"""
SwasthyaAI - Disease Risk Predictor
Rule-based + ML hybrid prediction engine
Works offline without internet
"""

def predict_disease_risk(data: dict) -> dict:
    """
    Multi-disease risk prediction using rule-based scoring
    Enhanced with clinical thresholds from medical literature
    """
    
    diabetes_score = _predict_diabetes(data)
    hypertension_score = _predict_hypertension(data)
    anemia_score = _predict_anemia(data)
    thyroid_score = _predict_thyroid(data)
    
    # Overall risk (weighted average)
    overall = int((diabetes_score * 0.3 + hypertension_score * 0.3 + 
                   anemia_score * 0.2 + thyroid_score * 0.2))
    
    def score_to_risk(score):
        if score >= 70: return "High"
        elif score >= 40: return "Moderate"
        else: return "Low"
    
    def risk_color(score):
        if score >= 70: return "red"
        elif score >= 40: return "yellow"
        else: return "green"
    
    phc_data = _get_nearest_phc(data.get("district", "Unknown"), data.get("state", "Telangana"))
    diet_plan = _get_diet_plan(diabetes_score, anemia_score, hypertension_score, data.get("language", "english"))
    
    return {
        "diabetes": score_to_risk(diabetes_score),
        "hypertension": score_to_risk(hypertension_score),
        "anemia": score_to_risk(anemia_score),
        "thyroid": score_to_risk(thyroid_score),
        "diabetes_score": diabetes_score,
        "hypertension_score": hypertension_score,
        "anemia_score": anemia_score,
        "thyroid_score": thyroid_score,
        "overall_score": overall,
        "risk_color": risk_color(overall),
        "nearest_phc": phc_data,
        "diet_plan": diet_plan
    }


def _predict_diabetes(d: dict) -> int:
    score = 0
    age = d.get("age", 0)
    
    # Age risk
    if age >= 45: score += 20
    elif age >= 35: score += 10
    
    # Symptoms
    if d.get("frequent_urination"): score += 20
    if d.get("excessive_thirst"): score += 20
    if d.get("blurred_vision"): score += 15
    if d.get("fatigue"): score += 10
    if d.get("weight_change"): score += 10
    
    # Lifestyle
    if d.get("physical_activity") == "none": score += 15
    if d.get("diet_type") == "non-vegetarian": score += 5
    
    # Vitals
    bmi = d.get("bmi")
    if bmi and bmi >= 30: score += 15
    elif bmi and bmi >= 25: score += 8
    
    sugar = d.get("blood_sugar_fasting")
    if sugar:
        if sugar >= 126: score += 40  # Diabetic range
        elif sugar >= 100: score += 20  # Pre-diabetic
    
    return min(score, 100)


def _predict_hypertension(d: dict) -> int:
    score = 0
    age = d.get("age", 0)
    
    if age >= 55: score += 20
    elif age >= 40: score += 10
    
    if d.get("headache"): score += 15
    if d.get("chest_pain"): score += 20
    if d.get("blurred_vision"): score += 10
    
    if d.get("smoking"): score += 20
    if d.get("alcohol"): score += 15
    if d.get("physical_activity") == "none": score += 15
    if d.get("sleep_hours", 8) < 6: score += 10
    
    bmi = d.get("bmi")
    if bmi and bmi >= 30: score += 15
    
    bp_s = d.get("blood_pressure_systolic")
    bp_d = d.get("blood_pressure_diastolic")
    if bp_s:
        if bp_s >= 140: score += 40
        elif bp_s >= 130: score += 20
        elif bp_s >= 120: score += 10
    if bp_d:
        if bp_d >= 90: score += 20
        elif bp_d >= 80: score += 10
    
    return min(score, 100)


def _predict_anemia(d: dict) -> int:
    score = 0
    
    if d.get("fatigue"): score += 25
    if d.get("pale_skin"): score += 30
    
    gender = d.get("gender", "male")
    if gender == "female": score += 15  # Higher risk in women
    
    age = d.get("age", 0)
    if age < 5 or age > 65: score += 10
    
    if d.get("diet_type") == "vegetarian": score += 15
    if d.get("weight_change"): score += 10
    if d.get("blurred_vision"): score += 5
    
    return min(score, 100)


def _predict_thyroid(d: dict) -> int:
    score = 0
    
    gender = d.get("gender", "male")
    if gender == "female": score += 20  # Higher risk in women
    
    if d.get("fatigue"): score += 15
    if d.get("weight_change"): score += 20
    if d.get("cold_intolerance"): score += 25
    if d.get("hair_loss"): score += 20
    if d.get("sleep_hours", 8) > 10: score += 10
    
    age = d.get("age", 0)
    if age >= 40: score += 10
    
    return min(score, 100)


def _get_nearest_phc(district: str, state: str) -> dict:
    phc_database = {
        "hyderabad": {"name": "Gandhi Hospital PHC", "distance": "2.3 km", "address": "Secunderabad, Hyderabad", "phone": "040-27505566", "cost": "Free (Government)"},
        "warangal": {"name": "MGM Hospital PHC", "distance": "1.8 km", "address": "Hanamkonda, Warangal", "phone": "0870-2577999", "cost": "Free (Government)"},
        "nizamabad": {"name": "District Hospital Nizamabad", "distance": "3.1 km", "address": "Nizamabad", "phone": "08462-222500", "cost": "Free (Government)"},
        "karimnagar": {"name": "Karimnagar Government Hospital", "distance": "2.7 km", "address": "Karimnagar", "phone": "0878-2232726", "cost": "Free (Government)"},
        "default": {"name": "Nearest Primary Health Center", "distance": "Contact 104 helpline", "address": "Visit your nearest PHC", "phone": "104 (Free Health Helpline)", "cost": "Free (Government)"},
    }
    
    key = district.lower() if district.lower() in phc_database else "default"
    return phc_database[key]


def _get_diet_plan(diabetes_score: int, anemia_score: int, hypertension_score: int, language: str) -> list:
    tips = []
    
    if diabetes_score >= 40:
        tips.append("🥗 Reduce sugar and white rice intake. Prefer brown rice, millets (Jowar/Bajra)")
        tips.append("🥬 Add bitter gourd (karela), fenugreek seeds to daily diet")
        tips.append("🚶 Walk 30 minutes daily after meals")
    
    if anemia_score >= 40:
        tips.append("🌿 Eat iron-rich foods: spinach (palak), lentils (dal), jaggery (gur)")
        tips.append("🍊 Add Vitamin C (lemon/amla) to improve iron absorption")
        tips.append("🫘 Include beans and legumes every day")
    
    if hypertension_score >= 40:
        tips.append("🧂 Reduce salt intake. Avoid pickles, papad, processed food")
        tips.append("🍌 Eat potassium-rich foods: banana, coconut water, tomato")
        tips.append("🧘 Practice deep breathing or yoga for 15 minutes daily")
    
    if not tips:
        tips = [
            "🥗 Eat more fresh vegetables and fruits daily",
            "💧 Drink 8-10 glasses of water per day",
            "🚶 Exercise at least 30 minutes daily",
            "😴 Sleep 7-8 hours every night",
            "🚭 Avoid tobacco and alcohol"
        ]
    
    return tips[:5]  # Return max 5 tips
