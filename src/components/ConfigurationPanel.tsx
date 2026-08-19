import React from 'react';
import { useConfigStore } from '../store/useConfigStore';
import { Play } from 'lucide-react';

interface Props {
  onRunAnalysis: () => void;
  isLoading: boolean;
}

export function ConfigurationPanel({ onRunAnalysis, isLoading }: Props) {
  const { 
    symbols, setSymbols, 
    startDate, setStartDate, 
    endDate, setEndDate, 
    riskFreeRate, setRiskFreeRate,
    selectedAnalysis, setSelectedAnalysis 
  } = useConfigStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRunAnalysis();
  };

  return (
    <div style={{ 
      padding: '2rem', 
      marginBottom: '2rem',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-light)',
      borderRadius: '16px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
    }}>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
        Analysis Configuration
      </h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'end' }}>
        
        {/* Analysis Type */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Analysis Strategy</label>
          <select 
            value={selectedAnalysis} 
            onChange={(e) => setSelectedAnalysis(e.target.value as any)}
            style={inputStyle}
          >
            <option style={optionStyle} value="4sigma">4-Sigma Threshold</option>
            <option style={optionStyle} value="std">Standard Deviation</option>
            <option style={optionStyle} value="sharpe">Sharpe Ratio</option>
            <option style={optionStyle} value="kelly">Kelly Formula (Single)</option>
            <option style={optionStyle} value="multi_kelly">Kelly Formula (Multi-Asset)</option>
            <option style={optionStyle} value="dd">Max Drawdown</option>
            <option style={optionStyle} value="mar">MAR Ratio</option>
            <option style={optionStyle} value="sortino">Sortino Ratio</option>
            <option style={optionStyle} value="cagr">CAGR</option>
            <option style={optionStyle} value="cumulative">Cumulative Return</option>
          </select>
        </div>

        {/* Symbols */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {selectedAnalysis === 'multi_kelly' ? 'Symbols (comma-separated)' : 'Symbol'}
          </label>
          <input 
            type="text"
            value={symbols} 
            onChange={(e) => setSymbols(e.target.value)}
            style={inputStyle}
            placeholder={selectedAnalysis === 'multi_kelly' ? "e.g. RELIANCE, TCS" : "e.g. RELIANCE"}
            required
          />
        </div>

        {/* Start Date */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Start Date</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        {/* End Date */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>End Date</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        {/* Risk Free Rate (Conditional) */}
        {(selectedAnalysis === 'sharpe' || selectedAnalysis === 'kelly' || selectedAnalysis === 'multi_kelly') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Risk Free Rate</label>
            <input 
              type="number" 
              step="0.01"
              value={riskFreeRate} 
              onChange={(e) => setRiskFreeRate(e.target.value)}
              style={inputStyle}
              placeholder="0.07"
            />
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.75rem 1.5rem',
              background: 'var(--accent-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              opacity: isLoading ? 0.7 : 1,
              transition: 'all 0.2s ease',
              height: '42px'
            }}
          >
            {isLoading ? 'Running...' : (
              <>
                <Play size={16} /> Run Analysis
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: '0.5rem 1rem',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid var(--border-light)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  outline: 'none',
  fontSize: '0.875rem',
  height: '42px',
};

const optionStyle = {
  background: 'var(--bg-secondary)',
  color: 'var(--text-primary)',
};
