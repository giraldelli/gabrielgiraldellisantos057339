import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, PawPrint } from 'lucide-react';
import { petsService } from '../services/petsService';
import type { Pet, PaginatedResponse } from '../types';
import { Button } from '../components/Button';

export const PetsListPage: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [search, setSearch] = useState('');
  const size = 10;

  const fetchPets = async (pageNum = 0, nome?: string) => {
    setLoading(true);
    try {
      const data = await petsService.list({
        page: pageNum,
        size,
        nome: nome || undefined,
      });
      if (Array.isArray(data)) {
        setPets(data);
        setTotalPages(1);
        setTotalElements(data.length);
      } else {
        const paginated = data as PaginatedResponse<Pet>;
        const list = paginated.content ?? [];
        setPets(list);
        setTotalPages(paginated.totalPages ?? 1);
        setTotalElements(paginated.totalElements ?? list.length);
      }
    } catch {
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets(page, search || undefined);
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchPets(0, search || undefined);
  };

  return (
    <div className="max-w-6xl mx-auto w-full animate-fade-in-up">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Pets</h1>
          <p className="text-slate-500">Encontre e gerencie seus companheiros.</p>
        </div>
        <Link to="/pets/novo">
          <Button>
            <Plus className="w-5 h-5" /> Novo Pet
          </Button>
        </Link>
      </header>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600"
          >
            Buscar
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : pets.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
          <PawPrint className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">Nenhum pet encontrado.</p>
          <Link to="/pets/novo">
            <Button>Adicionar primeiro pet</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <Link
                key={pet.id ?? pet.nome}
                to={`/pets/${pet.id}`}
                className="bg-white rounded-3xl p-6 shadow-xl shadow-sky-100 border border-slate-100 overflow-hidden hover:-translate-y-1 transition-transform duration-300 block"
              >
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-sky-100 overflow-hidden shrink-0 flex items-center justify-center">
                    {pet.fotoUrl ? (
                      <img
                        src={pet.fotoUrl}
                        alt={pet.nome}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <PawPrint className="w-10 h-10 text-sky-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-bold text-slate-800 truncate">{pet.nome}</h3>
                    <p className="text-sm text-slate-500 capitalize">{pet.especie}</p>
                    {pet.idade != null && (
                      <p className="text-sm text-slate-500">{pet.idade} ano(s)</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant="secondary"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              >
                Anterior
              </Button>
              <span className="flex items-center px-4 text-slate-600">
                Página {page + 1} de {totalPages}
              </span>
              <Button
                variant="secondary"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                Próxima
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
