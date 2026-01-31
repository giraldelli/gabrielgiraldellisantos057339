import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin, User, Plus, Trash2, PawPrint } from 'lucide-react';
import { tutoresService } from '../services/tutoresService';
import { petsService } from '../services/petsService';
import type { Tutor, Pet } from '../types';
import { Button } from '../components/Button';

export const TutorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [allPets, setAllPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [linking, setLinking] = useState(false);

  const loadTutor = async () => {
    if (!id) return;
    const data = await tutoresService.getById(Number(id));
    setTutor(data);
  };

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      try {
        await loadTutor();
        const petsData = await petsService.list({ size: 100 });
        const list = Array.isArray(petsData) ? petsData : (petsData as { content?: Pet[] }).content ?? [];
        setAllPets(list);
      } catch {
        setTutor(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const linkedPetIds = new Set((tutor?.pets ?? []).map((p) => p.id ?? p.nome));
  const availablePets = allPets.filter((p) => !linkedPetIds.has(p.id ?? p.nome));

  const handleVincular = async (petId: number) => {
    if (!id) return;
    setLinking(true);
    try {
      await tutoresService.vincularPet(Number(id), petId);
      await loadTutor();
    } finally {
      setLinking(false);
    }
  };

  const handleRemover = async (petId: number) => {
    if (!id) return;
    setLinking(true);
    try {
      await tutoresService.removerPet(Number(id), petId);
      await loadTutor();
    } finally {
      setLinking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 mb-4">Tutor não encontrado.</p>
        <Link to="/tutores" className="text-sky-600 font-medium hover:underline">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full animate-fade-in-up">
      <Link
        to="/tutores"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-sky-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>

      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-sky-100 border border-slate-100">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-32 h-32 rounded-2xl bg-sky-100 overflow-hidden shrink-0 flex items-center justify-center">
            {tutor.fotoUrl ? (
              <img src={tutor.fotoUrl} alt={tutor.nome ?? tutor.nomeCompleto} className="w-full h-full object-cover" />
            ) : (
              <User className="w-16 h-16 text-sky-400" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-800">{tutor.nome ?? tutor.nomeCompleto}</h1>
            <a href={`tel:${tutor.telefone}`} className="flex items-center gap-2 text-sky-600 hover:text-sky-700 mt-2">
              <Phone className="w-4 h-4" /> {tutor.telefone}
            </a>
            {tutor.endereco && (
              <p className="flex items-center gap-2 text-slate-600 mt-1">
                <MapPin className="w-4 h-4 shrink-0" /> {tutor.endereco}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <PawPrint className="w-5 h-5 text-sky-500" /> Pets vinculados
          </h2>

          {(tutor.pets ?? []).length === 0 ? (
            <p className="text-slate-500 text-sm">Nenhum pet vinculado.</p>
          ) : (
            <div className="space-y-2">
              {(tutor.pets ?? []).map((pet) => (
                <div
                  key={pet.id ?? pet.nome}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                >
                  <Link to={`/pets/${pet.id}`} className="font-medium text-slate-800 hover:text-sky-600">
                    {pet.nome}
                  </Link>
                  <button
                    onClick={() => pet.id && handleRemover(pet.id)}
                    disabled={linking}
                    className="text-red-500 hover:text-red-600 p-1"
                    title="Remover vínculo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {availablePets.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Vincular novo pet</label>
              <select
                className="w-full py-2 px-4 rounded-xl border border-slate-200"
                onChange={(e) => {
                  const v = e.target.value;
                  if (v) handleVincular(Number(v));
                  e.target.value = '';
                }}
                disabled={linking}
              >
                <option value="">Selecione um pet...</option>
                {availablePets.map((p) => (
                  <option key={p.id ?? p.nome} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link to={`/tutores/${tutor.id}/editar`}>
            <Button variant="secondary">Editar Tutor</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
