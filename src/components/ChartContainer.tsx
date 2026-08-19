import React, { useState } from 'react';
import { 
  BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ReferenceLine, Legend 
} from 'recharts';
import type { FourSigmaThresholdResponse } from '../types/api';

interface Props {
  sigmaData?: FourSigmaThresholdResponse;
}

export function ChartContainer({ sigmaData }: Props) {
  const [chartType, setChartType] = useState<'scatter' | 'bar'>('scatter');

  if (!sigmaData || sigmaData.outliers.length === 0) {
    return (
      <div className="glass-panel" style={{ flex: 1, padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', marginTop: '1.5rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No outliers data available to chart.</p>
      </div>
    );
  }

  // Format data for Recharts
  const data = sigmaData.outliers.map(outlier => ({
    date: new Date(outlier.date).toLocaleDateString(),
    returnValue: parseFloat((outlier.return_value * 100).toFixed(2)), // Convert to percentage
  }));

  const upperBound = parseFloat((sigmaData.upper_bound * 100).toFixed(2));
  const lowerBound = parseFloat((sigmaData.lower_bound * 100).toFixed(2));

  return (
    <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', marginTop: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
          4-Sigma Outliers Visualization
        </h3>
        
        {/* Toggle Switch */}
        <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '0.25rem' }}>
          <button 
            onClick={() => setChartType('scatter')}
            style={toggleButtonStyle(chartType === 'scatter')}
          >
            Scatter
          </button>
          <button 
            onClick={() => setChartType('bar')}
            style={toggleButtonStyle(chartType === 'bar')}
          >
            Bar
          </button>
        </div>
      </div>

      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'scatter' ? (
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
              <XAxis dataKey="date" name="Date" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
              <YAxis dataKey="returnValue" name="Return %" unit="%" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Legend />
              <ReferenceLine y={upperBound} stroke="var(--accent-warning)" strokeDasharray="3 3" label={{ position: 'top', value: 'Upper 4-Sigma', fill: 'var(--accent-warning)' }} />
              <ReferenceLine y={lowerBound} stroke="var(--accent-warning)" strokeDasharray="3 3" label={{ position: 'bottom', value: 'Lower 4-Sigma', fill: 'var(--accent-warning)' }} />
              <Scatter name="Outlier Returns" data={data} fill="var(--accent-primary)" />
            </ScatterChart>
          ) : (
            <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
              <XAxis dataKey="date" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
              <YAxis unit="%" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--accent-primary)' }}
                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              />
              <Legend />
              <ReferenceLine y={upperBound} stroke="var(--accent-warning)" strokeDasharray="3 3" label={{ position: 'top', value: 'Upper 4-Sigma', fill: 'var(--accent-warning)' }} />
              <ReferenceLine y={lowerBound} stroke="var(--accent-warning)" strokeDasharray="3 3" label={{ position: 'bottom', value: 'Lower 4-Sigma', fill: 'var(--accent-warning)' }} />
              <Bar name="Outlier Returns" dataKey="returnValue" fill="var(--accent-secondary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const toggleButtonStyle = (isActive: boolean) => ({
  padding: '0.5rem 1rem',
  background: isActive ? 'var(--accent-primary)' : 'transparent',
  color: isActive ? 'white' : 'var(--text-secondary)',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
});
