# 🏥 SwasthyaAI — Offline Silent Disease Risk Predictor for Rural India

> **Hackathon Project** | AI-powered multi-disease health risk predictor | Offline-first | 3 Languages

---

## 🎯 What It Does

SwasthyaAI predicts risk for **4 silent diseases** using multi-modal AI inputs — no lab test needed:

| Disease | Detection Method |
|---------|-----------------|
| 🩸 Diabetes | Symptoms + Blood Sugar + Lifestyle |
| 💓 Hypertension | BP + Symptoms + Age + Habits |
| 🔴 Anemia | Skin + Fatigue + Diet + Gender |
| 🦋 Thyroid | Hair Loss + Cold + Weight Change |

---

## 🚀 Quick Start (VS Code)

### Prerequisites
- [Node.js](https://nodejs.org) v18+
- [Python](https://python.org) 3.10+
- VS Code

---

### Step 1: Clone / Open in VS Code

```bash
# Open VS Code in the project folder
code SwasthyaAI
```

---

### Step 2: Set Up Backend

Open **Terminal 1** in VS Code (`Ctrl + `` ` ``):

```bash
cd backend
pip install -r requirements.txt
python main.py
```

✅ Backend runs at: **http://localhost:8000**
✅ API Docs at: **http://localhost:8000/docs**

---

### Step 3: Set Up Frontend

Open **Terminal 2** in VS Code (`Ctrl + Shift + `` ` ``):

```bash
cd frontend
npm install
npm start
```

✅ Frontend runs at: **http://localhost:3000**

---

## 📁 Project Structure

```
SwasthyaAI/
├── 📁 backend/
│   ├── main.py              ← FastAPI entry point
│   ├── requirements.txt     ← Python dependencies
│   ├── routes/
│   │   ├── predict.py       ← POST /api/predict/
│   │   └── health.py        ← GET /api/health/status
│   └── utils/
│       ├── predictor.py     ← Core disease risk logic
│       └── advice.py        ← Multilingual health advice
│
├── 📁 frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js            ← Router
│       ├── index.js          ← Entry point
│       ├── index.css         ← Global styles
│       ├── components/
│       │   └── Navbar.js
│       └── pages/
│           ├── LandingPage.js     ← Home (/)
│           ├── AssessmentPage.js  ← 6-step form (/assess)
│           ├── ResultsPage.js     ← Risk report (/results)
│           └── DashboardPage.js   ← Village stats (/dashboard)
│
└── README.md
```

---

## 🌐 Pages

| URL | Page | Description |
|-----|------|-------------|
| `/` | Landing Page | Hero, features, how it works |
| `/assess` | Assessment | 6-step multi-language form |
| `/results` | Results | Color-coded risk report + PHC info |
| `/dashboard` | Dashboard | Village health analytics (for NGOs/Govt) |

---

## 🧠 How the AI Prediction Works

The predictor uses **evidence-based clinical scoring**:

```
Diabetes Score = Age risk + Symptoms (thirst/urination/vision) + BMI + Blood Sugar
Hypertension Score = Age + BP vitals + Smoking + Alcohol + Headache
Anemia Score = Fatigue + Pale skin + Gender + Diet type
Thyroid Score = Hair loss + Cold intolerance + Weight change + Gender
```

Each score: **0–100** → Mapped to Low / Moderate / High risk

---

## 💡 Demo Mode

The frontend **works without the backend** — if the backend isn't running, it automatically uses mock prediction data so you can still demo the full UI flow.

---

## 🏆 Key Differentiators (For Judges)

1. **Multi-modal inputs** — Unlike single-disease apps, detects 4 diseases together
2. **Offline-first** — No internet required after initial load
3. **3 Languages** — Telugu, Hindi, English
4. **PHC Finder** — Shows nearest free government hospital
5. **Village Dashboard** — Government/NGO admin panel with charts
6. **Color Risk Mapping** — 🟢🟡🔴 visual risk system
7. **Completely Free** — No cost for rural patients

---

## 📊 API Endpoints

### POST `/api/predict/`
```json
{
  "age": 45,
  "gender": "female",
  "language": "telugu",
  "physical_activity": "light",
  "smoking": false,
  "fatigue": true,
  "pale_skin": true,
  "blood_sugar_fasting": 110,
  "district": "Warangal"
}
```

### Response:
```json
{
  "diabetes_risk": "Moderate",
  "hypertension_risk": "Low",
  "anemia_risk": "High",
  "thyroid_risk": "Low",
  "overall_risk_score": 58,
  "risk_color": "yellow",
  "advice": {...},
  "nearest_phc": {...},
  "diet_plan": [...]
}
```

---

## 🔧 Troubleshooting

**Port 8000 busy?**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <pid> /F

# Mac/Linux
kill -9 $(lsof -ti:8000)
```

**npm install fails?**
```bash
npm install --legacy-peer-deps
```

**Python package error?**
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

---

## 🇮🇳 Built for Bharat

> "77 million Indians have diabetes. 45% are undiagnosed. SwasthyaAI changes that."

**Helpline:** 104 (Free State Health Helpline — 24/7)

---

*Made with ❤️ for rural India | SwasthyaAI v1.0*
🌐 Live Demo

Try the deployed version of SwasthyaAI online:

Frontend (User Interface)
🔗 https://gilded-frangollo-6652f3.netlify.app/

Backend API
🔗 https://swasthyaai.onrender.com

*Made with ❤️ for rural India | SwasthyaAI v1.0*
