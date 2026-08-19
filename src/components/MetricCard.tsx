import React from 'react';

export function MetricCard({ title, value, trend, positive }: { title: string, value: string, trend: string, positive: boolean }) {
  return (
    <div style={{ 
      padding: '1.5rem', 
      background: 'var(--bg-secondary)', 
      border: '1px solid var(--border-light)', 
      borderRadius: '16px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: 600, letterSpacing: '0.025em', textTransform: 'uppercase' }}>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{value}</span>
        <span style={{ 
          fontSize: '0.875rem', 
          fontWeight: 600, 
          color: positive ? 'var(--accent-success)' : 'var(--accent-danger)',
          background: positive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          padding: '0.25rem 0.6rem',
          borderRadius: '6px',
          marginBottom: '0.25rem'
        }}>
          {trend}
        </span>
      </div>
    </div>
  );
}
