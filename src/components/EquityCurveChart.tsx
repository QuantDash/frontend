import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import type { PeriodicReturnResponse } from '../types/api';

interface Props {
  data?: PeriodicReturnResponse;
  troughDate?: string;
}

export function EquityCurveChart({ data, troughDate }: Props) {
  if (!data || !data.prices || data.prices.length === 0) {
    return null;
  }

  const initialCapital = 10000;
  const startPrice = data.prices[0];

  const chartData = data.prices.map((price, index) => {
    // Calculate simulated portfolio value
    const portfolioValue = (price / startPrice) * initialCapital;
    // Use actual date if available from backend, otherwise fallback to index
    const dateStr = data.dates && data.dates[index] ? data.dates[index] : `Day ${index + 1}`;
    
    return {
      day: dateStr,
      equity: parseFloat(portfolioValue.toFixed(2)),
    };
  });

  // Re-format troughDate from "2023-05-15T00:00:00Z" to "2023-05-15" to match X-axis if needed
  const formattedTroughDate = troughDate ? troughDate.split('T')[0] : null;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
          Simulated Equity Curve ($10,000 Initial)
        </h3>
        <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Visualizing portfolio growth over the selected backtest period.
        </p>
      </div>

      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
            <defs>
              <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
            <XAxis 
              dataKey="day" 
              stroke="var(--text-secondary)" 
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis 
              stroke="var(--text-secondary)" 
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--accent-primary)', fontWeight: 600 }}
              formatter={(value: number) => formatter.format(value)}
              labelStyle={{ color: 'var(--text-secondary)' }}
            />
            {formattedTroughDate && (
              <ReferenceLine 
                x={formattedTroughDate} 
                stroke="var(--accent-danger)" 
                strokeDasharray="3 3" 
                label={{ position: 'insideTopLeft', value: 'Max Drawdown Hit', fill: 'var(--accent-danger)' }} 
              />
            )}
            <Area 
              type="monotone" 
              dataKey="equity" 
              stroke="var(--accent-primary)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorEquity)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
