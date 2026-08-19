import { Database, TrendingUp, Settings, FileWarning } from 'lucide-react';
import { useConfigStore } from '../store/useConfigStore';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function Pipeline() {
  const isLight = useConfigStore(state => state.theme === 'light');

  const heroBackground = isLight 
    ? 'linear-gradient(180deg, #9bbad4 0%, #b8d4e9 50%, #e0edf6 100%)' 
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
        paddingBottom: '8rem',
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
        overflow: 'hidden'
      }}>
        <Navbar transparent={true} />

        <div style={{
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
            fontSize: 'clamp(3.5rem, 6vw, 4.5rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            textShadow: isLight ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'
          }}>
            How It Works
          </h1>
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.6,
            opacity: 0.95,
            fontWeight: 400,
            maxWidth: '600px'
          }}>
            A look under the hood at the automated data ingestion and processing pipeline that powers QuantDash.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main style={{ maxWidth: '1000px', margin: '-4rem auto 0', padding: '0 2rem 6rem', width: '100%', position: 'relative', zIndex: 5 }}>
        
        {/* Step 1 */}
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '32px', padding: '4rem', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', border: '1px solid var(--border-light)', alignSelf: 'flex-start' }}>
            <Database size={16} color="#8bc1e9" /> Step 1: Daily Data Ingestion
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.125rem', marginBottom: '1.5rem' }}>
            Every single trading day at <strong>6:00 PM</strong>, our automated python scripts wake up and fetch the latest end-of-day market data. We pull two highly critical pieces of information: the raw daily stock prices and all the corporate actions (like dividends, stock splits, and bonus issues) that were announced.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.125rem' }}>
            Without accurately tracking corporate actions, backtesting is fundamentally broken. If a stock splits 2-for-1, its price gets cut in half. Without adjusting for the split, the mathematics engine will incorrectly assume the stock crashed 50%, completely ruining the risk models.
          </p>
        </div>

        {/* Step 2 */}
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '32px', padding: '4rem', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', border: '1px solid var(--border-light)', alignSelf: 'flex-start' }}>
            <Settings size={16} color="#8bc1e9" /> Step 2: Processing Corporate Actions
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.125rem', marginBottom: '1.5rem' }}>
            Once the corporate action data is fetched, it runs through our rigorous parsing engine. We look for specific trigger words like <em>DIVIDEND</em>, <em>SPLIT</em>, or <em>BONUS</em> in the raw text announcements. 
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.125rem', marginBottom: '1.5rem' }}>
            The engine then extracts the exact mathematical ratios and cash amounts using advanced pattern recognition (Regex). For example, if it detects a 1:1 Bonus issue, it mathematically translates that into a 2.0 split ratio. All of this normalized data is then seamlessly inserted directly into our main SQL database.
          </p>
          <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <FileWarning size={24} color="var(--accent-danger)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '1rem' }}>The Failsafe Mechanism</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                Financial data can be incredibly messy. If the parsing engine encounters a bizarrely formatted corporate action that it cannot confidently extract the math for, it immediately stops guessing. Instead, it flags the action, logs a warning, and saves it into a <code>txt</code> file. Our team then manually reviews this file and inputs the action to ensure 100% data integrity.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Manual Review Examples */}
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '32px', padding: '4rem', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', border: '1px solid var(--border-light)', alignSelf: 'flex-start' }}>
            <FileWarning size={16} color="#8bc1e9" /> Step 3: The Reality of Financial Data
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.125rem', marginBottom: '2rem' }}>
            To understand why the failsafe is necessary, here are some real-world examples of corporate actions from our logs since 2022 that were impossible for an algorithm to safely parse. These were flagged and manually verified by our team:
          </p>
          
          <div style={{ overflowX: 'auto', background: 'var(--bg-primary)', borderRadius: '12px', padding: '1rem', border: '1px solid var(--border-light)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-primary)' }}>
                  <th style={{ padding: '1rem', fontWeight: 600 }}>Symbol</th>
                  <th style={{ padding: '1rem', fontWeight: 600 }}>Ex-Date</th>
                  <th style={{ padding: '1rem', fontWeight: 600 }}>Raw Purpose Text</th>
                  <th style={{ padding: '1rem', fontWeight: 600 }}>Failure Reason</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-secondary)' }}>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>VIPIND</td>
                  <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>2022-03-08</td>
                  <td style={{ padding: '1rem', fontStyle: 'italic' }}>INTERIM DIVIDEND</td>
                  <td style={{ padding: '1rem', color: 'var(--accent-danger)' }}>Missing cash amount</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>MSUMI</td>
                  <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>2022-08-12</td>
                  <td style={{ padding: '1rem', fontStyle: 'italic' }}>ANNUAL GENERAL MEETING/DIVIDEND - RS PER SHARE</td>
                  <td style={{ padding: '1rem', color: 'var(--accent-danger)' }}>Missing cash amount</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>TRIVENI</td>
                  <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>2023-09-01</td>
                  <td style={{ padding: '1rem', fontStyle: 'italic' }}>ANNUAL GENERAL MEETING/DIVIDEND - RS PER SHARE</td>
                  <td style={{ padding: '1rem', color: 'var(--accent-danger)' }}>Missing cash amount</td>
                </tr>
                <tr style={{ borderBottom: 'none' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>PRIMESECU</td>
                  <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>2024-06-20</td>
                  <td style={{ padding: '1rem', fontStyle: 'italic' }}>ANNUAL GENERAL MEETING /DIVIDEND - 1 RS PER SHARE</td>
                  <td style={{ padding: '1rem', color: 'var(--accent-danger)' }}>Formatting anomaly</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Step 4 */}
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '32px', padding: '4rem', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', border: '1px solid var(--border-light)', alignSelf: 'flex-start' }}>
            <TrendingUp size={16} color="#8bc1e9" /> Step 4: The Go Mathematics Engine
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.125rem', marginBottom: '1.5rem' }}>
            With pristine, split-adjusted data now resting in the database, the heavy lifting begins. When you request a backtest on the frontend, our blazing-fast backend (written in Go) springs into action.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.125rem' }}>
            The backend fetches the clean stock data and applies all of the complex mathematical models and algorithms (Sharpe, Sortino, Kelly, etc.). The raw mathematical truth is then fired back to the React frontend in milliseconds, giving you an immediate, visual understanding of the strategy's risk and reward.
          </p>
        </div>

      </main>

      <Footer />

    </div>
  );
}
