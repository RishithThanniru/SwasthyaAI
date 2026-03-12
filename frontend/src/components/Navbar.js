import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, Heart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', icon: <Heart size={16} /> },
    { to: '/assess', label: 'Check Risk', icon: <Activity size={16} /> },
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '16px 24px',
      background: scrolled ? 'rgba(6, 9, 18, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid #1e2d3d' : 'none',
      transition: 'all 0.3s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg, #00ff87, #00d4aa)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ fontSize: 18 }}>🏥</span>
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18, fontFamily: 'Sora, sans-serif', color: '#f0f6ff' }}>
            Swasthya<span style={{ color: '#00ff87' }}>AI</span>
          </div>
          <div style={{ fontSize: 10, color: '#8892a4', letterSpacing: 1 }}>SILENT DISEASE PREDICTOR</div>
        </div>
      </Link>

      {/* Desktop Nav */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="desktop-nav">
        {navLinks.map(link => (
          <Link key={link.to} to={link.to} style={{
            textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 8,
            fontSize: 14, fontWeight: 500,
            color: location.pathname === link.to ? '#00ff87' : '#8892a4',
            background: location.pathname === link.to ? 'rgba(0,255,135,0.1)' : 'transparent',
            border: location.pathname === link.to ? '1px solid rgba(0,255,135,0.2)' : '1px solid transparent',
            transition: 'all 0.2s'
          }}>
            {link.icon} {link.label}
          </Link>
        ))}
        <Link to="/assess" style={{
          textDecoration: 'none', padding: '8px 20px', borderRadius: 8,
          background: 'linear-gradient(135deg, #00ff87, #00d4aa)',
          color: '#000', fontWeight: 700, fontSize: 14
        }}>
          Start Free Check →
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{
        background: 'transparent', border: 'none', color: '#f0f6ff', cursor: 'pointer',
        display: 'none'
      }} className="mobile-menu-btn">
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
