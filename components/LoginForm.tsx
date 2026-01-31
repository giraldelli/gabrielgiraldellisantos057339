import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { ViewState } from '../types';

interface LoginFormProps {
  setViewState: (view: ViewState) => void;
  onLogin: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ setViewState, onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Bem-vindo de volta!</h2>
        <p className="text-slate-500">Acesse sua conta para ver seus pets.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Input 
          label="Email" 
          type="email" 
          placeholder="seu@email.com" 
          icon={Mail} 
          required
        />
        <Input 
          label="Senha" 
          type="password" 
          placeholder="••••••••" 
          icon={Lock} 
          required
        />

        <div className="flex justify-end mb-6">
          <a href="#" className="text-sm text-sky-600 hover:text-sky-700 font-medium">
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
            onClick={() => setViewState(ViewState.REGISTER)}
            className="text-sky-600 font-bold hover:text-sky-700 inline-flex items-center gap-1 transition-colors"
          >
            Cadastre-se <ArrowRight className="w-4 h-4" />
          </button>
        </p>
      </div>
    </div>
  );
};