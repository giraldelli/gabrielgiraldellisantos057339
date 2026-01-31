import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { tutoresService } from '../services/tutoresService';
import { maskPhone } from '../hooks/useMasks';
import type { Tutor } from '../types';

export const TutorFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id && id !== 'novo';

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    endereco: '',
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      tutoresService.getById(Number(id)).then((t) => {
        setFormData({
          nome: t.nome ?? t.nomeCompleto ?? '',
          telefone: t.telefone,
          endereco: t.endereco ?? '',
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'telefone') {
      setFormData((p) => ({ ...p, [name]: maskPhone(value) }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isEdit && id) {
        const updated = await tutoresService.update(Number(id), formData);
        if (photo) await tutoresService.uploadPhoto(Number(id), photo);
        navigate(`/tutores/${updated.id ?? id}`, { replace: true });
      } else {
        const created = await tutoresService.create(formData);
        if (photo && created.id) await tutoresService.uploadPhoto(created.id, photo);
        navigate(`/tutores/${created.id}`, { replace: true });
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg || 'Erro ao salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

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
          {isEdit ? 'Editar Tutor' : 'Novo Tutor'}
        </h1>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <Input
            name="nome"
            label="Nome Completo"
            placeholder="Ex: Ana Silva"
            icon={User}
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <Input
            name="telefone"
            label="Telefone"
            type="tel"
            placeholder="(11) 99999-9999"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
          <Input
            name="endereco"
            label="Endereço"
            placeholder="Rua, número, bairro, cidade"
            value={formData.endereco}
            onChange={handleChange}
            required
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
