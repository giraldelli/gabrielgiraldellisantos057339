import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, User, PawPrint } from 'lucide-react';
import { petsService } from '../services/petsService';
import { tutoresService } from '../services/tutoresService';
import type { Pet, Tutor } from '../types';

export const PetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const petData = await petsService.getById(Number(id));
        setPet(petData);
        if (petData.tutorId) {
          const tutorData = await tutoresService.getById(petData.tutorId);
          setTutor(tutorData);
        }
      } catch {
        setPet(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 mb-4">Pet não encontrado.</p>
        <Link to="/pets" className="text-sky-600 font-medium hover:underline">
          Voltar para listagem
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full animate-fade-in-up">
      <Link
        to="/pets"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-sky-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>

      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-sky-100 border border-slate-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-32 h-32 rounded-2xl bg-sky-100 overflow-hidden shrink-0 flex items-center justify-center">
            {pet.fotoUrl ? (
              <img src={pet.fotoUrl} alt={pet.nome} className="w-full h-full object-cover" />
            ) : (
              <PawPrint className="w-16 h-16 text-sky-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl font-bold text-sky-600 mb-2">{pet.nome}</h1>
            <div className="flex flex-wrap gap-2 text-slate-600">
              <span className="capitalize font-medium">{pet.especie}</span>
              {pet.raca && <span>• {pet.raca}</span>}
              {pet.idade != null && <span>• {pet.idade} ano(s)</span>}
            </div>
          </div>
        </div>

        {tutor && (
          <div className="mt-8 pt-8 border-t border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-sky-500" /> Tutor
            </h2>
            <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
              <p className="font-semibold text-slate-800">{tutor.nome ?? tutor.nomeCompleto}</p>
              <a
                href={`tel:${tutor.telefone}`}
                className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 mt-2"
              >
                <Phone className="w-4 h-4" /> {tutor.telefone}
              </a>
              {tutor.endereco && (
                <p className="text-slate-600 text-sm mt-1">{tutor.endereco}</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-6">
          <Link
            to={`/pets/${pet.id}/editar`}
            className="inline-flex items-center px-4 py-2 bg-sky-500 text-white rounded-xl font-medium hover:bg-sky-600 transition-colors"
          >
            Editar Pet
          </Link>
        </div>
      </div>
    </div>
  );
};
