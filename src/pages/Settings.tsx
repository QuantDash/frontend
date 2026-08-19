import React from 'react';

export function Settings() {
  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="text-display" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Settings</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Configure global dashboard parameters and API settings.</p>
        </div>
      </header>

      <div style={{ 
        padding: '2rem', 
        marginBottom: '2rem',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-light)',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>General Configuration</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Settings features are under construction.</p>
      </div>
    </>
  );
}
