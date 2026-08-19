import axios from 'axios';
import type { 
    StandardDeviationResponse, 
    FourSigmaThresholdResponse,
    DrawdownResponse,
    MarRatioResponse,
    SortinoRatioResponse,
    CagrResponse,
    CumulativeReturnResponse,
    MultiKellyResponse,
    StockExplorerItem
} from '../types/api';

const API_BASE_URL = 'http://localhost:8080'; // Removed /api as Go router mounts directly at /v1

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface BaseParams {
    symbols: string;
    start_date: string;
    end_date: string;
}

export interface SharpeRatioParams extends BaseParams {
    risk_free_rate?: string;
}

export interface MultiKellyParams {
    symbols: string; // comma-separated stock symbols
    start_date: string;
    end_date: string;
    risk_free_rate?: string;
}

export interface SharpeRatioResponse {
    sharpe_ratio_value: number;
}

export interface KellyResponse {
    kelly_percentage: number;
    half_kelly_percentage: number;
    optimal_growth_rate_for_full_kelly: number;
    optimal_growth_rate_for_half_kelly: number;
    annualized_mean_return: number;
    annualized_volatility: number;
    excess_return: number;
    sharpe_ratio: number;
}

export const api = {
    getStandardDeviation: async (params: BaseParams): Promise<StandardDeviationResponse> => {
        const response = await apiClient.get(`/v1/std/std_deviation`, { params });
        return response.data;
    },
    
    getFourSigmaThreshold: async (params: BaseParams): Promise<FourSigmaThresholdResponse> => {
        const response = await apiClient.get(`/v1/4_sigma_threshold`, { params });
        return response.data;
    },
    
    getSharpeRatio: async (params: SharpeRatioParams): Promise<SharpeRatioResponse> => {
        const response = await apiClient.get(`/v1/sharpe_ratio_value`, { params });
        return response.data;
    },

    getSingleKelly: async (params: SharpeRatioParams): Promise<KellyResponse> => {
        const response = await apiClient.get(`/v1/kelly_formula/single`, { params });
        return response.data;
    },

    getDrawdown: async (params: BaseParams): Promise<DrawdownResponse> => {
        const response = await apiClient.get(`/v1/dd/maximum_drawdown`, { params });
        return response.data;
    },

    getMarRatio: async (params: BaseParams): Promise<MarRatioResponse> => {
        const response = await apiClient.get(`/v1/cagr_to_drawdown_ratio`, { params });
        return response.data;
    },

    getSortinoRatio: async (params: BaseParams): Promise<SortinoRatioResponse> => {
        const response = await apiClient.get(`/v1/sortino_ratio_value`, { params });
        return response.data;
    },

    getCagr: async (params: BaseParams): Promise<CagrResponse> => {
        const response = await apiClient.get(`/v1/returns/cagr`, { params });
        return response.data;
    },

    getCumulativeReturn: async (params: BaseParams): Promise<CumulativeReturnResponse> => {
        const response = await apiClient.get(`/v1/returns/cumulative_return`, { params });
        return response.data;
    },

    getPeriodicReturn: async (params: BaseParams): Promise<PeriodicReturnResponse> => {
        const response = await apiClient.get(`/v1/returns/periodic_return`, { params });
        return response.data;
    },

    getMultiKelly: async (params: MultiKellyParams): Promise<MultiKellyResponse> => {
        const searchParams = new URLSearchParams();
        searchParams.append('symbols', params.symbols);
        searchParams.append('start_date', params.start_date);
        searchParams.append('end_date', params.end_date);
        if (params.risk_free_rate) {
            searchParams.append('risk_free_rate', params.risk_free_rate);
        }
        const response = await apiClient.get(`/v1/kelly_formula/multi`, { params: searchParams });
        return response.data;
    },

    getStocks: async (page: number, limit: number): Promise<StockExplorerItem[]> => {
        const response = await apiClient.get(`/v1/get_stock_details`, {
            params: { page, limit }
        });
        return response.data;
    }
};
