import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Wifi, Globe, Shield, ChevronRight, Users, MapPin, Zap } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.animate-in');
    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        el.style.transition = 'all 0.6s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 150);
    });
  }, []);

  const diseases = [
    { icon: '🩸', name: 'Diabetes', color: '#ff6b6b' },
    { icon: '💓', name: 'Hypertension', color: '#ff8c00' },
    { icon: '🔴', name: 'Anemia', color: '#ff4757' },
    { icon: '🦋', name: 'Thyroid', color: '#a29bfe' },
  ];

  const features = [
    { icon: <Wifi size={24} />, title: 'Works Offline', desc: 'No internet needed. Perfect for rural areas with poor connectivity.', color: '#00ff87' },
    { icon: <Globe size={24} />, title: '3 Languages', desc: 'Telugu, Hindi, and English for maximum accessibility.', color: '#00d4aa' },
    { icon: <Zap size={24} />, title: 'Multi-Modal AI', desc: 'Combines symptoms + vitals + lifestyle for accurate predictions.', color: '#ffd700' },
    { icon: <MapPin size={24} />, title: 'Nearest PHC', desc: 'Instantly shows nearest Primary Health Center and cost.', color: '#ff6b6b' },
    { icon: <Shield size={24} />, title: '4 Diseases', desc: 'Detects Diabetes, Hypertension, Anemia & Thyroid risk together.', color: '#a29bfe' },
    { icon: <Users size={24} />, title: 'Free Forever', desc: 'Built for Bharat. 100% free for patients, NGOs & health workers.', color: '#fd79a8' },
  ];

  const stats = [
    { number: '80%', label: 'Cost Reduction vs Lab Tests' },
    { number: '77M+', label: 'Diabetics in India' },
    { number: '45%', label: 'Rural Population Undiagnosed' },
    { number: '4', label: 'Diseases Detected' },
  ];

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80, position: 'relative', zIndex: 1 }}>

      {/* Hero Section */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        
        {/* Badge */}
        <div className="animate-in" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.25)',
          borderRadius: 100, padding: '6px 18px', marginBottom: 32,
          fontSize: 12, fontWeight: 600, color: '#00ff87', letterSpacing: 1
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff87', display: 'inline-block' }}></span>
          HACKATHON 2024 · BUILT FOR RURAL BHARAT
        </div>

        {/* Main Heading */}
        <h1 className="animate-in" style={{
          fontSize: 'clamp(36px, 7vw, 72px)',
          fontWeight: 800, lineHeight: 1.1, marginBottom: 24,
          fontFamily: 'Sora, sans-serif'
        }}>
          Detect{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00ff87, #00d4aa)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>Silent Diseases</span>
          <br />Before It's Too Late
        </h1>

        <p className="animate-in" style={{
          fontSize: 18, color: '#8892a4', lineHeight: 1.7, marginBottom: 40, maxWidth: 620, margin: '0 auto 40px'
        }}>
          AI-powered offline health risk predictor for rural India. Detects Diabetes, Hypertension, Anemia & Thyroid — <strong style={{ color: '#f0f6ff' }}>in 2 minutes</strong>, for free, without a lab test.
        </p>

        {/* CTA Buttons */}
        <div className="animate-in" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 80 }}>
          <button onClick={() => navigate('/assess')} style={{
            padding: '16px 36px', borderRadius: 12, fontSize: 16, fontWeight: 700,
            background: 'linear-gradient(135deg, #00ff87, #00d4aa)',
            color: '#000', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: '0 8px 30px rgba(0,255,135,0.25)',
            transition: 'all 0.3s'
          }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Activity size={20} /> Check My Health Risk
          </button>
          <button onClick={() => navigate('/dashboard')} style={{
            padding: '16px 36px', borderRadius: 12, fontSize: 16, fontWeight: 600,
            background: 'transparent', color: '#00ff87',
            border: '1px solid rgba(0,255,135,0.4)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
            transition: 'all 0.3s'
          }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(0,255,135,0.08)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Village Dashboard <ChevronRight size={18} />
          </button>
        </div>

        {/* Disease Pills */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {diseases.map(d => (
            <div key={d.name} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '8px 18px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 100, fontSize: 14, fontWeight: 500
            }}>
              <span>{d.icon}</span> {d.name}
            </div>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{
        background: 'rgba(0,255,135,0.04)', borderTop: '1px solid rgba(0,255,135,0.1)',
        borderBottom: '1px solid rgba(0,255,135,0.1)', padding: '40px 24px'
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, textAlign: 'center' }}>
          {stats.map((s, i) => (
            <div key={i} className="animate-in">
              <div style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, fontFamily: 'Space Mono, monospace', color: '#00ff87' }}>{s.number}</div>
              <div style={{ fontSize: 13, color: '#8892a4', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 800, marginBottom: 16 }}>
            Why <span className="gradient-text">SwasthyaAI</span> is Different
          </h2>
          <p style={{ color: '#8892a4', fontSize: 16 }}>Designed specifically for Bharat — not just another health app</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {features.map((f, i) => (
            <div key={i} className="card animate-in" style={{
              display: 'flex', flexDirection: 'column', gap: 16,
              animationDelay: `${i * 100}ms`
            }}>
              <div style={{
                width: 50, height: 50, borderRadius: 12,
                background: `rgba(${f.color === '#00ff87' ? '0,255,135' : f.color === '#00d4aa' ? '0,212,170' : f.color === '#ffd700' ? '255,215,0' : f.color === '#ff6b6b' ? '255,107,107' : f.color === '#a29bfe' ? '162,155,254' : '253,121,168'},0.12)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: f.color
              }}>
                {f.icon}
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: '#8892a4', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '60px 24px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 800, marginBottom: 16 }}>
            How It Works
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { step: '01', title: 'Choose Your Language', desc: 'Telugu, Hindi, or English — you decide', icon: '🌐' },
            { step: '02', title: 'Answer 12 Simple Questions', desc: 'About lifestyle, symptoms, and daily habits', icon: '📋' },
            { step: '03', title: 'Enter Basic Vitals (Optional)', desc: 'BP and sugar if you know them — not mandatory', icon: '🩺' },
            { step: '04', title: 'Get Instant AI Risk Report', desc: 'Color-coded risk for 4 diseases with advice', icon: '🤖' },
            { step: '05', title: 'Find Nearest Free Hospital', desc: 'With directions and zero consultation cost info', icon: '📍' },
          ].map((step, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 24,
              padding: '20px 24px', borderRadius: 14,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              transition: 'all 0.3s'
            }}>
              <div style={{
                fontFamily: 'Space Mono, monospace', fontSize: 13, fontWeight: 700,
                color: '#00ff87', opacity: 0.6, minWidth: 30
              }}>{step.step}</div>
              <div style={{ fontSize: 28 }}>{step.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{step.title}</div>
                <div style={{ color: '#8892a4', fontSize: 14 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: '80px 24px', textAlign: 'center',
        background: 'linear-gradient(180deg, transparent, rgba(0,255,135,0.04))'
      }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 800, marginBottom: 16 }}>
          Check Your Risk. It's Free. It's Fast.
        </h2>
        <p style={{ color: '#8892a4', marginBottom: 40, fontSize: 16 }}>2 minutes. No lab. No cost. Just clarity.</p>
        <button onClick={() => navigate('/assess')} style={{
          padding: '18px 48px', borderRadius: 14, fontSize: 18, fontWeight: 700,
          background: 'linear-gradient(135deg, #00ff87, #00d4aa)',
          color: '#000', border: 'none', cursor: 'pointer',
          boxShadow: '0 12px 40px rgba(0,255,135,0.3)',
          transition: 'all 0.3s'
        }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Start Free Assessment →
        </button>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 24px', borderTop: '1px solid #1e2d3d', textAlign: 'center', color: '#4a5568', fontSize: 13 }}>
        <p>🇮🇳 Built for Rural India · SwasthyaAI v1.0 · 104 Helpline: Free Health Calls 24/7</p>
      </footer>
    </div>
  );
}
