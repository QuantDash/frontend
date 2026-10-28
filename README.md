# QuantDash Frontend

A quantitative analysis dashboard built with **React + TypeScript**, designed to visualize financial metrics for NSE (National Stock Exchange of India) stocks. It connects to the [QuantDash Backend](https://github.com/QuantDash/Backend) API to run calculations and display the results interactively.

---

## What It Does

QuantDash is a single-page application that lets you:

- Enter any NSE stock ticker, a date range, and a risk-free rate
- Run institutional-grade quantitative calculations against historical adjusted price data
- Visualize results through metric cards, charts, and equity curves
- Explore a paginated list of all stocks available in the database
- Read documentation explaining the financial theory behind each metric

---

## Tech Stack

| Layer | Technology |
|:---|:---|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Routing | React Router v7 |
| Data Fetching | TanStack Query (React Query v5) |
| HTTP Client | Axios |
| State Management | Zustand |
| Charts | Recharts |
| Icons | Lucide React |
| Linting | OxLint |

---

## Analyses Available

From the Dashboard, you can run the following calculations by selecting an analysis type and submitting a stock symbol + date range:

| Analysis | What It Computes |
|:---|:---|
| **4-Sigma Threshold** | Detects extreme daily return events (Black Swans) beyond 4 standard deviations |
| **Standard Deviation** | Daily and annualized volatility |
| **Sharpe Ratio** | Risk-adjusted return (excess return per unit of total volatility) |
| **Sortino Ratio** | Like Sharpe, but only penalizes downside volatility |
| **Kelly Criterion** | Mathematically optimal single-asset position size |
| **Multi-Kelly** | Optimal allocations across multiple assets using covariance matrix inversion |
| **Max Drawdown** | Largest peak-to-trough decline with exact dates |
| **MAR Ratio** | CAGR divided by Maximum Drawdown |
| **CAGR** | Compound Annual Growth Rate |
| **Cumulative Return** | Total return over the selected period |

---


## Getting Started

### Prerequisites

- Node.js 18+
- The [QuantDash Backend](https://github.com/QuantDash/Backend) running locally on port `8080`

### 1. Clone the repository

```bash
git clone https://github.com/QuantDash/frontend.git
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API URL

The app currently points to `http://localhost:8080` by default. To change the backend URL, set `VITE_API_BASE_URL` in a `.env` file:

```bash
# .env (create this file — it is gitignored)
VITE_API_BASE_URL=http://localhost:8080
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

| Command | Description |
|:---|:---|
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Type-check and build for production (`dist/`) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run OxLint |

---

## How the Dashboard Works

1. **User inputs** a stock ticker (e.g., `TCS`), a date range, and selects an analysis type from the `ConfigurationPanel`.
2. On submit, the inputs are stored in the **Zustand store** (`useConfigStore`).
3. **TanStack Query** fires the corresponding API call via `src/services/api.ts` — only the selected analysis type is fetched (other queries stay disabled).
4. Results are rendered as **MetricCards** and/or **Charts** depending on the analysis type.
5. The entire calculation happens on the backend — the frontend only handles input, display, and state.

---

## Theme

The app supports **light and dark mode**, toggled from the navbar. Theme state is persisted in the Zustand store. CSS custom properties (`--bg-primary`, `--text-primary`, etc.) are used throughout for consistent theming.

---
