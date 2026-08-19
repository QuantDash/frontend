import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{ borderTop: '1px solid var(--border-light)', padding: '4rem 2rem 2rem', background: 'var(--bg-primary)', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>
            QuantDash
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
            An institutional-grade platform for backtesting and analyzing quantitative trading strategies.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>Navigation</h4>
            <span onClick={() => navigate('/')} style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer' }}>Home</span>
            <span onClick={() => navigate('/about')} style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer' }}>About</span>
            <span onClick={() => navigate('/docs')} style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer' }}>Docs</span>
            <span onClick={() => navigate('/app')} style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer' }}>Analyze Tool</span>
            <span onClick={() => navigate('/app/stocks')} style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer' }}>Stocks Explorer</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>Docs</h4>
            <span onClick={() => navigate('/docs')} style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer' }}>Max Drawdown</span>
            <span onClick={() => navigate('/docs')} style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer' }}>Sortino Ratio</span>
            <span onClick={() => navigate('/docs')} style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer' }}>MAR Ratio</span>
            <span onClick={() => navigate('/docs')} style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer' }}>Kelly Fraction</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600 }}>Socials</h4>
            <a href="https://www.linkedin.com/in/mannanali123/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>LinkedIn</a>
            <a href="https://github.com/Mannan-Ali" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>GitHub</a>
            <a href="https://x.com/mack_vm_" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>X</a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '4rem auto 0', display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem', borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }}>
        <span>© 2026 All rights reserved</span>
        <span>Made for quants globally</span>
        <span>Designed & built by Mannan Ali Shaikh</span>
      </div>
    </footer>
  );
}
