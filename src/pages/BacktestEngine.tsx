import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { MetricCard } from '../components/MetricCard';
import { EquityCurveChart } from '../components/EquityCurveChart';
import { useConfigStore } from '../store/useConfigStore';

export function BacktestEngine() {
  const { symbols, setSymbols, startDate, setStartDate, endDate, setEndDate, riskFreeRate, setRiskFreeRate } = useConfigStore();

  const [submittedParams, setSubmittedParams] = useState<{
    symbols: string;
    start_date: string;
    end_date: string;
    risk_free_rate: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedParams({
      symbols: symbols,
      start_date: startDate,
      end_date: endDate,
      risk_free_rate: riskFreeRate,
    });
  };

  // Queries
  const { data: stdData, isLoading: loadStd } = useQuery({ queryKey: ['std', submittedParams], queryFn: () => api.getStandardDeviation(submittedParams!), enabled: !!submittedParams });
  const { data: sharpeData, isLoading: loadSharpe } = useQuery({ queryKey: ['sharpe', submittedParams], queryFn: () => api.getSharpeRatio(submittedParams!), enabled: !!submittedParams });
  const { data: ddData, isLoading: loadDd } = useQuery({ queryKey: ['dd', submittedParams], queryFn: () => api.getDrawdown(submittedParams!), enabled: !!submittedParams });
  const { data: marData, isLoading: loadMar } = useQuery({ queryKey: ['mar', submittedParams], queryFn: () => api.getMarRatio(submittedParams!), enabled: !!submittedParams });
  const { data: sortinoData, isLoading: loadSortino } = useQuery({ queryKey: ['sortino', submittedParams], queryFn: () => api.getSortinoRatio(submittedParams!), enabled: !!submittedParams });
  const { data: cagrData, isLoading: loadCagr } = useQuery({ queryKey: ['cagr', submittedParams], queryFn: () => api.getCagr(submittedParams!), enabled: !!submittedParams });
  const { data: cumData, isLoading: loadCum } = useQuery({ queryKey: ['cumulative', submittedParams], queryFn: () => api.getCumulativeReturn(submittedParams!), enabled: !!submittedParams });
  const { data: periodicData, isLoading: loadPeriodic } = useQuery({ queryKey: ['periodic', submittedParams], queryFn: () => api.getPeriodicReturn(submittedParams!), enabled: !!submittedParams });

  const isLoading = loadStd || loadSharpe || loadDd || loadMar || loadSortino || loadCagr || loadCum || loadPeriodic;

  const inputStyle = { padding: '0.5rem 1rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none', fontSize: '0.875rem', height: '42px' };

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h1 className="text-display" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Backtest Engine</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Generate a comprehensive Tear Sheet for a selected asset.</p>
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
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'end' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Symbol</label>
            <input type="text" value={symbols} onChange={(e) => setSymbols(e.target.value)} style={inputStyle} placeholder="e.g. RELIANCE" required />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inputStyle} required />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={inputStyle} required />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Risk Free Rate</label>
            <input type="number" step="0.01" value={riskFreeRate} onChange={(e) => setRiskFreeRate(e.target.value)} style={inputStyle} placeholder="0.07" />
          </div>

          <div>
            <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '0.75rem 1.5rem', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: isLoading ? 0.7 : 1, transition: 'all 0.2s ease', height: '42px' }}>
              {isLoading ? 'Generating Tear Sheet...' : <><Play size={16} /> Run Full Backtest</>}
            </button>
          </div>
        </form>
      </div>

      {submittedParams && (
        <>
          <EquityCurveChart data={periodicData} troughDate={ddData?.trough_date} />

          <h2 className="text-display" style={{ marginBottom: '1.5rem', fontSize: '1.75rem' }}>Performance Tear Sheet</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            
            {cumData && <MetricCard title="Cumulative Return" value={`${(cumData.cumulative_return_value * 100).toFixed(2)}%`} trend="Total" positive={cumData.cumulative_return_value > 0} />}
            {cagrData && <MetricCard title="CAGR" value={`${(cagrData.cagr_value * 100).toFixed(2)}%`} trend="Annualized" positive={cagrData.cagr_value > 0} />}
            {sharpeData && <MetricCard title="Sharpe Ratio" value={`${sharpeData.sharpe_ratio_value.toFixed(4)}`} trend="Risk-Adjusted Return" positive={sharpeData.sharpe_ratio_value > 1} />}
            {sortinoData && <MetricCard title="Sortino Ratio" value={`${sortinoData.sortino_ratio_value.toFixed(4)}`} trend="Downside Risk-Adjusted" positive={sortinoData.sortino_ratio_value > 1} />}
            {marData && <MetricCard title="MAR Ratio" value={`${marData.cagr_to_drawdown_ratio_value.toFixed(4)}`} trend="Return / Risk" positive={marData.cagr_to_drawdown_ratio_value > 0.5} />}
            {ddData && <MetricCard title="Max Drawdown" value={`${(ddData.max_drawdown * 100).toFixed(2)}%`} trend="Risk" positive={ddData.max_drawdown > -0.2} />}
            {stdData && <MetricCard title="Annualized Volatility" value={`${(stdData.annualized_volatility * 100).toFixed(2)}%`} trend="Risk" positive={true} />}

          </div>
        </>
      )}
    </>
  );
}
