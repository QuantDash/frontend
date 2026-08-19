import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { BacktestEngine } from './pages/BacktestEngine';
import { StocksExplorer } from './pages/StocksExplorer';
import { Settings } from './pages/Settings';
import { About } from './pages/About';
import { Docs } from './pages/Docs';
import { Pipeline } from './pages/Pipeline';
import { Menu } from 'lucide-react';
import { useConfigStore } from './store/useConfigStore';

function AppLayout() {
  const { isAppSidebarOpen, toggleAppSidebar } = useConfigStore();
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
      <Navbar />
      <div className="app-layout">
        
        {/* Mobile Overlay */}
        {isAppSidebarOpen && (
          <div 
            className="mobile-overlay"
            onClick={toggleAppSidebar}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1999 }}
          />
        )}
        
        <Sidebar />
        <main className="app-main">
          
          {/* Mobile Sidebar Toggle Button */}
          <button className="sidebar-toggle-btn" onClick={toggleAppSidebar}>
            <Menu size={20} /> <span style={{ fontSize: '0.9rem', marginLeft: '0.5rem', fontWeight: 600 }}>Dashboard Menu</span>
          </button>

          <div className="padding-mobile" style={{ flex: 1, padding: '2rem 2rem 4rem 2rem' }}>
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

function App() {
  const theme = useConfigStore(state => state.theme);

  return (
    <div className={theme} style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/pipeline" element={<Pipeline />} />
        
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="stocks" element={<StocksExplorer />} />
          <Route path="engine" element={<BacktestEngine />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
