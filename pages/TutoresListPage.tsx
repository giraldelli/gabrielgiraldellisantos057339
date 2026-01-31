import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, User } from 'lucide-react';
import { tutoresService } from '../services/tutoresService';
import type { Tutor, PaginatedResponse } from '../types';
import { Button } from '../components/Button';

export const TutoresListPage: React.FC = () => {
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const size = 10;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await tutoresService.list({ page, size });
        if (Array.isArray(data)) {
          setTutores(data);
          setTotalPages(1);
        } else {
          setTutores((data as PaginatedResponse<Tutor>).content ?? []);
          setTotalPages((data as PaginatedResponse<Tutor>).totalPages ?? 1);
        }
      } catch {
        setTutores([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto w-full animate-fade-in-up">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Tutores</h1>
          <p className="text-slate-500">Gerencie os tutores cadastrados.</p>
        </div>
        <Link to="/tutores/novo">
          <Button>
            <Plus className="w-5 h-5" /> Novo Tutor
          </Button>
        </Link>
      </header>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : tutores.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
          <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">Nenhum tutor encontrado.</p>
          <Link to="/tutores/novo">
            <Button>Adicionar primeiro tutor</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutores.map((t) => (
              <Link
                key={t.id ?? t.nome ?? t.nomeCompleto}
                to={`/tutores/${t.id}`}
                className="bg-white rounded-3xl p-6 shadow-xl shadow-sky-100 border border-slate-100 overflow-hidden hover:-translate-y-1 transition-transform duration-300 block"
              >
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-sky-100 overflow-hidden shrink-0 flex items-center justify-center">
                    {t.fotoUrl ? (
                      <img src={t.fotoUrl} alt={t.nome ?? t.nomeCompleto} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-sky-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-bold text-slate-800 truncate">{t.nome ?? t.nomeCompleto}</h3>
                    <p className="text-sm text-slate-500">{t.telefone}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button variant="secondary" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>
                Anterior
              </Button>
              <span className="flex items-center px-4 text-slate-600">Página {page + 1} de {totalPages}</span>
              <Button variant="secondary" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
                Próxima
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
