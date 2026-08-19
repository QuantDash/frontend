import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart2, Shield, Lock, FileText, Settings, UploadCloud, Sun, Moon, Zap, Code } from 'lucide-react';
import { useConfigStore } from '../store/useConfigStore';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function Landing() {
  const navigate = useNavigate();
  const { theme, setTheme } = useConfigStore();
  const location = useLocation();

  // Force light theme on mount if they want the exact letters.app look, but we'll respect the toggle.
  // Actually, let's keep the toggle in the navbar!
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const isLight = theme === 'light';

  // The hero background is a soft blue gradient ONLY in light mode. 
  // In dark mode, we'll use a sleek dark gradient.
  const heroBackground = isLight
    ? 'linear-gradient(180deg, #87a8c7 0%, #9ab6ce 50%, #cae0f1 100%)'
    : 'linear-gradient(180deg, #0a0a0c 0%, #121216 50%, #1c1c1f 100%)';

  const heroTextColor = isLight ? '#ffffff' : '#ffffff';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)',
      overflowX: 'hidden'
    }}>

      {/* --- HERO SECTION --- */}
      <section style={{
        background: heroBackground,
        position: 'relative',
        paddingBottom: '24rem', /* Increased padding */
        borderRadius: '32px',
        margin: '1rem',
        overflow: 'hidden'
      }}>
        <Navbar transparent={true} />

        {/* Hero Content */}
        <div className="hero-padding-mobile" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '4rem 2rem 0',
          maxWidth: '800px',
          margin: '0 auto',
          color: heroTextColor
        }}>
          <h1 style={{
            fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            textShadow: isLight ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'
          }}>
            Strategies, not <br /> guesswork
          </h1>

          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.6,
            marginBottom: '2rem',
            opacity: 0.95,
            fontWeight: 400
          }}>
            Analyze portfolios instantly with metrics that <b>prove your edge</b>.<br />
            Enjoy <b>unlimited, gold-standard</b> backtesting.<br />
            <b>Save 5+ hours weekly</b> on spreadsheet math.
          </p>

          <button
            onClick={() => navigate('/app')}
            style={{
              background: heroTextColor,
              color: isLight ? '#8bc1e9' : '#0a0a0c',
              border: 'none',
              padding: '1rem 2.5rem',
              borderRadius: '35px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            }}
          >
            Launch App
          </button>

        </div>

        {/* Hero Graphic Placeholder (Scattered Cards Fan) */}
        <div className="hero-cards-container" style={{
          position: 'absolute',
          bottom: '-140px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          display: 'flex',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}>

          {/* Far Left Card (Before) */}
          <div style={{ position: 'absolute', bottom: '20px', left: '40px', width: '240px', height: '260px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderRadius: '16px', transform: 'rotate(-12deg)', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', zIndex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', background: 'var(--bg-primary)', padding: '0.25rem 0.75rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1rem', border: '1px solid var(--border-light)' }}>Before</div>
            <div style={{ height: '4px', background: 'var(--border-light)', width: '80%', marginBottom: '8px', borderRadius: '2px' }} />
            <div style={{ height: '4px', background: 'var(--border-light)', width: '60%', marginBottom: '8px', borderRadius: '2px' }} />
            <div style={{ height: '4px', background: 'var(--border-light)', width: '90%', marginBottom: '8px', borderRadius: '2px' }} />
          </div>

          {/* Center Left Card (After) */}
          <div style={{ position: 'absolute', bottom: '60px', left: '160px', width: '260px', height: '300px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderRadius: '16px', transform: 'rotate(-4deg)', padding: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.12)', zIndex: 2 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-primary)', padding: '0.25rem 0.75rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1rem', border: '1px solid var(--border-light)' }}>After</div>
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem', color: 'var(--text-primary)' }}>CAGR: +24.8%</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              The strategy delivered an exceptional compound annual growth rate. A ₹100,000 initial investment compounded into over ₹239,000 in just 4 years.
            </p>
          </div>

          {/* Center Right Card (After) */}
          <div style={{ position: 'absolute', bottom: '60px', right: '160px', width: '260px', height: '300px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderRadius: '16px', transform: 'rotate(4deg)', padding: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.12)', zIndex: 3 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-primary)', padding: '0.25rem 0.75rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1rem', border: '1px solid var(--border-light)' }}>After</div>
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem', color: 'var(--text-primary)' }}>Sharpe Ratio: 2.14</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Risk-adjusted returns are excellent. For every 1% of volatility endured, the strategy generated over 2% of excess return above the risk-free rate.
            </p>
          </div>

          {/* Far Right Card (Before) */}
          <div style={{ position: 'absolute', bottom: '20px', right: '40px', width: '240px', height: '260px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderRadius: '16px', transform: 'rotate(12deg)', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', zIndex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', background: 'var(--bg-primary)', padding: '0.25rem 0.75rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1rem', border: '1px solid var(--border-light)' }}>Before</div>
            <div style={{ height: '4px', background: 'var(--border-light)', width: '80%', marginBottom: '8px', borderRadius: '2px' }} />
            <div style={{ height: '4px', background: 'var(--border-light)', width: '60%', marginBottom: '8px', borderRadius: '2px' }} />
            <div style={{ height: '4px', background: 'var(--border-light)', width: '90%', marginBottom: '8px', borderRadius: '2px' }} />
          </div>

        </div>

        {/* Particles */}
        {isLight && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 2%)', backgroundSize: '100px 100px' }} />
        )}
      </section>

      {/* --- MAIN CONTENT --- */}
      <main className="padding-mobile" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem', width: '100%' }}>

        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Precision tools for<br />quantitative traders
          </h2>
        </div>

        {/* Features 2-Col */}
        <section className="grid-1-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>

          {/* Card 1 */}
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '32px', padding: '3rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', border: '1px solid var(--border-light)', alignSelf: 'flex-start' }}>
              <FileText size={16} color="#8bc1e9" /> Backtests
            </div>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 700, margin: '0 0 3rem', lineHeight: 1.2 }}>
              Instantly backtest <br />and evaluate strategies
            </h2>

            {/* Inner Mockup */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-light)', fontSize: '0.75rem', fontWeight: 600 }}>Analyze stocks<br /><span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>Historical data</span></div>
                <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-light)', fontSize: '0.75rem', fontWeight: 600 }}>Backtest algorithms<br /><span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>Test strategies</span></div>
              </div>
              <div style={{ width: '90%', background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>Performance Summary</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-success)', fontWeight: 700, background: 'rgba(16, 185, 129, 0.1)', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>Win Rate: 68%</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div style={{ height: '36px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', padding: '0 0.5rem' }}>
                    <div style={{ height: '4px', width: '40%', background: 'var(--text-muted)', borderRadius: '2px' }} />
                  </div>
                  <div style={{ height: '36px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', padding: '0 0.5rem' }}>
                    <div style={{ height: '4px', width: '60%', background: 'var(--text-muted)', borderRadius: '2px' }} />
                  </div>
                </div>
              </div>
            </div>

            <div onClick={() => navigate('/about')} style={{ marginTop: '3rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              About QuantDash <span style={{ fontSize: '1.25rem' }}>›</span>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '32px', padding: '3rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', border: '1px solid var(--border-light)', alignSelf: 'flex-start' }}>
              <BarChart2 size={16} color="#8bc1e9" /> Analytics
            </div>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 700, margin: '0 0 3rem', lineHeight: 1.2 }}>
              Analyze drawdowns, <br />volatility & kelly sizing
            </h2>

            {/* Inner Mockup */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '80%', background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  Optimal Kelly fraction suggests a 15% portfolio allocation to maximize compound growth while keeping drawdown risk within strict limits.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: isLight ? '#f0f9ff' : 'var(--bg-secondary)', padding: '0.5rem 1rem', borderRadius: '12px', color: '#87a8c7' }}>
                  <Zap size={16} /> 
                  <div style={{ height: '4px', flex: 1, background: isLight ? '#e0edf6' : '#2a2a35', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '15%', background: '#87a8c7', borderRadius: '2px' }} />
                  </div>
                </div>
              </div>
            </div>

            <div onClick={() => navigate('/app')} style={{ marginTop: '3rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Analyze tool <span style={{ fontSize: '1.25rem' }}>›</span>
            </div>
          </div>
        </section>

        {/* Core Capabilities 3-Col */}
        <section className="grid-1-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '6rem' }}>
          {[
            { icon: <BarChart2 size={20} color="#8bc1e9" />, title: 'Analyze Stocks', desc: 'Evaluate historical market data across multiple asset classes to uncover hidden patterns and identify profitable opportunities.' },
            { icon: <Code size={20} color="#8bc1e9" />, title: 'Analyze Algorithms', desc: 'Run comprehensive backtests on your quantitative models. Fine-tune your parameters to maximize returns and minimize risks.' },
            { icon: <Shield size={20} color="#8bc1e9" />, title: 'Safeguard Metrics', desc: 'Protect your portfolio with advanced risk management. Monitor Max Drawdown, Kelly fractions, and Sharpe ratios instantly.' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </section>

      </main>

      <Footer />

    </div>
  );
}
