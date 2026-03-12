import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { LayoutDashboard, Users, TrendingUp, MapPin, Activity } from 'lucide-react';

// Mock data for the government/NGO dashboard
const DISEASE_DATA = [
  { disease: 'Diabetes', high: 34, moderate: 28, low: 38 },
  { disease: 'Hypertension', high: 41, moderate: 31, low: 28 },
  { disease: 'Anemia', high: 29, moderate: 35, low: 36 },
  { disease: 'Thyroid', high: 18, moderate: 22, low: 60 },
];

const AREA_DATA = [
  { area: 'Medak', risk: 72, population: 1200 },
  { area: 'Nizamabad', risk: 58, population: 980 },
  { area: 'Warangal', risk: 65, population: 1450 },
  { area: 'Karimnagar', risk: 48, population: 1100 },
  { area: 'Adilabad', risk: 81, population: 870 },
  { area: 'Khammam', risk: 55, population: 1320 },
];

const TREND_DATA = [
  { month: 'Jan', screenings: 120, high_risk: 34 },
  { month: 'Feb', screenings: 145, high_risk: 38 },
  { month: 'Mar', screenings: 178, high_risk: 41 },
  { month: 'Apr', screenings: 203, high_risk: 39 },
  { month: 'May', screenings: 256, high_risk: 47 },
  { month: 'Jun', screenings: 312, high_risk: 52 },
];

const PIE_DATA = [
  { name: 'High Risk', value: 31, color: '#ff4444' },
  { name: 'Moderate Risk', value: 29, color: '#ffd700' },
  { name: 'Low Risk', value: 40, color: '#00ff87' },
];

const STATS = [
  { icon: <Users size={22} />, label: 'Total Screened', value: '1,214', change: '+18% this month', color: '#00ff87' },
  { icon: <Activity size={22} />, label: 'High Risk Cases', value: '376', change: '+7 this week', color: '#ff4444' },
  { icon: <TrendingUp size={22} />, label: 'Early Detections', value: '89', change: 'Saved ₹4.2L in costs', color: '#ffd700' },
  { icon: <MapPin size={22} />, label: 'Villages Covered', value: '47', change: '6 Districts', color: '#a29bfe' },
];

export default function DashboardPage() {
  const [selectedArea, setSelectedArea] = useState(null);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: '#0d1117', border: '1px solid #1e2d3d', borderRadius: 10, padding: '12px 16px' }}>
          <p style={{ color: '#f0f6ff', fontWeight: 700, marginBottom: 6 }}>{label}</p>
          {payload.map((p, i) => (
            <p key={i} style={{ color: p.color, fontSize: 13 }}>{p.name}: {p.value}%</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: 90, paddingBottom: 60, position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <LayoutDashboard size={24} color="#00ff87" />
            <h1 style={{ fontSize: 32, fontWeight: 800 }}>Village Health Dashboard</h1>
          </div>
          <p style={{ color: '#8892a4' }}>Telangana Rural Health Monitoring — For Government & NGO Use</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 12, padding: '4px 14px', borderRadius: 100, background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.2)', fontSize: 12, color: '#00ff87', fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff87', display: 'inline-block' }}></span>
            LIVE DATA · Last updated: {new Date().toLocaleTimeString('en-IN')}
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 32 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              background: '#0d1117', border: '1px solid #1e2d3d', borderRadius: 16, padding: '22px',
              display: 'flex', alignItems: 'flex-start', gap: 16
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#4a5568', fontWeight: 600, letterSpacing: 1, marginBottom: 4 }}>{s.label.toUpperCase()}</div>
                <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Space Mono, monospace', color: '#f0f6ff', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: s.color, marginTop: 4 }}>{s.change}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          
          {/* Disease Risk Chart */}
          <div style={{ background: '#0d1117', border: '1px solid #1e2d3d', borderRadius: 18, padding: '24px' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Disease Risk Distribution (%)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={DISEASE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d3d" />
                <XAxis dataKey="disease" tick={{ fill: '#8892a4', fontSize: 12 }} />
                <YAxis tick={{ fill: '#8892a4', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="high" name="High" fill="#ff4444" radius={[4,4,0,0]} />
                <Bar dataKey="moderate" name="Moderate" fill="#ffd700" radius={[4,4,0,0]} />
                <Bar dataKey="low" name="Low" fill="#00ff87" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Overall Risk Pie */}
          <div style={{ background: '#0d1117', border: '1px solid #1e2d3d', borderRadius: 18, padding: '24px' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Overall Population Risk</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                    {PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1 }}>
                {PIE_DATA.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: p.color, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f6ff' }}>{p.name}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: p.color, fontFamily: 'Space Mono, monospace' }}>{p.value}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trend Line Chart */}
        <div style={{ background: '#0d1117', border: '1px solid #1e2d3d', borderRadius: 18, padding: '24px', marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Monthly Screening Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d3d" />
              <XAxis dataKey="month" tick={{ fill: '#8892a4', fontSize: 12 }} />
              <YAxis tick={{ fill: '#8892a4', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="screenings" name="Total Screenings" stroke="#00ff87" strokeWidth={2.5} dot={{ fill: '#00ff87', r: 4 }} />
              <Line type="monotone" dataKey="high_risk" name="High Risk Detected" stroke="#ff4444" strokeWidth={2.5} dot={{ fill: '#ff4444', r: 4 }} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Area Risk Map Table */}
        <div style={{ background: '#0d1117', border: '1px solid #1e2d3d', borderRadius: 18, padding: '24px', marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>📍 Area-wise Risk Map</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {AREA_DATA.map((area, i) => {
              const color = area.risk >= 70 ? '#ff4444' : area.risk >= 55 ? '#ffd700' : '#00ff87';
              const label = area.risk >= 70 ? 'HIGH' : area.risk >= 55 ? 'MODERATE' : 'LOW';
              return (
                <div key={i} onClick={() => setSelectedArea(area)}
                  style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px', background: selectedArea?.area === area.area ? 'rgba(0,255,135,0.05)' : 'rgba(255,255,255,0.02)', borderRadius: 12, cursor: 'pointer', border: `1px solid ${selectedArea?.area === area.area ? 'rgba(0,255,135,0.2)' : 'rgba(255,255,255,0.05)'}`, transition: 'all 0.2s' }}>
                  <div style={{ minWidth: 120, fontWeight: 600, fontSize: 15 }}>{area.area}</div>
                  <div style={{ flex: 1, height: 8, background: '#1e2d3d', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${area.risk}%`, background: `linear-gradient(90deg, ${color}, ${color}88)`, borderRadius: 4, transition: 'width 1s ease' }} />
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'Space Mono, monospace', color, minWidth: 40, textAlign: 'right' }}>{area.risk}%</div>
                  <div style={{ padding: '3px 12px', borderRadius: 100, background: `${color}15`, color, fontSize: 11, fontWeight: 700, border: `1px solid ${color}30`, minWidth: 80, textAlign: 'center' }}>{label}</div>
                  <div style={{ fontSize: 12, color: '#4a5568', minWidth: 80, textAlign: 'right' }}>{area.population.toLocaleString()} screened</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(0,255,135,0.04)', borderRadius: 14, border: '1px solid rgba(0,255,135,0.1)' }}>
          <p style={{ color: '#00ff87', fontWeight: 700, marginBottom: 8 }}>🏛️ For Government & NGO Health Workers</p>
          <p style={{ fontSize: 13, color: '#8892a4', lineHeight: 1.7 }}>
            This dashboard helps identify high-risk zones for targeted health camps, resource allocation, and preventive care programs. Data is anonymized and privacy-compliant.
          </p>
        </div>
      </div>
    </div>
  );
}
