import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useConfigStore } from '../store/useConfigStore';
import growthIcon from '../assets/growth.png';

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useConfigStore();
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const toggleMobileNav = () => setIsMobileNavOpen(!isMobileNavOpen);
  const isLight = theme === 'light';

  // In transparent mode (e.g. Hero), the text color should match the hero text.
  const textColor = transparent ? '#ffffff' : 'var(--text-primary)';
  const bgColor = transparent ? 'transparent' : 'var(--bg-primary)';
  const buttonBg = transparent ? textColor : 'var(--text-primary)';
  const buttonText = transparent ? (isLight ? '#8bc1e9' : '#0a0a0c') : 'var(--bg-primary)';
  const logoFilter = transparent ? 'brightness(0) invert(1)' : (isLight ? 'none' : 'brightness(0) invert(1)');

  return (
    <nav style={{
      background: bgColor,
      borderBottom: transparent ? 'none' : '1px solid var(--border-light)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      zIndex: 1000,
      position: transparent ? 'relative' : 'sticky',
      top: 0,
      color: textColor,
      transition: 'all 0.2s ease-in-out'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div 
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '1.2rem', fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em', cursor: 'pointer' }} 
        >
          <img src={growthIcon} alt="QuantDash Logo" style={{ width: '28px', height: '28px', filter: logoFilter }} />
          QuantDash
        </div>

        <div className="desktop-nav-links">
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/about')}>About</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/docs')}>Docs</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/pipeline')}>How It Works</span>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'transparent', border: 'none', color: textColor, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            title="Toggle Theme"
          >
            {isLight ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          {!location.pathname.startsWith('/app') && (
            <button
              onClick={() => navigate('/app')}
              style={{
                background: buttonBg,
                color: buttonText,
                border: 'none',
                padding: '0.6rem 1.5rem',
                borderRadius: '24px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              Launch App
            </button>
          )}
          <button className="mobile-menu-btn" onClick={toggleMobileNav}>
            {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileNavOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '1rem',
          right: '1rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: '16px',
          marginTop: '0.5rem',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          zIndex: 999,
          color: 'var(--text-primary)'
        }}>
          <span style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontWeight: 600, borderRadius: '8px' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-primary)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'} onClick={() => { navigate('/'); setIsMobileNavOpen(false); }}>Home</span>
          <span style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontWeight: 600, borderRadius: '8px' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-primary)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'} onClick={() => { navigate('/about'); setIsMobileNavOpen(false); }}>About</span>
          <span style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontWeight: 600, borderRadius: '8px' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-primary)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'} onClick={() => { navigate('/docs'); setIsMobileNavOpen(false); }}>Docs</span>
          <span style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontWeight: 600, borderRadius: '8px' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-primary)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'} onClick={() => { navigate('/pipeline'); setIsMobileNavOpen(false); }}>How It Works</span>
        </div>
      )}
    </nav>
  );
}
