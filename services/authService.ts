import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import type { LoginRequest, User } from '../types';

export interface LoginResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  refresh_expires_in?: number;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  usuario?: User;
  user?: User;
}

const CONTA_TESTE = { usuario: 'teste', senha: 'teste123' };

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    if (
      credentials.email === CONTA_TESTE.usuario &&
      credentials.senha === CONTA_TESTE.senha
    ) {
      const mockResponse: LoginResponse = {
        access_token: 'token-teste-petconnect',
        refresh_token: 'refresh-teste-petconnect',
        expires_in: 3600,
        usuario: { id: 1, nome: 'Usuário Teste', email: 'teste@petconnect.local' },
      };
      this.saveSession(mockResponse);
      return mockResponse;
    }

    const { data } = await axios.post<LoginResponse>(
      `${API_BASE_URL}/autenticacao/login`,
      { username: credentials.email, password: credentials.senha },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  },

  async refreshToken(): Promise<{ token: string }> {
    const refreshToken = localStorage.getItem('petconnect_refresh_token');
    const { data } = await fetch(`${API_BASE_URL}/autenticacao/refresh`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(refreshToken && { Authorization: `Bearer ${refreshToken}` }),
      },
    }).then((r) => r.json());
    return data;
  },

  logout() {
    localStorage.removeItem('petconnect_token');
    localStorage.removeItem('petconnect_refresh_token');
    localStorage.removeItem('petconnect_user');
  },

  saveSession(response: LoginResponse) {
    const token = response.access_token ?? response.token ?? response.accessToken;
    if (token) localStorage.setItem('petconnect_token', token);
    const refresh = response.refresh_token ?? response.refreshToken;
    if (refresh) localStorage.setItem('petconnect_refresh_token', refresh);
    const user = response.usuario ?? response.user;
    if (user) localStorage.setItem('petconnect_user', JSON.stringify(user));
  },

  getStoredUser(): User | null {
    const stored = localStorage.getItem('petconnect_user');
    return stored ? JSON.parse(stored) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('petconnect_token');
  },
};
