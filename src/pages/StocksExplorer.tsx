import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { api } from '../services/api';
import { useConfigStore } from '../store/useConfigStore';

export function StocksExplorer() {
  const navigate = useNavigate();
  const { setSymbols } = useConfigStore();
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const { data: stocks, isLoading, isError } = useQuery({
    queryKey: ['stocks', page, limit],
    queryFn: () => api.getStocks(page, limit),
    staleTime: 60000,
  });

  const handleAnalyze = (symbol: string) => {
    setSymbols(symbol);
    navigate('/app/engine');
  };

  const hasNextPage = stocks && stocks.length === limit;
  const hasPrevPage = page > 1;

  return (
    <div className="padding-mobile" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header and Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 700, margin: '0 0 0.5rem', color: 'var(--text-primary)' }}>Stocks Explorer</h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Browse available stocks and their latest market data.</p>
        </div>

        {/* Pagination Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-secondary)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Show:</span>
            <select 
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1); // Reset to page 1 on limit change
              }}
              style={{
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                padding: '0.25rem 0.5rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div style={{ width: '1px', height: '24px', background: 'var(--border-light)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={!hasPrevPage}
              style={{
                background: hasPrevPage ? 'var(--bg-primary)' : 'transparent',
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                padding: '0.25rem',
                cursor: hasPrevPage ? 'pointer' : 'not-allowed',
                color: hasPrevPage ? 'var(--text-primary)' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, minWidth: '40px', textAlign: 'center' }}>
              Page {page}
            </span>
            <button 
              onClick={() => setPage(p => p + 1)}
              disabled={!hasNextPage}
              style={{
                background: hasNextPage ? 'var(--bg-primary)' : 'transparent',
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                padding: '0.25rem',
                cursor: hasNextPage ? 'pointer' : 'not-allowed',
                color: hasNextPage ? 'var(--text-primary)' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div style={{ 
        background: 'var(--bg-secondary)', 
        borderRadius: '16px', 
        border: '1px solid var(--border-light)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
                <th style={thStyle}>Symbol</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Trade Date</th>
                <th style={thStyle}>Close Price</th>
                <th style={thStyle}>Volume</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Loading stocks data...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#ef4444' }}>
                    Failed to load stocks. Ensure the backend is running.
                  </td>
                </tr>
              ) : !stocks || stocks.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No stocks found.
                  </td>
                </tr>
              ) : (
                stocks.map((stock, idx) => (
                  <tr key={idx} style={{ 
                    borderTop: '1px solid var(--border-light)',
                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'}
                  >
                    <td style={tdStyle}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{stock.symbol}</span>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        padding: '0.15rem 0.5rem', 
                        borderRadius: '12px',
                        background: stock.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: stock.status === 'Active' ? 'var(--accent-success)' : '#ef4444',
                        fontWeight: 600
                      }}>
                        {stock.status || 'N/A'}
                      </span>
                    </td>
                    <td style={tdStyle}>{stock.trade_date ? new Date(stock.trade_date).toLocaleDateString() : 'N/A'}</td>
                    <td style={tdStyle}>
                      <span style={{ fontWeight: 600 }}>
                        {stock.close_price !== null ? `₹${stock.close_price.toFixed(2)}` : 'N/A'}
                      </span>
                    </td>
                    <td style={tdStyle}>{stock.volume !== null ? stock.volume.toLocaleString() : 'N/A'}</td>
                    <td style={tdStyle}>
                      <button 
                        onClick={() => handleAnalyze(stock.symbol)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.4rem 0.75rem',
                          background: 'var(--accent-primary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        <Activity size={14} /> Analyze
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  padding: '1rem',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: 'var(--text-secondary)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em'
};

const tdStyle = {
  padding: '1rem',
  fontSize: '0.875rem',
  color: 'var(--text-secondary)',
};
