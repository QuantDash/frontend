import { create } from 'zustand';

interface ConfigState {
  symbols: string;
  startDate: string;
  endDate: string;
  riskFreeRate: string;
  selectedAnalysis: '4sigma' | 'std' | 'sharpe' | 'kelly' | 'multi_kelly' | 'dd' | 'mar' | 'sortino' | 'cagr' | 'cumulative';
  theme: 'light' | 'dark';
  isAppSidebarOpen: boolean;
  
  setSymbols: (symbols: string) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setRiskFreeRate: (rate: string) => void;
  setSelectedAnalysis: (analysis: '4sigma' | 'std' | 'sharpe' | 'kelly' | 'multi_kelly' | 'dd' | 'mar' | 'sortino' | 'cagr' | 'cumulative') => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleAppSidebar: () => void;
}

// Default to a 1-year lookback from a fixed date for initial state
export const useConfigStore = create<ConfigState>((set) => ({
  symbols: '',
  startDate: '2023-01-01',
  endDate: '2024-01-01',
  riskFreeRate: '0.07',
  selectedAnalysis: '4sigma',
  theme: 'dark',
  isAppSidebarOpen: false,
  
  setSymbols: (symbols) => set({ symbols }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setRiskFreeRate: (riskFreeRate) => set({ riskFreeRate }),
  setSelectedAnalysis: (selectedAnalysis) => set({ selectedAnalysis }),
  setTheme: (theme) => set({ theme }),
  toggleAppSidebar: () => set((state) => ({ isAppSidebarOpen: !state.isAppSidebarOpen })),
}));
