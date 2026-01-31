import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '../config/api';

const TOKEN_TESTE = 'token-teste-petconnect';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let refreshPromise: Promise<string> | null = null;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('petconnect_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      const token = localStorage.getItem('petconnect_token');
      if (token === TOKEN_TESTE) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('petconnect_refresh_token');

      if (refreshToken) {
        try {
          if (!refreshPromise) {
            refreshPromise = (async () => {
              const { data } = await axios.put(
                `${API_BASE_URL}/autenticacao/refresh`,
                { refreshToken },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${refreshToken}`,
                  },
                }
              );
              const newToken = data.token ?? data.accessToken;
              if (newToken) localStorage.setItem('petconnect_token', newToken);
              return newToken;
            })();
          }
          const newToken = await refreshPromise;
          refreshPromise = null;
          if (originalRequest?.headers && newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          return api(originalRequest!);
        } catch {
          refreshPromise = null;
          localStorage.removeItem('petconnect_token');
          localStorage.removeItem('petconnect_refresh_token');
          localStorage.removeItem('petconnect_user');
          window.location.href = '/login';
        }
      } else {
        localStorage.removeItem('petconnect_token');
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
