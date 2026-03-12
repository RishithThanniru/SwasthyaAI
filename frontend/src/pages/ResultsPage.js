import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, ArrowLeft, Download, Share2, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

export default function ResultsPage() {
  const [result, setResult] = useState(null);
  const [lang, setLang] = useState('english');
  const [animated, setAnimated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('swasthya_result');
    const savedLang = localStorage.getItem('swasthya_lang');
    if (!data) { navigate('/assess'); return; }
    setResult(JSON.parse(data));
    setLang(savedLang || 'english');
    setTimeout(() => setAnimated(true), 100);
  }, [navigate]);

  if (!result) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00ff87', fontSize: 18 }}>
      Loading results...
    </div>
  );

  const diseases = [
    { key: 'diabetes_risk', name: 'Diabetes', icon: '🩸', desc: 'Blood Sugar Risk' },
    { key: 'hypertension_risk', name: 'Hypertension', icon: '💓', desc: 'Blood Pressure Risk' },
    { key: 'anemia_risk', name: 'Anemia', icon: '🔴', desc: 'Blood Hemoglobin Risk' },
    { key: 'thyroid_risk', name: 'Thyroid', icon: '🦋', desc: 'Thyroid Function Risk' },
  ];

  const getRiskColor = risk => {
    if (risk === 'High') return { bg: 'rgba(255,68,68,0.1)', border: 'rgba(255,68,68,0.3)', text: '#ff4444', badge: '#ff4444' };
    if (risk === 'Moderate') return { bg: 'rgba(255,215,0,0.1)', border: 'rgba(255,215,0,0.3)', text: '#ffd700', badge: '#ffd700' };
    return { bg: 'rgba(0,255,135,0.08)', border: 'rgba(0,255,135,0.2)', text: '#00ff87', badge: '#00ff87' };
  };

  const overallColor = result.risk_color === 'red' ? '#ff4444' : result.risk_color === 'yellow' ? '#ffd700' : '#00ff87';
  const OverallIcon = result.risk_color === 'red' ? AlertTriangle : result.risk_color === 'yellow' ? AlertCircle : CheckCircle;

  const score = result.overall_risk_score;

  return (
    <div style={{ minHeight: '100vh', paddingTop: 90, paddingBottom: 60, position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px' }}>

        {/* Back Button */}
        <button onClick={() => navigate('/assess')} style={{
          display: 'flex', alignItems: 'center', gap: 8, background: 'transparent',
          border: '1px solid #1e2d3d', color: '#8892a4', padding: '8px 18px',
          borderRadius: 8, cursor: 'pointer', fontSize: 14, marginBottom: 32,
          transition: 'all 0.2s', fontFamily: 'Sora, sans-serif'
        }}>
          <ArrowLeft size={16} /> New Assessment
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ color: '#8892a4', fontSize: 14, marginBottom: 8, letterSpacing: 1, fontWeight: 600 }}>SWASTHYAAI REPORT</p>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, marginBottom: 8 }}>
            Your Health Risk <span style={{ color: overallColor }}>Analysis</span>
          </h1>
          <p style={{ color: '#8892a4' }}>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Overall Score Card */}
        <div style={{
          background: `linear-gradient(135deg, rgba(${result.risk_color === 'red' ? '255,68,68' : result.risk_color === 'yellow' ? '255,215,0' : '0,255,135'},0.08), rgba(0,0,0,0))`,
          border: `2px solid ${overallColor}30`,
          borderRadius: 24, padding: '40px', marginBottom: 32, textAlign: 'center',
          position: 'relative', overflow: 'hidden',
          opacity: animated ? 1 : 0, transform: animated ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease'
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${overallColor}10, transparent 70%)` }} />
          
          <OverallIcon size={48} color={overallColor} style={{ marginBottom: 16 }} />
          
          <div style={{ fontSize: 'clamp(48px, 10vw, 80px)', fontWeight: 800, color: overallColor, fontFamily: 'Space Mono, monospace', lineHeight: 1 }}>
            {score}
          </div>
          <div style={{ fontSize: 14, color: '#8892a4', marginBottom: 4, fontFamily: 'Space Mono, monospace' }}>/ 100 RISK SCORE</div>
          
          <div style={{ display: 'inline-block', padding: '8px 24px', borderRadius: 100, background: `${overallColor}15`, border: `1px solid ${overallColor}40`, color: overallColor, fontWeight: 700, fontSize: 18, marginTop: 16 }}>
            {result.risk_color === 'red' ? '🔴 HIGH RISK' : result.risk_color === 'yellow' ? '🟡 MODERATE RISK' : '🟢 LOW RISK'}
          </div>
          
          <p style={{ marginTop: 20, color: '#c8d6e5', fontSize: 16, maxWidth: 400, margin: '20px auto 0' }}>
            {result.advice?.message}
          </p>
        </div>

        {/* Disease Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
          {diseases.map((d, i) => {
            const risk = result[d.key];
            const colors = getRiskColor(risk);
            return (
              <div key={d.key} style={{
                background: colors.bg, border: `1px solid ${colors.border}`,
                borderRadius: 16, padding: '20px 16px', textAlign: 'center',
                opacity: animated ? 1 : 0, transform: animated ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${i * 0.1 + 0.3}s`
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{d.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, color: '#f0f6ff' }}>{d.name}</div>
                <div style={{ fontSize: 11, color: '#8892a4', marginBottom: 10 }}>{d.desc}</div>
                <div style={{
                  display: 'inline-block', padding: '4px 14px', borderRadius: 100,
                  background: `${colors.badge}20`, color: colors.badge,
                  fontSize: 12, fontWeight: 800, border: `1px solid ${colors.badge}30`
                }}>
                  {risk?.toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Urgency Banner */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14, padding: '18px 22px', marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 16
        }}>
          <div style={{ fontSize: 28 }}>⏰</div>
          <div>
            <div style={{ fontWeight: 700, color: overallColor, marginBottom: 4 }}>{result.advice?.urgency}</div>
            <div style={{ fontSize: 14, color: '#8892a4' }}>{result.advice?.action}</div>
          </div>
        </div>

        {/* Disease-specific advice */}
        {result.advice?.disease_specific_advice?.length > 0 && (
          <div style={{ background: 'rgba(0,255,135,0.04)', border: '1px solid rgba(0,255,135,0.15)', borderRadius: 14, padding: '20px 22px', marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#00ff87', marginBottom: 12 }}>🔬 Specific Tests Recommended</h3>
            {result.advice.disease_specific_advice.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8, fontSize: 14, color: '#c8d6e5' }}>
                <span style={{ color: '#00ff87', marginTop: 2 }}>→</span> {a}
              </div>
            ))}
          </div>
        )}

        {/* PHC Card */}
        <div style={{
          background: '#0d1117', border: '1px solid #1e2d3d', borderRadius: 18, padding: '24px', marginBottom: 24,
          opacity: animated ? 1 : 0, transition: 'all 0.5s ease 0.8s'
        }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={18} color="#00ff87" /> Nearest Free Government Hospital
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Hospital Name', value: result.nearest_phc?.name },
              { label: 'Distance', value: result.nearest_phc?.distance },
              { label: 'Address', value: result.nearest_phc?.address },
              { label: 'Cost', value: result.nearest_phc?.cost },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: 11, color: '#4a5568', fontWeight: 600, marginBottom: 4, letterSpacing: 1 }}>{item.label.toUpperCase()}</div>
                <div style={{ fontSize: 14, color: '#c8d6e5', fontWeight: 500 }}>{item.value}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(0,255,135,0.06)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Phone size={16} color="#00ff87" />
            <span style={{ fontSize: 14, color: '#c8d6e5' }}>
              <strong style={{ color: '#00ff87' }}>{result.nearest_phc?.phone}</strong> — {result.advice?.helpline}
            </span>
          </div>
        </div>

        {/* Diet Plan */}
        <div style={{ background: '#0d1117', border: '1px solid #1e2d3d', borderRadius: 18, padding: '24px', marginBottom: 32 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            🥗 Personalized Diet & Lifestyle Plan
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {result.diet_plan?.map((tip, i) => (
              <div key={i} style={{
                padding: '14px 18px', background: 'rgba(255,255,255,0.03)',
                borderRadius: 12, fontSize: 14, color: '#c8d6e5', lineHeight: 1.6,
                borderLeft: '3px solid #00ff87',
                opacity: animated ? 1 : 0, transition: `all 0.4s ease ${i * 0.1 + 1}s`
              }}>
                {tip}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <button onClick={() => navigate('/assess')} style={{
            padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 700,
            background: 'linear-gradient(135deg, #00ff87, #00d4aa)', color: '#000',
            border: 'none', cursor: 'pointer', fontFamily: 'Sora, sans-serif'
          }}>
            🔄 Retake Assessment
          </button>
          <button onClick={() => window.print()} style={{
            padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 600,
            background: 'transparent', color: '#8892a4',
            border: '1px solid #1e2d3d', cursor: 'pointer', fontFamily: 'Sora, sans-serif',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }}>
            <Download size={16} /> Save Report
          </button>
        </div>

        {/* Disclaimer */}
        <p style={{ textAlign: 'center', fontSize: 12, color: '#4a5568', lineHeight: 1.6, padding: '0 20px' }}>
          ⚠️ <strong>Disclaimer:</strong> SwasthyaAI provides risk indications only and is NOT a medical diagnosis. Always consult a qualified doctor for proper diagnosis and treatment. Results are based on the information provided and AI prediction models.
        </p>
      </div>
    </div>
  );
}
