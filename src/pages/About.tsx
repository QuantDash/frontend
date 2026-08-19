import { Target, Code2, Rocket } from 'lucide-react';
import { useConfigStore } from '../store/useConfigStore';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function About() {
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

        {/* Hero Content */}
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
            About QuantDash
          </h1>
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.6,
            opacity: 0.95,
            fontWeight: 400,
            maxWidth: '600px'
          }}>
            A professional-grade quantitative backtesting engine and analytics dashboard, built for serious algorithmic traders.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main style={{ maxWidth: '1200px', margin: '-4rem auto 0', padding: '0 2rem 6rem', width: '100%', position: 'relative', zIndex: 5 }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>

          {/* Card 1: What is it */}
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '32px', padding: '3rem', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', border: '1px solid var(--border-light)', alignSelf: 'flex-start' }}>
              <Target size={16} color="#8bc1e9" /> What is it?
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.125rem' }}>
              QuantDash is a high-performance analytics platform bridging the gap between raw financial data and actionable trading intelligence. It combines a <strong>blazing-fast Go backend</strong> with a beautiful, responsive <strong>React frontend</strong> to provide hedge-fund level insights into your trading strategies.
            </p>
          </div>

          {/* Card 2: What does it do */}
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '32px', padding: '3rem', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', border: '1px solid var(--border-light)', alignSelf: 'flex-start' }}>
              <Rocket size={16} color="#8bc1e9" /> What does it do?
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.125rem' }}>
              The platform ingests historical price data and executes rigorous mathematical models to evaluate strategy performance. It calculates advanced metrics—including <strong>CAGR, Maximum Drawdown, Sortino Ratios, and Kelly criterion fractions</strong>—and visualizes equity curves instantly, ensuring your capital is deployed only on proven edges.
            </p>
          </div>
        </div>

        {/* Card 3: Why did I make this */}
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '32px', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', border: '1px solid var(--border-light)' }}>
            <Code2 size={16} color="#8bc1e9" /> Why did I make this?
          </div>
          <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.125rem', textAlign: 'left' }}>
            <p>
              As algorithmic trading becomes more accessible, the tools used to validate those strategies have remained fragmented, slow, or prohibitively expensive. Relying on spreadsheets or clunky Python notebooks often leads to <strong>analysis paralysis</strong> and a lack of clear visual feedback on risk-adjusted performance.
            </p>
            <p>
              I built <strong>QuantDash</strong> to solve my own need for speed and clarity. By offloading the heavy statistical computations to a compiled language like Go, and marrying it with a modern, zero-latency React interface, the feedback loop from <em>"I have an idea"</em> to <em>"This strategy has a robust edge"</em> is reduced from hours to milliseconds.
            </p>
            <p>
              This project is a testament to the belief that powerful financial technology shouldn't just be accurate—it should be beautiful, intuitive, and built to empower the independent quantitative developer.
            </p>
          </div>
        </div>

        {/* Card 4: Quant vs Normal Trading */}
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '32px', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', border: '1px solid var(--border-light)' }}>
            <Target size={16} color="#8bc1e9" /> Quantitative vs. Normal Trading
          </div>
          <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.125rem', textAlign: 'left' }}>
            <p>
              Normal trading often involves staring at candlestick charts, drawing subjective lines, and relying heavily on gut feeling or luck. <strong>Quantitative trading removes the guessing game.</strong>
            </p>
            <p>
              It relies on cold, hard mathematics and historical data analysis to rigorously test if a strategy actually possesses a statistically significant edge over time. In quantitative trading, we use mathematically based algorithms to strip away human emotion and bias.
            </p>
            <p>
              To validate these mathematical models, we use specific statistical ratios and performance metrics. That is exactly what this website is - a collection of powerful mathematical validation tools designed to separate luck from genuine, repeatable alpha.
            </p>
            <p>
              You can read about the exact math powering this engine in our <a href="/docs" style={{ color: '#8bc1e9', textDecoration: 'none', fontWeight: 600 }}>Documentation</a> page.
            </p>
          </div>
        </div>

        {/* Card 5: The Project Journey */}
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '32px', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', border: '1px solid var(--border-light)' }}>
            <Rocket size={16} color="#8bc1e9" /> The Project Journey
          </div>
          <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.125rem', textAlign: 'left' }}>
            <p>
              I wanted to deeply study different quantitative trading strategies and implement them from scratch. Initially, I built the entire mathematics engine purely in Go. I would feed it data and get the answers printed straight to my terminal.
            </p>
            <p>
              But staring at a wall of terminal text made it extremely difficult to visualize the true risk, the drawdowns, and the equity curves of my strategies.
            </p>
            <p>
              So, I integrated this modern React frontend on top of it. Seeing the terminal numbers transform into beautiful, interactive data completely changed how I evaluate strategies. It brought the terminal to life.
            </p>
          </div>
        </div>

      </main>

      <Footer />

    </div>
  );
}
