import type { Pet, Tutor } from '../types';

let mockPets: Pet[] = [
  { id: 1, nome: 'Rex', especie: 'CACHORRO', idade: 3, raca: 'Golden Retriever' },
  { id: 2, nome: 'Luna', especie: 'GATO', idade: 2, raca: 'Siamês' },
];

let mockTutores: Tutor[] = [
  {
    id: 1,
    nome: 'Usuário Teste',
    telefone: '(11) 99999-9999',
    endereco: 'Endereço de exemplo',
  },
];

let nextPetId = 3;
let nextTutorId = 2;

export const mockStore = {
  pets: {
    list: () => [...mockPets],
    getById: (id: number) => mockPets.find((p) => p.id === id),
    create: (pet: Omit<Pet, 'id'>) => {
      const newPet: Pet = { ...pet, id: nextPetId++ };
      mockPets.push(newPet);
      return newPet;
    },
    update: (id: number, data: Partial<Pet>) => {
      const idx = mockPets.findIndex((p) => p.id === id);
      if (idx >= 0) {
        mockPets[idx] = { ...mockPets[idx], ...data };
        return mockPets[idx];
      }
      return null;
    },
  },
  tutores: {
    list: () => [...mockTutores],
    getById: (id: number) => {
      const t = mockTutores.find((t) => t.id === id);
      if (t) {
        return { ...t, pets: mockPets.filter((p) => p.tutorId === id) };
      }
      return undefined;
    },
    create: (tutor: Omit<Tutor, 'id'>) => {
      const newTutor: Tutor = { ...tutor, id: nextTutorId++ };
      mockTutores.push(newTutor);
      return newTutor;
    },
    update: (id: number, data: Partial<Tutor>) => {
      const idx = mockTutores.findIndex((t) => t.id === id);
      if (idx >= 0) {
        mockTutores[idx] = { ...mockTutores[idx], ...data };
        return mockTutores[idx];
      }
      return null;
    },
  },
};
