import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, LogIn, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/pets', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, senha);
      navigate('/pets', { replace: true });
    } catch (err: unknown) {
      const axiosErr = err as {
        response?: {
          status?: number;
          data?: unknown;
        };
      };
      const data = axiosErr?.response?.data;
      const apiMsg =
        typeof data === 'object' && data !== null
          ? (data as Record<string, unknown>).message ??
            (data as Record<string, unknown>).error ??
            (data as Record<string, unknown>).detalhes ??
            (Array.isArray((data as Record<string, unknown>).erros)
              ? (data as Record<string, unknown>).erros?.join(', ')
              : undefined)
          : String(data);
      if (axiosErr?.response && import.meta.env.DEV) {
        console.warn('Resposta da API (erro):', axiosErr.response.status, data);
      }
      setError(
        String(apiMsg || '') ||
          (axiosErr?.response?.status === 401
            ? 'Usuário ou senha inválidos. Verifique suas credenciais ou cadastre-se primeiro.'
            : axiosErr?.response?.status === 400
              ? 'Requisição inválida. Verifique o usuário e a senha.'
              : 'Erro ao conectar. Tente novamente.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Bem-vindo de volta!</h2>
        <p className="text-slate-500">Acesse sua conta para ver seus pets.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}
        <Input
          label="Usuário"
          type="text"
          placeholder="Ex: admin"
          icon={User}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          label="Senha"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <div className="flex justify-end mb-6">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-sm text-sky-600 hover:text-sky-700 font-medium"
          >
            Esqueceu a senha?
          </a>
        </div>

        <Button type="submit" isLoading={loading}>
          Entrar <LogIn className="w-4 h-4" />
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-slate-600">
          Não tem uma conta?{' '}
          <button
            onClick={() => navigate('/cadastro-tutor')}
            className="text-sky-600 font-bold hover:text-sky-700 inline-flex items-center gap-1 transition-colors"
          >
            Cadastre-se <ArrowRight className="w-4 h-4" />
          </button>
        </p>
      </div>
    </div>
  );
};
