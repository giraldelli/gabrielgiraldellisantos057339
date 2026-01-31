import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Dog, Cat, Bird, PawPrint } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { petsService } from '../services/petsService';
import { maskAge } from '../hooks/useMasks';
import type { Pet } from '../types';

export const PetFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id && id !== 'novo';

  const [formData, setFormData] = useState({
    nome: '',
    especie: 'CACHORRO',
    idade: '',
    raca: '',
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      petsService.getById(Number(id)).then((pet) => {
        setFormData({
          nome: pet.nome,
          especie: pet.especie || 'CACHORRO',
          idade: pet.idade?.toString() ?? '',
          raca: pet.raca ?? '',
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'idade') {
      setFormData((p) => ({ ...p, [name]: maskAge(value) }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        nome: formData.nome,
        especie: formData.especie,
        idade: formData.idade ? Number(formData.idade) : undefined,
        raca: formData.raca || undefined,
      };

      if (isEdit && id) {
        const updated = await petsService.update(Number(id), payload);
        if (photo) {
          await petsService.uploadPhoto(Number(id), photo);
        }
        navigate(`/pets/${updated.id ?? id}`, { replace: true });
      } else {
        const created = await petsService.create(payload);
        if (photo && created.id) {
          await petsService.uploadPhoto(created.id, photo);
        }
        navigate(`/pets/${created.id}`, { replace: true });
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg || 'Erro ao salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const especieIcon = formData.especie === 'CACHORRO' ? Dog : formData.especie === 'GATO' ? Cat : formData.especie === 'PASSARO' ? Bird : PawPrint;

  return (
    <div className="max-w-xl mx-auto w-full animate-fade-in-up">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-slate-600 hover:text-sky-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-sky-100 border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          {isEdit ? 'Editar Pet' : 'Novo Pet'}
        </h1>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <Input
            name="nome"
            label="Nome"
            placeholder="Ex: Rex, Luna..."
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <Select
            name="especie"
            label="Espécie"
            icon={especieIcon}
            value={formData.especie}
            onChange={handleChange}
            options={[
              { value: 'CACHORRO', label: 'Cachorro' },
              { value: 'GATO', label: 'Gato' },
              { value: 'PASSARO', label: 'Pássaro' },
              { value: 'OUTRO', label: 'Outro' },
            ]}
          />
          <Input
            name="idade"
            label="Idade (anos)"
            type="text"
            inputMode="numeric"
            placeholder="Ex: 2"
            value={formData.idade}
            onChange={handleChange}
          />
          <Input
            name="raca"
            label="Raça"
            placeholder="Ex: Golden Retriever, Vira-lata..."
            value={formData.raca}
            onChange={handleChange}
          />

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Foto</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-sky-50 file:text-sky-600 file:font-medium"
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button type="submit" isLoading={loading} className="flex-1">
              {isEdit ? 'Salvar' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
