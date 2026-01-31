export interface Pet {
  id?: number;
  nome: string;
  especie: string;
  idade?: number;
  raca?: string;
  fotoUrl?: string;
  tutorId?: number;
}

export interface Tutor {
  id?: number;
  nome: string;
  nomeCompleto?: string; // compatibilidade
  cpf?: string;
  telefone: string;
  endereco: string;
  fotoUrl?: string;
  pets?: Pet[];
  email?: string;
  senha?: string;
}

export interface User {
  id: number;
  nome: string;
  email: string;
  tipo?: 'TUTOR' | 'ADMIN';
}

export interface AuthTokens {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export enum ViewState {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD'
}
