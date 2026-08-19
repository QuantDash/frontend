export interface StandardDeviationResponse {
    std_deviation_value: number;
    annualized_volatility: number;
    mean: number;
    total_trading_days: number;
    total_calender_days: number;
}

export interface Outlier {
    date: string;
    return_value: number;
}

export interface FourSigmaThresholdResponse {
    standard_deviation: StandardDeviationResponse;
    "4_sigma_threshold_count": number;
    upper_bound: number;
    lower_bound: number;
    outliers: Outlier[];
}

export interface DrawdownResponse {
    max_drawdown: number;
    trough_date?: string;
    start_date?: string;
    end_date?: string;
    duration_days: number;
}

export interface MarRatioResponse {
    cagr_to_drawdown_ratio_value: number;
    total_calender_days: number;
    total_trading_days: number;
}

export interface SortinoRatioResponse {
    sortino_ratio_value: number;
}

export interface CagrResponse {
    cagr_value: number;
}

export interface CumulativeReturnResponse {
    cumulative_return_value: number;
}

export interface PeriodicReturnResponse {
    daily_returns: number[];
    prices: number[];
    dates: string[];
}


export interface MultiKellyResponse {
    full_kelly: Record<string, number>;
    half_kelly: Record<string, number>;
}

export interface StockExplorerItem {
    symbol: string;
    status: string;
    trade_date: string;
    close_price: number | null;
    adjusted_close: number | null;
    volume: number | null;
    adjusted_volume: number | null;
}
