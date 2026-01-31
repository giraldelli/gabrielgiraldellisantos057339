import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, Mail, Lock, ArrowRight, CreditCard } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../contexts/AuthContext';
import { tutoresService } from '../services/tutoresService';
import { maskPhone, maskCpf } from '../hooks/useMasks';

export const RegisterTutorPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    endereco: '',
    email: '',
    senha: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'telefone') {
      setFormData((p) => ({ ...p, [name]: maskPhone(value) }));
    } else if (name === 'cpf') {
      setFormData((p) => ({ ...p, [name]: maskCpf(value) }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await tutoresService.create({
        nome: formData.nome,
        cpf: formData.cpf,
        telefone: formData.telefone,
        endereco: formData.endereco,
        email: formData.email,
      });
      if (formData.email && formData.senha) {
        await login(formData.email, formData.senha);
      }
      navigate('/pets', { replace: true });
    } catch (err: unknown) {
      const data = (err as { response?: { data?: unknown } })?.response?.data;
      const msg =
        (data as Record<string, unknown>)?.message ??
        (Array.isArray((data as Record<string, unknown>)?.erros)
          ? (data as Record<string, unknown>).erros?.join(', ')
          : null);
      setError(String(msg || 'Erro ao cadastrar. Verifique os dados e tente novamente.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Cadastre-se como Tutor</h2>
        <p className="text-slate-500">Preencha seus dados para criar sua conta.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}
        <Input
          name="nome"
          label="Nome Completo"
          placeholder="Ex: João da Silva"
          icon={User}
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <Input
          name="cpf"
          label="CPF"
          placeholder="000.000.000-00"
          icon={CreditCard}
          value={formData.cpf}
          onChange={handleChange}
          required
        />
        <Input
          name="telefone"
          label="Telefone"
          type="tel"
          placeholder="(11) 99999-9999"
          icon={Phone}
          value={formData.telefone}
          onChange={handleChange}
          required
        />
        <Input
          name="endereco"
          label="Endereço"
          placeholder="Rua, número, bairro, cidade"
          icon={MapPin}
          value={formData.endereco}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="seu@email.com"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          name="senha"
          label="Senha"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={formData.senha}
          onChange={handleChange}
          required
        />

        <Button type="submit" isLoading={loading}>
          Cadastrar <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-slate-600">
          Já tem uma conta?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-sky-600 font-bold hover:text-sky-700 transition-colors"
          >
            Fazer Login
          </button>
        </p>
      </div>
    </div>
  );
};
