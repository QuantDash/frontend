import React from 'react';
import { Activity, BarChart2, TrendingUp, Settings as SettingsIcon, Moon, Sun, BookOpen, Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useConfigStore } from '../store/useConfigStore';

export function Sidebar() {
  const { theme, setTheme, isAppSidebarOpen } = useConfigStore();
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <aside className={`app-sidebar ${isAppSidebarOpen ? 'open' : ''}`}>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
        <NavItem to="/app/dashboard" icon={<BarChart2 size={20} />} label="Dashboard" />
        <NavItem to="/app/stocks" icon={<Search size={20} />} label="Stocks Explorer" />
        <NavItem to="/app/engine" icon={<TrendingUp size={20} />} label="Backtest Engine" />
        <NavItem to="/docs" icon={<BookOpen size={20} />} label="Documentation" />
        <NavItem to="/app/settings" icon={<SettingsIcon size={20} />} label="Settings" />
      </nav>
    </aside>
  );
}

function NavItem({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  const { toggleAppSidebar } = useConfigStore();
  
  return (
    <NavLink
      to={to}
      onClick={() => toggleAppSidebar()}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        textDecoration: 'none',
        background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
        color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
        transition: 'all 0.2s ease',
        fontWeight: 500
      })}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
