import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ConfigurationPanel } from '../components/ConfigurationPanel';
import { ChartContainer } from '../components/ChartContainer';
import { EquityCurveChart } from '../components/EquityCurveChart';
import { MetricCard } from '../components/MetricCard';
import { useConfigStore } from '../store/useConfigStore';
import { api } from '../services/api';

export function Dashboard() {
  const { symbols, startDate, endDate, riskFreeRate, selectedAnalysis } = useConfigStore();
  
  const [submittedParams, setSubmittedParams] = useState<{
    symbols: string;
    start_date: string;
    end_date: string;
    risk_free_rate: string;
    analysis_type: string;
  } | null>(null);

  const { data: stdData, isLoading: isLoadingStd } = useQuery({
    queryKey: ['std', submittedParams],
    queryFn: () => api.getStandardDeviation(submittedParams!),
    enabled: !!submittedParams && submittedParams.analysis_type === 'std',
  });

  const { data: sigmaData, isLoading: isLoadingSigma } = useQuery({
    queryKey: ['4sigma', submittedParams],
    queryFn: () => api.getFourSigmaThreshold(submittedParams!),
    enabled: !!submittedParams && submittedParams.analysis_type === '4sigma',
  });

  const { data: sharpeData, isLoading: isLoadingSharpe } = useQuery({
    queryKey: ['sharpe', submittedParams],
    queryFn: () => api.getSharpeRatio(submittedParams!),
    enabled: !!submittedParams && submittedParams.analysis_type === 'sharpe',
  });

  const { data: kellyData, isLoading: isLoadingKelly } = useQuery({
    queryKey: ['kelly', submittedParams],
    queryFn: () => api.getSingleKelly(submittedParams!),
    enabled: !!submittedParams && submittedParams.analysis_type === 'kelly',
  });

  const { data: ddData, isLoading: isLoadingDd } = useQuery({
    queryKey: ['dd', submittedParams],
    queryFn: () => api.getDrawdown(submittedParams!),
    enabled: !!submittedParams && submittedParams.analysis_type === 'dd',
  });

  const { data: marData, isLoading: isLoadingMar } = useQuery({
    queryKey: ['mar', submittedParams],
    queryFn: () => api.getMarRatio(submittedParams!),
    enabled: !!submittedParams && submittedParams.analysis_type === 'mar',
  });

  const { data: sortinoData, isLoading: isLoadingSortino } = useQuery({
    queryKey: ['sortino', submittedParams],
    queryFn: () => api.getSortinoRatio(submittedParams!),
    enabled: !!submittedParams && submittedParams.analysis_type === 'sortino',
  });

  const { data: cagrData, isLoading: isLoadingCagr } = useQuery({
    queryKey: ['cagr', submittedParams],
    queryFn: () => api.getCagr(submittedParams!),
    enabled: !!submittedParams && submittedParams.analysis_type === 'cagr',
  });

  const { data: cumulativeData, isLoading: isLoadingCumulative } = useQuery({
    queryKey: ['cumulative', submittedParams],
    queryFn: () => api.getCumulativeReturn(submittedParams!),
    enabled: !!submittedParams && submittedParams.analysis_type === 'cumulative',
  });

  const { data: multiKellyData, isLoading: isLoadingMultiKelly } = useQuery({
    queryKey: ['multi_kelly', submittedParams],
    queryFn: () => {
      return api.getMultiKelly({
        ...submittedParams!
      });
    },
    enabled: !!submittedParams && submittedParams.analysis_type === 'multi_kelly',
  });

  const { data: periodicData, isLoading: isLoadingPeriodic } = useQuery({
    queryKey: ['periodic', submittedParams],
    queryFn: () => api.getPeriodicReturn(submittedParams!),
    enabled: !!submittedParams && submittedParams.analysis_type === 'dd', // Fetch this specifically to chart drawdown!
  });

  const isLoading = isLoadingStd || isLoadingSigma || isLoadingSharpe || isLoadingKelly || isLoadingDd || isLoadingMar || isLoadingSortino || isLoadingCagr || isLoadingCumulative || isLoadingMultiKelly || isLoadingPeriodic;

  const handleRunAnalysis = () => {
    setSubmittedParams({
      symbols: symbols,
      start_date: startDate,
      end_date: endDate,
      risk_free_rate: riskFreeRate,
      analysis_type: selectedAnalysis,
    });
  };

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h1 className="text-display" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Analysis Workspace</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Configure parameters and visualize quantitative metrics.</p>
        </div>
      </header>

      <ConfigurationPanel onRunAnalysis={handleRunAnalysis} isLoading={isLoading} />

      {/* Results Area */}
      {submittedParams?.analysis_type === '4sigma' && sigmaData && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <MetricCard title="4-Sigma Outliers" value={`${sigmaData["4_sigma_threshold_count"]} Events`} trend="High Volatility" positive={false} />
          <MetricCard title="Annualized Volatility" value={`${(sigmaData.standard_deviation.annualized_volatility * 100).toFixed(2)}%`} trend="Base" positive={true} />
          <MetricCard title="Mean Return" value={`${(sigmaData.standard_deviation.mean * 100).toFixed(4)}%`} trend="Daily" positive={sigmaData.standard_deviation.mean > 0} />
        </div>
      )}

      {submittedParams?.analysis_type === 'std' && stdData && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <MetricCard title="Standard Deviation" value={`${(stdData.std_deviation_value * 100).toFixed(2)}%`} trend="Daily" positive={true} />
          <MetricCard title="Annualized Volatility" value={`${(stdData.annualized_volatility * 100).toFixed(2)}%`} trend="Yearly" positive={true} />
          <MetricCard title="Trading Days" value={`${stdData.total_trading_days}`} trend="Analyzed" positive={true} />
        </div>
      )}

      {submittedParams?.analysis_type === 'sharpe' && sharpeData && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <MetricCard title="Sharpe Ratio" value={`${sharpeData.sharpe_ratio_value.toFixed(4)}`} trend="Risk-Adjusted Return" positive={sharpeData.sharpe_ratio_value > 1} />
        </div>
      )}

      {submittedParams?.analysis_type === 'kelly' && kellyData && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <MetricCard title="Kelly Percentage" value={`${(kellyData.kelly_percentage * 100).toFixed(2)}%`} trend="Full Kelly" positive={kellyData.kelly_percentage > 0} />
          <MetricCard title="Half-Kelly Percentage" value={`${(kellyData.half_kelly_percentage * 100).toFixed(2)}%`} trend="Conservative" positive={kellyData.half_kelly_percentage > 0} />
          <MetricCard title="Annualized Volatility" value={`${(kellyData.annualized_volatility * 100).toFixed(2)}%`} trend="Risk" positive={false} />
          <MetricCard title="Sharpe Ratio" value={`${kellyData.sharpe_ratio.toFixed(4)}`} trend="Performance" positive={kellyData.sharpe_ratio > 1} />
        </div>
      )}

      {submittedParams?.analysis_type === 'multi_kelly' && multiKellyData && (
        <div style={{ 
          padding: '2rem', 
          marginBottom: '1.5rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>Optimal Portfolio Allocation</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {Object.keys(multiKellyData.full_kelly).map(symbol => (
              <div key={symbol} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{symbol}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Full Kelly:</span>
                  <span style={{ fontWeight: 600, color: 'var(--accent-success)', fontSize: '1.125rem' }}>{(multiKellyData.full_kelly[symbol] * 100).toFixed(2)}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Half Kelly:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.125rem' }}>{(multiKellyData.half_kelly[symbol] * 100).toFixed(2)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {submittedParams?.analysis_type === 'dd' && ddData && (
        <>
          <EquityCurveChart data={periodicData} troughDate={ddData.trough_date} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <MetricCard title="Max Drawdown" value={`${(ddData.max_drawdown * 100).toFixed(2)}%`} trend="Risk" positive={ddData.max_drawdown > -0.2} />
            <MetricCard title="Duration" value={`${ddData.duration_days} Days`} trend="Recovery" positive={true} />
            {ddData.trough_date && (
               <MetricCard title="Trough Date" value={new Date(ddData.trough_date).toLocaleDateString()} trend="Bottom" positive={false} />
            )}
          </div>
        </>
      )}

      {submittedParams?.analysis_type === 'mar' && marData && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <MetricCard title="MAR Ratio" value={`${marData.cagr_to_drawdown_ratio_value.toFixed(4)}`} trend="Return / Risk" positive={marData.cagr_to_drawdown_ratio_value > 0.5} />
        </div>
      )}

      {submittedParams?.analysis_type === 'sortino' && sortinoData && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <MetricCard title="Sortino Ratio" value={`${sortinoData.sortino_ratio_value.toFixed(4)}`} trend="Downside Risk-Adjusted" positive={sortinoData.sortino_ratio_value > 1} />
        </div>
      )}

      {submittedParams?.analysis_type === 'cagr' && cagrData && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <MetricCard title="CAGR" value={`${(cagrData.cagr_value * 100).toFixed(2)}%`} trend="Annualized" positive={cagrData.cagr_value > 0} />
        </div>
      )}

      {submittedParams?.analysis_type === 'cumulative' && cumulativeData && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <MetricCard title="Cumulative Return" value={`${(cumulativeData.cumulative_return_value * 100).toFixed(2)}%`} trend="Total" positive={cumulativeData.cumulative_return_value > 0} />
        </div>
      )}

      {/* Chart Visualization */}
      {submittedParams?.analysis_type === '4sigma' && <ChartContainer sigmaData={sigmaData} />}
    </>
  );
}
