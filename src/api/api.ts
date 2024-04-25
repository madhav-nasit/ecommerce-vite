import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getGeneralApiProblem } from 'api';

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

/**
 * Configuring the axios instance.
 */
const DEFAULT_API_CONFIG: ApiConfig = {
  url: import.meta.env.VITE_BASE_URL || '',
  timeout: 10000,
};

/**
 * Initialise axio api instance
 */
export const api = axios.create({
  baseURL: DEFAULT_API_CONFIG.url,
  timeout: DEFAULT_API_CONFIG.timeout,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can modify the request config here (e.g., add headers, authentication token)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response data here before it's passed to the component
    return response?.data;
  },
  (error) => {
    // Handle error responses here
    // For more read: https://github.com/axios/axios?tab=readme-ov-file#error-types
    const problem = getGeneralApiProblem(error);
    return Promise.reject(problem);
  },
);
