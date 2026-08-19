import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calculator, Activity, Shield, TrendingUp, ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import bellCurveImg from '../assets/bell_curve.png';

type NavItem = {
  id: string;
  name: string;
  children?: NavItem[];
};

export function Docs() {
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [isDocsSidebarOpen, setIsDocsSidebarOpen] = useState(false);
  const toggleDocsSidebar = () => setIsDocsSidebarOpen(!isDocsSidebarOpen);

  const metrics: NavItem[] = [
    { id: 'cumulative-return', name: 'Cumulative Return' },
    { id: 'cagr', name: 'CAGR (Compound Annual Growth Rate)' },
    { id: 'max-drawdown', name: 'Maximum Drawdown' },
    { id: 'standard-deviation', name: 'Standard Deviation' },
    { id: 'annualized-volatility', name: 'Annualized Volatility' },
    { id: 'sharpe-ratio', name: 'Sharpe Ratio' },
    { id: 'sortino-ratio', name: 'Sortino Ratio' },
    { id: 'mar-ratio', name: 'MAR Ratio' },
    { id: 'kelly-criterion', name: 'Kelly Criterion' },
    { id: '4-sigma-threshold', name: '4-Sigma Threshold' },
  ];

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderNavItems = (items: NavItem[], prefix = '') => {
    return items.map((item, index) => {
      const itemNumber = prefix ? `${prefix}.${index + 1}` : `${index + 1}`;
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedItems[item.id];

      return (
        <div key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
          <a
            href={`#${item.id}`}
            style={{
              padding: '0.5rem 1rem',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginLeft: prefix ? '1rem' : '0'
            }}
            onClick={() => {
              if (hasChildren && !isExpanded) {
                setExpandedItems(prev => ({ ...prev, [item.id]: true }));
              }
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-secondary)'; e.currentTarget.style.background = 'var(--bg-primary)'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 600, minWidth: prefix ? '1.5rem' : '1.2rem', opacity: 0.7 }}>{itemNumber}.</span>
              <span>{item.name}</span>
            </div>
            {hasChildren && (
              <div onClick={(e) => toggleExpand(item.id, e)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0.2rem' }}>
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
            )}
          </a>
          {hasChildren && isExpanded && (
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '0.25rem' }}>
              {renderNavItems(item.children!, itemNumber)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>

      {/* Top Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="app-layout">

        {/* Mobile Overlay */}
        {isDocsSidebarOpen && (
          <div 
            className="mobile-overlay"
            onClick={toggleDocsSidebar}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1999 }}
          />
        )}

        {/* Left Sidebar TOC (Vue.js style) */}
        <aside className={`app-sidebar ${isDocsSidebarOpen ? 'open' : ''}`} style={{ borderRight: '1px solid var(--border-light)', overflowY: 'auto', background: 'var(--bg-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', paddingLeft: '1rem', color: 'var(--text-primary)', fontWeight: 700 }}>
            <BookOpen size={18} color="var(--accent-secondary)" /> Metrics Guide
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {renderNavItems(metrics)}
          </nav>
        </aside>

        {/* Right Content */}
        <main className="app-main">
          
          {/* Mobile Sidebar Toggle Button */}
          <button className="sidebar-toggle-btn" onClick={toggleDocsSidebar}>
            <Menu size={20} /> <span style={{ fontSize: '0.9rem', marginLeft: '0.5rem', fontWeight: 600 }}>Docs Menu</span>
          </button>

          <div className="padding-mobile" style={{ flex: 1, padding: '3rem 4rem', scrollBehavior: 'smooth' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>

            <div>
              <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', fontWeight: 800 }}>Documentation</h1>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Welcome to the official QuantDash documentation. Here you will find detailed mathematical definitions, examples, and trading interpretations for every performance metric calculated by our Go engine.
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)' }} />

            {/* Cumulative Return */}
            <section id="cumulative-return">
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp color="var(--accent-secondary)" /> Cumulative Return
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Cumulative Return is the total amount that an investment has gained or lost over time, independent of the period of time involved.
              </p>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', fontFamily: 'monospace', marginBottom: '1.5rem' }}>
                Cumulative Return = (End_Value - Begin_Value) / Begin_Value
              </div>
            </section>

            {/* CAGR */}
            <section id="cagr">
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp color="var(--accent-secondary)" /> CAGR
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                The Compound Annual Growth Rate (CAGR) measures the smoothed annualized return of your strategy, it only cares about cash value at start and end of the investment.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Let's assume a stock jumps up 40% one year, crashes 20% the next, and stays flat the third. CAGR ignores these yearly percentages entirely and asks one simple hypothetical question: <em>"If this stock was completely stripped of its volatility and just grew at one perfectly steady, boring percentage every single year, what would that percentage be?"</em>
              </p>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', fontFamily: 'monospace', marginBottom: '1.5rem' }}>
                CAGR = (End_Value / Begin_Value) ^ (1 / Years) - 1
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                <strong>Example:</strong>Suppose your starting value is ₹100, and your ending value is ₹75 after 2 years. When you plug those numbers in, the CAGR outputs <strong>-13.4%</strong>.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                It tells you the absolute truth: to go from ₹100 to ₹75 in two years, your money eroded by exactly 13.4% every single year. This gives us the true, annualized growth rate of our asset
              </p>
              <div style={{ background: 'rgba(139, 193, 233, 0.1)', borderLeft: '4px solid #8bc1e9', padding: '1rem', borderRadius: '4px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <strong>Note:</strong> You cannot run CAGR for less than a year as it calculates <em>annual</em> growth.
              </div>
            </section>

            {/* Max Drawdown */}
            <section id="max-drawdown">
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity color="var(--accent-danger)" /> Maximum Drawdown
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Maximum Drawdown measures the largest single drop from peak to trough in your portfolio's value before a new peak is achieved. Think of it as your <strong>"Disaster Check"</strong>. It tells you the absolute worst-case historical scenario and answers: <em>"If everything goes wrong, exactly how much of my money could vanish?"</em>
              </p>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', fontFamily: 'monospace', marginBottom: '1.5rem' }}>
                Max Drawdown = (Trough_Value - Peak_Value) / Peak_Value
              </div>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', marginBottom: '0.75rem', fontWeight: 700 }}>The "₹50 Illusion"</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                If you only calculate the difference (Peak - Trough), you find the <em>absolute cash lost</em>. But in finance, absolute cash lost is completely meaningless unless you know how much money you started with. This is why the division step is mandatory.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Imagine tracking two different stocks, and both drop by exactly ₹50 during a market crash. If we only did the subtraction, both would look equally risky (a ₹50 drawdown). But let's apply the division step:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--accent-danger)' }}>Stock A (Penny Stock)</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    <li><strong>Peak:</strong> ₹100</li>
                    <li><strong>Trough:</strong> ₹50</li>
                    <li><strong>Drop:</strong> ₹100 - ₹50 = ₹50</li>
                    <li style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(239, 68, 68, 0.1)' }}><strong>Division:</strong> ₹50 / ₹100 = <strong>-50%</strong> (Massive wipeout)</li>
                  </ul>
                </div>
                <div style={{ background: 'rgba(139, 193, 233, 0.05)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(139, 193, 233, 0.2)' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#8bc1e9' }}>Stock B (Blue-Chip)</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    <li><strong>Peak:</strong> ₹10,000</li>
                    <li><strong>Trough:</strong> ₹9,950</li>
                    <li><strong>Drop:</strong> ₹10,000 - ₹9,950 = ₹50</li>
                    <li style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(139, 193, 233, 0.1)' }}><strong>Division:</strong> ₹50 / ₹10,000 = <strong>-0.5%</strong> (Microscopic dip)</li>
                  </ul>
                </div>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', marginBottom: '0.75rem', fontWeight: 700 }}>The "Apples-to-Apples" Rule</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                If a user looks at Stock A, they need to know they could lose half their money. If they look at Stock B, they need to know it barely moved. Because asset prices range drastically, dividing the drop by the peak normalizes the math. It turns every single asset in the world into a clean, comparative percentage.
              </p>
            </section>

            {/* Standard Deviation */}
            <section id="standard-deviation">
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity color="#8bc1e9" /> Standard Deviation
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Standard Deviation measures the dispersion of daily returns relative to their mean. Simply put, it is the math formula that calculates exactly how far, on average, the real numbers strayed from the middle line.
              </p>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', fontFamily: 'monospace', marginBottom: '1.5rem' }}>
                StdDev = sqrt( sum( (x_i - mean)^2 ) / (N - 1) )
              </div>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', marginBottom: '0.75rem', fontWeight: 700 }}>The "Chaos Score"</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Imagine your dashboard has two stocks. Both stocks average a 1% profit per day. If your dashboard only tells the user: <em>"This stock averages 1% a day"</em>, you are hiding the truth. You have to give them the Chaos Score (Standard Deviation) so they know exactly what they are buying:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(139, 193, 233, 0.05)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(139, 193, 233, 0.2)' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#8bc1e9' }}>Stock A (Low Std Dev)</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    Goes up 1% on Monday, 1% on Tuesday, 1% on Wednesday. You can sleep peacefully at night.
                  </p>
                </div>
                <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--accent-danger)' }}>Stock B (High Std Dev)</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    Drops 10% on Monday, shoots up 15% on Tuesday, drops 2% on Wednesday. You are stressing out and checking your phone every five minutes.
                  </p>
                </div>
              </div>
            </section>

            {/* Annualized Volatility */}
            <section id="annualized-volatility">
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Annualized Volatility</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Volatility measures the standard deviation of your strategy's daily returns, scaled to an annual figure. Higher volatility indicates a bumpier ride, even if the final return is high.
              </p>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', fontFamily: 'monospace', marginBottom: '1.5rem' }}>
                Ann. Volatility = Standard_Deviation(Daily_Returns) * sqrt(252)
              </div>
            </section>

            {/* Sharpe Ratio */}
            <section id="sharpe-ratio">
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield color="#8bc1e9" /> Sharpe Ratio
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                The Sharpe Ratio is a measure used to calculate the risk-adjusted return of an investment or a trading strategy.
              </p>
              
              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', fontFamily: 'monospace', marginBottom: '0.5rem' }}>
                Sharpe = (Annualized_Mean_Return - Risk_Free_Rate) / Annualized_Volatility
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                *Note: We use Annualized Mean Return (arithmetic return) instead of CAGR (geometric return) because the Sharpe Ratio requires an arithmetic mean for accurate volatility penalization.
              </p>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', marginBottom: '0.75rem', fontWeight: 700 }}>The "Risk-Free" Baseline</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                If you put your money in a fixed deposit or a Government Bond, you are guaranteed to make around 7% a year. Your money never goes down. You experience zero stress, zero volatility, and zero Black Swans. That 7% is called the <strong>Risk-Free Rate</strong>.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                If you decide to take your money out of that safe bond and buy a stock, you are taking on risk (volatility). The Sharpe Ratio asks one brutally simple question: <em>"For every 1% of extra stress I endured in the stock market, how much extra profit did I make above that 7% baseline?"</em>
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(139, 193, 233, 0.05)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(139, 193, 233, 0.2)' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#8bc1e9' }}>Stock A (The Blue Chip)</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    <li><strong>Annualized Return:</strong> 12%</li>
                    <li><strong>Annualized Volatility:</strong> 5%</li>
                    <li style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(139, 193, 233, 0.1)' }}><strong>The Math:</strong> (12% - 7%) / 5% = <strong>Sharpe of 1.0</strong></li>
                    <li style={{ fontStyle: 'italic', marginTop: '0.25rem', color: '#8bc1e9' }}>The Reality: For every 1% of volatility the investor suffered, they were rewarded with exactly 1% of pure, extra profit. This is a very solid, stable investment.</li>
                  </ul>
                </div>
                <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--accent-danger)' }}>Stock B (The Hype Stock)</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    <li><strong>Annualized Return:</strong> 17%</li>
                    <li><strong>Annualized Volatility:</strong> 20%</li>
                    <li style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(239, 68, 68, 0.1)' }}><strong>The Math:</strong> (17% - 7%) / 20% = <strong>Sharpe of 0.5</strong></li>
                    <li style={{ fontStyle: 'italic', marginTop: '0.25rem', color: 'var(--accent-danger)' }}>The Reality: The return is higher (17% vs 12%), so a rookie would buy Stock B. But the Sharpe Ratio is terrible. The stock is swinging wildly, and the investor is taking on massive amounts of stress just to squeeze out a few extra percent.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Sortino Ratio */}
            <section id="sortino-ratio">
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield color="#8bc1e9" /> Sortino Ratio
              </h2>

              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Unlike the Sharpe ratio which penalizes all volatility, the Sortino ratio only penalizes <strong>downside volatility</strong>. This makes it a superior metric for strategies where you want to ignore "good" upside volatility and only measure the risk of actually losing money.
              </p>
              
              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', fontFamily: 'monospace', marginBottom: '0.5rem' }}>
                Sortino = (Annualized_Mean_Return - Risk_Free_Rate) / Annualized_Downside_Deviation
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                *Note: Like the Sharpe ratio, we use Annualized Mean Return instead of CAGR.
              </p>

              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Standard Deviation (which Sharpe uses) considers both crashes (-10%) and massive surges (+10%) as "chaos," penalizing the score. But in reality, you only sweat when a stock drops. The Sortino Ratio fixes this by completely ignoring upside jumps and replacing Total Volatility with <strong>Downside Deviation</strong>.
              </p>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', marginBottom: '0.75rem', fontWeight: 700 }}>The Financial Market Example</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Let's look at two tech stocks. Both have a Risk-Free Rate of 7%.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(139, 193, 233, 0.05)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(139, 193, 233, 0.2)' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#8bc1e9' }}>Stock A (The Steady Crawler)</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    <li><strong>Annualized Return:</strong> 15%</li>
                    <li><strong>Daily Behavior:</strong> Steadily goes up exactly +0.1% almost every single day.</li>
                    <li style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(139, 193, 233, 0.1)' }}><strong>Sharpe Ratio:</strong> <strong>2.0</strong> (Excellent)</li>
                    <li style={{ fontStyle: 'italic', marginTop: '0.25rem', color: '#8bc1e9' }}>It is a straight line up.</li>
                  </ul>
                </div>
                <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--accent-danger)' }}>Stock B (The Explosive Winner)</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    <li><strong>Annualized Return:</strong> 25%</li>
                    <li><strong>Daily Behavior:</strong> Goes up +0.1% most days, but every few months it explodes upwards +15%. It never crashes.</li>
                    <li style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(239, 68, 68, 0.1)' }}><strong>Sharpe Ratio:</strong> <strong>0.8</strong> (Subpar)</li>
                    <li style={{ fontStyle: 'italic', marginTop: '0.25rem', color: 'var(--accent-danger)' }}>The Sharpe severely penalizes Stock B for being "too bouncy," even though all the bounces made you rich!</li>
                  </ul>
                </div>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', marginBottom: '0.75rem', fontWeight: 700 }}>The Sortino Solution</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                If you run Stock B through the Sortino Ratio, it ignores those +15% explosive days. It only looks at the downside risk. Because Stock B never crashed, its Downside Deviation is tiny. 
              </p>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                <li>Stock B's Sortino Ratio: <strong>3.5 (God-Tier)</strong>.</li>
              </ul>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                The Sortino Ratio tells the absolute truth: Stock B is an incredible investment.
              </p>
            </section>

            {/* MAR Ratio */}
            <section id="mar-ratio">
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield color="#8bc1e9" /> MAR Ratio
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                The MAR (Managed Account Reports) Ratio is a quick, brutally honest measure of risk-adjusted performance. Think of the MAR ratio simply as the <strong>"Reward-to-Pain"</strong> ratio. It answers one basic question: <em>"How much money are you making compared to the worst beating your account took to get there?"</em>
              </p>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', fontFamily: 'monospace', marginBottom: '1.5rem' }}>
                MAR = CAGR / ABS(Max_Drawdown)
              </div>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', marginBottom: '0.75rem', fontWeight: 700 }}>Why Returns Aren't Enough</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Here is a practical example of why this ratio is needed. Imagine you are comparing two different stocks. If you only look at their CAGR (returns), Stock B looks like the clear winner because 30% is bigger than 20%. But let's look at the actual reality of holding them:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(139, 193, 233, 0.05)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(139, 193, 233, 0.2)' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#8bc1e9' }}>Stock A</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    <li><strong>CAGR (Reward):</strong> 20%</li>
                    <li><strong>Max Drawdown (Pain):</strong> -10%</li>
                    <li style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(139, 193, 233, 0.1)' }}><strong>MAR Ratio:</strong> 20 / 10 = <strong>2.0</strong></li>
                    <li style={{ fontStyle: 'italic', marginTop: '0.25rem', color: '#8bc1e9' }}>Excellent. You make twice as much as you risk.</li>
                  </ul>
                </div>
                <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--accent-danger)' }}>Stock B</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    <li><strong>CAGR (Reward):</strong> 30%</li>
                    <li><strong>Max Drawdown (Pain):</strong> -50%</li>
                    <li style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(239, 68, 68, 0.1)' }}><strong>MAR Ratio:</strong> 30 / 50 = <strong>0.6</strong></li>
                    <li style={{ fontStyle: 'italic', marginTop: '0.25rem', color: 'var(--accent-danger)' }}>Terrible. You risk losing way more than you make.</li>
                  </ul>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                At some point, you had to watch half of your money evaporate (a 50% drop) just to earn that 30% return on Stock B. For most people, that amount of pain and risk of going broke is not worth the extra profit. This is exactly the truth that the MAR ratio exposes.
              </p>
            </section>

            {/* Kelly Criterion */}
            <section id="kelly-criterion">
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calculator color="#8bc1e9" /> Kelly Criterion
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                The Kelly Criterion tells you the mathematically optimal fraction of your bankroll to allocate to an asset to maximize long-term wealth compounding. It perfectly balances the pursuit of aggressive growth against the mathematical certainty of avoiding ruin.
              </p>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', marginBottom: '0.75rem', fontWeight: 700 }}>1. Single Asset Kelly</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Use this when you are analyzing a single stock or strategy in isolation. It calculates exactly what percentage of your total portfolio should be dedicated to this one asset.
              </p>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', fontFamily: 'monospace', marginBottom: '1.5rem' }}>
                Single_Kelly_Fraction (f*) = (Annualized_Mean_Return - Risk_Free_Rate) / Annualized_Variance
              </div>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', marginBottom: '0.75rem', fontWeight: 700 }}>2. Multi-Asset Kelly</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Use this when you are building a portfolio of <em>multiple</em> stocks. Assets in the real world are correlated (they move together). The Multi-Kelly formula accounts for these correlations by using a covariance matrix to calculate the optimal allocation vector across all assets simultaneously.
              </p>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', fontFamily: 'monospace', marginBottom: '1.5rem' }}>
                Multi_Kelly_Vector (F) = Inverse(Covariance_Matrix) * Vector(Mean_Excess_Returns)
              </div>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', marginBottom: '0.75rem', fontWeight: 700 }}>Risk Management & Growth</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(139, 193, 233, 0.05)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(139, 193, 233, 0.2)' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#8bc1e9' }}>Half Kelly</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                    The "Full Kelly" can be extremely volatile in practice. Many quantitative traders use "Half Kelly" to drastically reduce psychological pain and portfolio drawdowns, while mathematically retaining 75% of the optimal compounding rate.
                  </p>
                  <code style={{ background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '4px', display: 'block', fontSize: '0.85rem' }}>
                    Half_Kelly = Full_Kelly_Fraction / 2
                  </code>
                </div>
                <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--accent-danger)' }}>Optimal Growth Rate</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                    This formula calculates the expected compounded growth rate of your portfolio if you perfectly apply the Kelly fraction. It shows the absolute ceiling of wealth generation for the asset based on its Sharpe ratio.
                  </p>
                  <code style={{ background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '4px', display: 'block', fontSize: '0.85rem' }}>
                    Optimal_Growth (g) = Risk_Free_Rate + (Sharpe^2 / 2)
                  </code>
                </div>
              </div>
            </section>

            {/* 4-Sigma Threshold */}
            <section id="4-sigma-threshold">
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity color="var(--accent-danger)" /> 4-Sigma Threshold
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                What is it? <strong>"Sigma" (&sigma;)</strong> is just the mathematical term for Standard Deviation, which we discussed above. In a perfect Bell Curve, there are strict mathematical rules about probability:
              </p>

              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 300px' }}>
                  <img src={bellCurveImg} alt="Bell Curve Sigma Distribution" style={{ width: '90%', borderRadius: '12px', border: '1px solid var(--border-light)' }} />
                </div>
                <div style={{ flex: '1 1 300px' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#8bc1e9' }}>1-Sigma:</strong> 68% of all days fall within this range.</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#8bc1e9' }}>2-Sigma:</strong> 95% of all days fall within this range.</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#8bc1e9' }}>3-Sigma:</strong> 99.7% of all days fall within this range.</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--accent-danger)' }}>4-Sigma:</strong> 99.993% of all days fall within this range.</li>
                  </ul>
                  <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                    A 4-Sigma event is an anomaly. In a perfect statistical world, it should only happen roughly once every 63 years (about 1 in 15,000 trading days).
                  </p>
                </div>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', marginBottom: '0.75rem', fontWeight: 700 }}>The "Black Swan" Concept</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Here is the secret of quantitative finance: <strong>The stock market does NOT follow a perfect bell curve.</strong> Human panic and greed cause "Fat Tails"- meaning extreme events happen way more often than statistics say they should. A Black Swan is a massive, completely unpredictable event that shatters normal statistical models (like the 1987 Black Monday crash, the 2008 Lehman Brothers collapse, or the 2020 COVID-19 crash).
              </p>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', marginBottom: '0.75rem', fontWeight: 700 }}>Example</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Let's say you analyze a stock and find:
              </p>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                <li>The Average Daily Return is <strong>0%</strong>.</li>
                <li>The Daily Standard Deviation (1-Sigma) is <strong>1.5%</strong>.</li>
              </ul>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                To find the 4-Sigma threshold, you just multiply the standard deviation by 4: <code style={{ background: 'var(--bg-secondary)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>1.5% * 4 = 6.0%</code>. Any single day where the stock goes UP more than 6.0% or DOWN more than 6.0% is a 4-Sigma event.
              </p>

              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', fontFamily: 'monospace', marginBottom: '2rem' }}>
                4_Sigma_Move = Mean_Return - (4 * Standard_Deviation)
              </div>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', marginBottom: '0.75rem', fontWeight: 700 }}>Why is it needed?</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                This is a phenomenal risk analysis tool. If a user is looking at a stock, they want to know: <em>"How prone is this stock to unpredictable, violent explosions or crashes?"</em>
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                By counting how many 4-Sigma events a stock has had over the last 10 years, you are telling the user exactly how many times the stock "broke reality." If a stock has fifty 4-Sigma events, it is incredibly dangerous. If it has zero, it is highly stable.
              </p>
            </section>

            <div style={{ paddingBottom: '4rem' }} /> {/* Extra scroll padding */}

          </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
