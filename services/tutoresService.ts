import api from './api';
import { isTestAccount } from '../utils/testMode';
import { mockStore } from './mockStore';
import type { Tutor, Pet } from '../types';

export const tutoresService = {
  async list(params?: { page?: number; size?: number }) {
    if (isTestAccount()) {
      const list = mockStore.tutores.list();
      const page = params?.page ?? 0;
      const size = params?.size ?? 10;
      const start = page * size;
      const content = list.slice(start, start + size);
      return {
        content,
        totalElements: list.length,
        totalPages: Math.max(1, Math.ceil(list.length / size)),
        size,
        number: page,
      };
    }
    const { data } = await api.get<Tutor[] | { content: Tutor[]; totalPages: number }>('/v1/tutores', {
      params: { page: params?.page ?? 0, size: params?.size ?? 10 },
    });
    return data;
  },

  async getById(id: number) {
    if (isTestAccount()) {
      const tutor = mockStore.tutores.getById(id);
      if (!tutor) throw new Error('Tutor não encontrado');
      return tutor;
    }
    const { data } = await api.get<Tutor>(`/v1/tutores/${id}`);
    return data;
  },

  async create(tutor: Omit<Tutor, 'id'>) {
    if (isTestAccount()) {
      return mockStore.tutores.create(tutor as Tutor);
    }
    const cpfDigits = tutor.cpf?.replace(/\D/g, '') ?? '';
    const payload = {
      nome: tutor.nome ?? tutor.nomeCompleto,
      email: tutor.email,
      telefone: tutor.telefone,
      endereco: tutor.endereco,
      cpf: cpfDigits ? Number(cpfDigits) : undefined,
    };
    const { data } = await api.post<Tutor>('/v1/tutores', payload);
    return data;
  },

  async update(id: number, tutor: Partial<Tutor>) {
    if (isTestAccount()) {
      const updated = mockStore.tutores.update(id, tutor);
      if (!updated) throw new Error('Tutor não encontrado');
      return updated;
    }
    const { data } = await api.put<Tutor>(`/v1/tutores/${id}`, tutor);
    return data;
  },

  async uploadPhoto(id: number, file: File) {
    if (isTestAccount()) {
      const tutor = mockStore.tutores.getById(id);
      if (tutor) {
        const url = URL.createObjectURL(file);
        mockStore.tutores.update(id, { fotoUrl: url });
      }
      return {};
    }
    const formData = new FormData();
    formData.append('arquivo', file);
    const { data } = await api.post(`/v1/tutores/${id}/fotos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async vincularPet(tutorId: number, petId: number) {
    if (isTestAccount()) {
      const pet = mockStore.pets.getById(petId);
      if (pet) mockStore.pets.update(petId, { tutorId });
      return {};
    }
    const { data } = await api.post(`/v1/tutores/${tutorId}/pets/${petId}`);
    return data;
  },

  async removerPet(tutorId: number, petId: number) {
    if (isTestAccount()) {
      const pet = mockStore.pets.getById(petId);
      if (pet) mockStore.pets.update(petId, { tutorId: undefined });
      return;
    }
    await api.delete(`/v1/tutores/${tutorId}/pets/${petId}`);
  },
};
