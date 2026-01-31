import api from './api';
import { isTestAccount } from '../utils/testMode';
import { mockStore } from './mockStore';
import type { Pet, PaginatedResponse } from '../types';

export const petsService = {
  async list(params?: { page?: number; size?: number; nome?: string }) {
    if (isTestAccount()) {
      let list = mockStore.pets.list();
      if (params?.nome) {
        list = list.filter((p) =>
          p.nome.toLowerCase().includes(params.nome!.toLowerCase())
        );
      }
      const page = params?.page ?? 0;
      const size = params?.size ?? 10;
      const start = page * size;
      const content = list.slice(start, start + size);
      return {
        content,
        totalElements: list.length,
        totalPages: Math.ceil(list.length / size),
        size,
        number: page,
      } as PaginatedResponse<Pet>;
    }
    const { data } = await api.get<PaginatedResponse<Pet> | Pet[]>('/v1/pets', {
      params: { page: params?.page ?? 0, size: params?.size ?? 10, nome: params?.nome },
    });
    return data;
  },

  async getById(id: number) {
    if (isTestAccount()) {
      const pet = mockStore.pets.getById(id);
      if (!pet) throw new Error('Pet não encontrado');
      return pet;
    }
    const { data } = await api.get<Pet>(`/v1/pets/${id}`);
    return data;
  },

  async create(pet: Omit<Pet, 'id'>) {
    if (isTestAccount()) {
      return mockStore.pets.create(pet);
    }
    const { data } = await api.post<Pet>('/v1/pets', pet);
    return data;
  },

  async update(id: number, pet: Partial<Pet>) {
    if (isTestAccount()) {
      const updated = mockStore.pets.update(id, pet);
      if (!updated) throw new Error('Pet não encontrado');
      return updated;
    }
    const { data } = await api.put<Pet>(`/v1/pets/${id}`, pet);
    return data;
  },

  async uploadPhoto(id: number, file: File) {
    if (isTestAccount()) {
      const pet = mockStore.pets.getById(id);
      if (pet) {
        const url = URL.createObjectURL(file);
        mockStore.pets.update(id, { fotoUrl: url });
      }
      return {};
    }
    const formData = new FormData();
    formData.append('arquivo', file);
    const { data } = await api.post(`/v1/pets/${id}/fotos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};
