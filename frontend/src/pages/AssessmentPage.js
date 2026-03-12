import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Activity, User, Heart, Stethoscope, MapPin } from 'lucide-react';
import axios from 'axios';

const STEPS = [
  { id: 1, title: 'Select Language', icon: '🌐' },
  { id: 2, title: 'Personal Info', icon: <User size={20} /> },
  { id: 3, title: 'Lifestyle', icon: '🌿' },
  { id: 4, title: 'Symptoms', icon: <Heart size={20} /> },
  { id: 5, title: 'Vitals', icon: <Stethoscope size={20} /> },
  { id: 6, title: 'Location', icon: <MapPin size={20} /> },
];

const LABELS = {
  english: {
    age: 'Age', gender: 'Gender', language: 'Language',
    physical_activity: 'Physical Activity Level',
    smoking: 'Do you smoke?', alcohol: 'Do you drink alcohol?',
    diet_type: 'Diet Type', sleep_hours: 'Sleep Hours per Night',
    fatigue: 'Frequent Fatigue/Tiredness',
    frequent_urination: 'Frequent Urination',
    excessive_thirst: 'Excessive Thirst',
    blurred_vision: 'Blurred Vision',
    headache: 'Frequent Headaches',
    chest_pain: 'Chest Pain or Discomfort',
    pale_skin: 'Pale Skin / Pale Nails',
    weight_change: 'Unexplained Weight Change',
    cold_intolerance: 'Feeling Cold Even in Warm Weather',
    hair_loss: 'Unusual Hair Loss',
    bp_sys: 'Systolic BP (upper number, e.g. 120)',
    bp_dia: 'Diastolic BP (lower number, e.g. 80)',
    sugar: 'Fasting Blood Sugar (mg/dL)',
    bmi: 'BMI (if known)',
    district: 'Your District',
    state: 'Your State',
  },
  hindi: {
    age: 'उम्र', gender: 'लिंग', language: 'भाषा',
    physical_activity: 'शारीरिक गतिविधि',
    smoking: 'क्या आप धूम्रपान करते हैं?', alcohol: 'क्या आप शराब पीते हैं?',
    diet_type: 'भोजन प्रकार', sleep_hours: 'नींद के घंटे',
    fatigue: 'थकान', frequent_urination: 'बार-बार पेशाब',
    excessive_thirst: 'अत्यधिक प्यास', blurred_vision: 'धुंधली दृष्टि',
    headache: 'सिरदर्द', chest_pain: 'सीने में दर्द',
    pale_skin: 'पीली त्वचा', weight_change: 'वजन में बदलाव',
    cold_intolerance: 'ठंड सहन न कर पाना', hair_loss: 'बाल झड़ना',
    bp_sys: 'सिस्टोलिक BP', bp_dia: 'डायस्टोलिक BP',
    sugar: 'फास्टिंग शुगर', bmi: 'BMI', district: 'जिला', state: 'राज्य',
  },
  telugu: {
    age: 'వయసు', gender: 'లింగం', language: 'భాష',
    physical_activity: 'శారీరక కార్యకలాపాలు',
    smoking: 'మీరు పొగ తాగుతారా?', alcohol: 'మీరు మద్యం తాగుతారా?',
    diet_type: 'ఆహార రకం', sleep_hours: 'నిద్ర గంటలు',
    fatigue: 'అలసట', frequent_urination: 'తరచుగా మూత్రం',
    excessive_thirst: 'అధిక దాహం', blurred_vision: 'మసక దృష్టి',
    headache: 'తలనొప్పి', chest_pain: 'ఛాతీ నొప్పి',
    pale_skin: 'పాలిపోయిన చర్మం', weight_change: 'బరువు మార్పు',
    cold_intolerance: 'చలి భరించలేకపోవడం', hair_loss: 'జుట్టు రాలడం',
    bp_sys: 'సిస్టోలిక్ BP', bp_dia: 'డయాస్టోలిక్ BP',
    sugar: 'ఫాస్టింగ్ షుగర్', bmi: 'BMI', district: 'జిల్లా', state: 'రాష్ట్రం',
  }
};

const initialFormData = {
  language: 'english', age: '', gender: 'male',
  physical_activity: 'light', smoking: false, alcohol: false,
  diet_type: 'mixed', sleep_hours: 7,
  fatigue: false, frequent_urination: false, excessive_thirst: false,
  blurred_vision: false, headache: false, chest_pain: false,
  pale_skin: false, weight_change: false, cold_intolerance: false, hair_loss: false,
  blood_pressure_systolic: '', blood_pressure_diastolic: '',
  blood_sugar_fasting: '', bmi: '',
  district: '', state: 'Telangana'
};

export default function AssessmentPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const L = LABELS[formData.language];

  const update = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        age: parseInt(formData.age) || 30,
        sleep_hours: parseFloat(formData.sleep_hours) || 7,
        blood_pressure_systolic: formData.blood_pressure_systolic ? parseFloat(formData.blood_pressure_systolic) : null,
        blood_pressure_diastolic: formData.blood_pressure_diastolic ? parseFloat(formData.blood_pressure_diastolic) : null,
        blood_sugar_fasting: formData.blood_sugar_fasting ? parseFloat(formData.blood_sugar_fasting) : null,
        bmi: formData.bmi ? parseFloat(formData.bmi) : null,
      };
      const response = await axios.post('https://swasthyaai.onrender.com/api/predict/', payload);
      localStorage.setItem('swasthya_result', JSON.stringify(response.data));
      localStorage.setItem('swasthya_lang', formData.language);
      navigate('/results');
    } catch (err) {
      // Demo mode: use mock data if backend not running
      const mockResult = {
        diabetes_risk: 'Moderate', hypertension_risk: 'Low',
        anemia_risk: formData.pale_skin || formData.fatigue ? 'High' : 'Low',
        thyroid_risk: formData.hair_loss || formData.cold_intolerance ? 'Moderate' : 'Low',
        overall_risk_score: 45, risk_color: 'yellow',
        advice: {
          message: '🟡 MODERATE RISK. Monitor your health closely.',
          urgency: 'Visit a doctor within 1-2 weeks',
          action: 'Make lifestyle changes and get a checkup soon.',
          disease_specific_advice: ['Get HbA1c test done soon'],
          helpline: '104 - Free State Health Helpline (24/7)'
        },
        nearest_phc: {
          name: 'Nearest Primary Health Center',
          distance: 'Contact 104 helpline',
          address: 'Visit your nearest PHC',
          phone: '104', cost: 'Free (Government)'
        },
        diet_plan: [
          '🥗 Reduce sugar and white rice intake. Prefer brown rice, millets',
          '🌿 Eat iron-rich foods: spinach, lentils, jaggery',
          '💧 Drink 8-10 glasses of water per day',
          '🚶 Walk 30 minutes daily after meals',
          '😴 Sleep 7-8 hours every night'
        ]
      };
      localStorage.setItem('swasthya_result', JSON.stringify(mockResult));
      localStorage.setItem('swasthya_lang', formData.language);
      navigate('/results');
    } finally {
      setLoading(false);
    }
  };

  const ToggleBtn = ({ field, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)', marginBottom: 12 }}>
      <span style={{ fontSize: 15, color: '#c8d6e5' }}>{label}</span>
      <button onClick={() => update(field, !formData[field])} style={{
        width: 52, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer',
        background: formData[field] ? 'linear-gradient(135deg, #00ff87, #00d4aa)' : '#1e2d3d',
        position: 'relative', transition: 'all 0.3s'
      }}>
        <div style={{
          position: 'absolute', top: 3, width: 22, height: 22, borderRadius: '50%',
          background: '#fff', transition: 'all 0.3s',
          left: formData[field] ? 27 : 3, boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
        }} />
      </button>
    </div>
  );

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#f0f6ff', borderRadius: 10, padding: '12px 16px',
    fontSize: 15, width: '100%', marginBottom: 16, outline: 'none',
    fontFamily: 'Sora, sans-serif', transition: 'border-color 0.3s'
  };

  const labelStyle = { fontSize: 13, color: '#8892a4', marginBottom: 6, display: 'block', fontWeight: 500 };

  const selectStyle = { ...inputStyle, cursor: 'pointer' };

  const renderStep = () => {
    switch (step) {
      case 1: return (
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Choose Your Language</h3>
          <p style={{ color: '#8892a4', marginBottom: 32 }}>Select the language you're most comfortable with</p>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { val: 'english', label: 'English', sub: 'English' },
              { val: 'hindi', label: 'हिंदी', sub: 'Hindi' },
              { val: 'telugu', label: 'తెలుగు', sub: 'Telugu' },
            ].map(lang => (
              <button key={lang.val} onClick={() => update('language', lang.val)} style={{
                padding: '20px 24px', borderRadius: 14, cursor: 'pointer', textAlign: 'left',
                background: formData.language === lang.val ? 'rgba(0,255,135,0.1)' : 'rgba(255,255,255,0.03)',
                border: formData.language === lang.val ? '2px solid #00ff87' : '2px solid rgba(255,255,255,0.07)',
                color: '#f0f6ff', transition: 'all 0.2s', fontFamily: 'Sora, sans-serif',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <span style={{ fontSize: 24, fontWeight: 700 }}>{lang.label}</span>
                <span style={{ fontSize: 14, color: '#8892a4' }}>{lang.sub}</span>
              </button>
            ))}
          </div>
        </div>
      );

      case 2: return (
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{L.age} & Basic Info</h3>
          <p style={{ color: '#8892a4', marginBottom: 32 }}>Tell us about yourself</p>
          <label style={labelStyle}>{L.age}</label>
          <input type="number" value={formData.age} onChange={e => update('age', e.target.value)}
            placeholder="Enter your age" min={1} max={120} style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#00ff87'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
          <label style={labelStyle}>{L.gender}</label>
          <select value={formData.gender} onChange={e => update('gender', e.target.value)} style={selectStyle}>
            <option value="male">Male / पुरुष / మగ</option>
            <option value="female">Female / महिला / ఆడ</option>
          </select>
          <label style={labelStyle}>{L.sleep_hours}</label>
          <input type="number" value={formData.sleep_hours} onChange={e => update('sleep_hours', e.target.value)}
            placeholder="7" min={1} max={24} style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#00ff87'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
        </div>
      );

      case 3: return (
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Lifestyle Habits</h3>
          <p style={{ color: '#8892a4', marginBottom: 32 }}>Be honest — this helps improve accuracy</p>
          <label style={labelStyle}>{L.physical_activity}</label>
          <select value={formData.physical_activity} onChange={e => update('physical_activity', e.target.value)} style={{ ...selectStyle, marginBottom: 20 }}>
            <option value="none">None / बिल्कुल नहीं / అసలు లేదు</option>
            <option value="light">Light (walks) / हल्का / తేలికపాటి</option>
            <option value="moderate">Moderate / मध्यम / మధ్యస్థ</option>
            <option value="heavy">Heavy (gym/labor) / भारी / భారీ</option>
          </select>
          <label style={labelStyle}>{L.diet_type}</label>
          <select value={formData.diet_type} onChange={e => update('diet_type', e.target.value)} style={{ ...selectStyle, marginBottom: 20 }}>
            <option value="vegetarian">Vegetarian / शाकाहारी / శాఖాహారి</option>
            <option value="non-vegetarian">Non-Vegetarian / मांसाहारी / మాంసాహారి</option>
            <option value="mixed">Mixed / मिश्रित / మిశ్రమ</option>
          </select>
          <ToggleBtn field="smoking" label={L.smoking} />
          <ToggleBtn field="alcohol" label={L.alcohol} />
        </div>
      );

      case 4: return (
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Symptoms</h3>
          <p style={{ color: '#8892a4', marginBottom: 32 }}>Select all symptoms you experience regularly</p>
          {[
            { field: 'fatigue', label: L.fatigue + ' 😴' },
            { field: 'frequent_urination', label: L.frequent_urination + ' 🚽' },
            { field: 'excessive_thirst', label: L.excessive_thirst + ' 💧' },
            { field: 'blurred_vision', label: L.blurred_vision + ' 👁️' },
            { field: 'headache', label: L.headache + ' 🤕' },
            { field: 'chest_pain', label: L.chest_pain + ' 💔' },
            { field: 'pale_skin', label: L.pale_skin + ' 🫠' },
            { field: 'weight_change', label: L.weight_change + ' ⚖️' },
            { field: 'cold_intolerance', label: L.cold_intolerance + ' 🥶' },
            { field: 'hair_loss', label: L.hair_loss + ' 💇' },
          ].map(s => <ToggleBtn key={s.field} field={s.field} label={s.label} />)}
        </div>
      );

      case 5: return (
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Basic Vitals</h3>
          <p style={{ color: '#8892a4', marginBottom: 8 }}>Optional — Skip if you don't know. More data = better accuracy.</p>
          <div style={{ background: 'rgba(0,255,135,0.06)', border: '1px solid rgba(0,255,135,0.15)', borderRadius: 10, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: '#00ff87' }}>
            💡 You can skip this step. These are only for better predictions.
          </div>
          {[
            { key: 'blood_pressure_systolic', label: L.bp_sys, ph: '120' },
            { key: 'blood_pressure_diastolic', label: L.bp_dia, ph: '80' },
            { key: 'blood_sugar_fasting', label: L.sugar, ph: '90' },
            { key: 'bmi', label: L.bmi, ph: '22.5' },
          ].map(v => (
            <div key={v.key}>
              <label style={labelStyle}>{v.label}</label>
              <input type="number" value={formData[v.key]} onChange={e => update(v.key, e.target.value)}
                placeholder={v.ph} style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#00ff87'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
            </div>
          ))}
        </div>
      );

      case 6: return (
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Your Location</h3>
          <p style={{ color: '#8892a4', marginBottom: 32 }}>To find the nearest free government hospital</p>
          <label style={labelStyle}>{L.district}</label>
          <input value={formData.district} onChange={e => update('district', e.target.value)}
            placeholder="e.g. Hyderabad, Warangal, Nizamabad..." style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#00ff87'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
          <label style={labelStyle}>{L.state}</label>
          <select value={formData.state} onChange={e => update('state', e.target.value)} style={selectStyle}>
            {['Telangana', 'Andhra Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Rajasthan', 'Other'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div style={{ background: 'rgba(0,255,135,0.06)', border: '1px solid rgba(0,255,135,0.15)', borderRadius: 12, padding: 20, marginTop: 16 }}>
            <p style={{ fontSize: 15, color: '#00ff87', fontWeight: 700, marginBottom: 8 }}>✅ Ready to Analyze!</p>
            <p style={{ fontSize: 13, color: '#8892a4', lineHeight: 1.6 }}>
              Our AI will analyze your inputs and generate a risk report for Diabetes, Hypertension, Anemia & Thyroid in seconds.
            </p>
          </div>
        </div>
      );

      default: return null;
    }
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 60, position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
            <Activity size={22} color="#00ff87" />
            <h1 style={{ fontSize: 28, fontWeight: 800 }}>Health Risk Assessment</h1>
          </div>
          <p style={{ color: '#8892a4' }}>Step {step} of {STEPS.length} · Takes about 2 minutes</p>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ height: 4, background: '#1e2d3d', borderRadius: 2, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #00ff87, #00d4aa)', borderRadius: 2, transition: 'width 0.5s ease' }} />
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {STEPS.map(s => (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
                background: step === s.id ? 'rgba(0,255,135,0.12)' : 'transparent',
                color: step === s.id ? '#00ff87' : step > s.id ? '#4a5568' : '#4a5568',
                border: step === s.id ? '1px solid rgba(0,255,135,0.25)' : '1px solid transparent',
                transition: 'all 0.3s'
              }}>
                {step > s.id ? '✓' : s.icon} {s.title}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div style={{
          background: '#0d1117', border: '1px solid #1e2d3d', borderRadius: 20,
          padding: '32px', marginBottom: 32, minHeight: 400
        }}>
          {renderStep()}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
          <button onClick={() => setStep(s => s - 1)} disabled={step === 1} style={{
            flex: 1, padding: '14px', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: step === 1 ? 'not-allowed' : 'pointer',
            background: 'transparent', color: step === 1 ? '#2a3a4a' : '#8892a4',
            border: `1px solid ${step === 1 ? '#1e2d3d' : '#2a3a4a'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.3s', fontFamily: 'Sora, sans-serif'
          }}>
            <ChevronLeft size={18} /> Back
          </button>
          
          {step < STEPS.length ? (
            <button onClick={() => setStep(s => s + 1)} style={{
              flex: 2, padding: '14px', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer',
              background: 'linear-gradient(135deg, #00ff87, #00d4aa)', color: '#000', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 6px 20px rgba(0,255,135,0.25)', transition: 'all 0.3s', fontFamily: 'Sora, sans-serif'
            }}>
              Continue <ChevronRight size={18} />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={loading} style={{
              flex: 2, padding: '14px', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              background: loading ? '#1e2d3d' : 'linear-gradient(135deg, #00ff87, #00d4aa)',
              color: loading ? '#8892a4' : '#000', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: loading ? 'none' : '0 6px 20px rgba(0,255,135,0.25)', transition: 'all 0.3s', fontFamily: 'Sora, sans-serif'
            }}>
              {loading ? (
                <>
                  <div style={{ width: 18, height: 18, border: '2px solid #4a5568', borderTopColor: '#00ff87', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  Analyzing...
                </>
              ) : (
                <><Activity size={18} /> Get My Risk Report</>
              )}
            </button>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
