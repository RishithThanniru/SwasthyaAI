"""
Health Advice Generator for SwasthyaAI
Multilingual support: English, Hindi, Telugu
"""

ADVICE_DB = {
    "High": {
        "english": {
            "message": "⚠️ HIGH RISK DETECTED. Please visit a doctor immediately.",
            "urgency": "Visit hospital within 1-2 days",
            "action": "Get a blood test done at your nearest PHC. It's FREE at government hospitals."
        },
        "hindi": {
            "message": "⚠️ उच्च जोखिम पाया गया। कृपया तुरंत डॉक्टर से मिलें।",
            "urgency": "1-2 दिनों में अस्पताल जाएं",
            "action": "नजदीकी PHC में रक्त परीक्षण करवाएं। सरकारी अस्पताल में यह मुफ्त है।"
        },
        "telugu": {
            "message": "⚠️ అధిక ప్రమాదం గుర్తించబడింది. దయచేసి వెంటనే వైద్యుడిని సందర్శించండి.",
            "urgency": "1-2 రోజులలో ఆసుపత్రికి వెళ్ళండి",
            "action": "సమీపంలోని PHCలో రక్త పరీక్ష చేయించుకోండి. ప్రభుత్వ ఆసుపత్రిలో ఇది ఉచితం."
        }
    },
    "Moderate": {
        "english": {
            "message": "🟡 MODERATE RISK. Monitor your health closely.",
            "urgency": "Visit a doctor within 1-2 weeks",
            "action": "Make lifestyle changes and get a checkup soon."
        },
        "hindi": {
            "message": "🟡 मध्यम जोखिम। अपने स्वास्थ्य पर ध्यान दें।",
            "urgency": "1-2 सप्ताह में डॉक्टर से मिलें",
            "action": "जीवनशैली में बदलाव करें और जल्द चेकअप कराएं।"
        },
        "telugu": {
            "message": "🟡 మధ్యస్థ ప్రమాదం. మీ ఆరోగ్యాన్ని నిశితంగా గమనించండి.",
            "urgency": "1-2 వారాలలో వైద్యుడిని చూడండి",
            "action": "జీవనశైలి మార్పులు చేసి త్వరలో పరీక్షించుకోండి."
        }
    },
    "Low": {
        "english": {
            "message": "🟢 LOW RISK. Keep up your healthy habits!",
            "urgency": "Annual checkup recommended",
            "action": "Maintain your current lifestyle. Eat well, sleep well, stay active."
        },
        "hindi": {
            "message": "🟢 कम जोखिम। अपनी स्वस्थ आदतें जारी रखें!",
            "urgency": "वार्षिक जांच की सिफारिश की जाती है",
            "action": "अपनी वर्तमान जीवनशैली बनाए रखें। अच्छा खाएं, अच्छी नींद लें।"
        },
        "telugu": {
            "message": "🟢 తక్కువ ప్రమాదం. మీ ఆరోగ్యకరమైన అలవాట్లు కొనసాగించండి!",
            "urgency": "వార్షిక తనిఖీ సిఫార్సు చేయబడింది",
            "action": "మీ ప్రస్తుత జీవనశైలిని నిర్వహించండి. బాగా తినండి, బాగా నిద్రపోండి."
        }
    }
}

def get_health_advice(result: dict, language: str = "english") -> dict:
    risk_color = result.get("risk_color", "green")
    
    risk_map = {"red": "High", "yellow": "Moderate", "green": "Low"}
    risk_level = risk_map.get(risk_color, "Low")
    
    lang = language if language in ["english", "hindi", "telugu"] else "english"
    
    advice = ADVICE_DB.get(risk_level, ADVICE_DB["Low"]).get(lang, ADVICE_DB["Low"]["english"])
    
    disease_specific = []
    if result.get("diabetes") == "High":
        disease_specific.append("Diabetes: Get HbA1c and fasting glucose test")
    if result.get("hypertension") == "High":
        disease_specific.append("Hypertension: Monitor BP daily, reduce salt")
    if result.get("anemia") == "High":
        disease_specific.append("Anemia: Get CBC blood test, increase iron-rich foods")
    if result.get("thyroid") == "High":
        disease_specific.append("Thyroid: Get TSH test done at nearest lab")
    
    return {
        **advice,
        "disease_specific_advice": disease_specific,
        "helpline": "104 - Free State Health Helpline (24/7)"
    }
