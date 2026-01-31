import React, { useState } from 'react';
import { User, Mail, Lock, Sparkles, Dog, Cat, PawPrint, Bird, ArrowLeft } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { ViewState } from '../types';
import { generatePetBio } from '../services/geminiService';

interface RegisterFormProps {
  setViewState: (view: ViewState) => void;
  onLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ setViewState, onLogin }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    password: '',
    petName: '',
    petSpecies: 'dog',
    petBreed: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate registration & generate AI bio
    try {
      const bio = await generatePetBio(formData.petName, formData.petSpecies, formData.petBreed);
      console.log("Bio gerada:", bio);
      // In a real app, we would send this to the backend
      setTimeout(() => {
        setLoading(false);
        onLogin();
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      {/* Progress Bar */}
      <div className="flex items-center mb-8 bg-slate-100 rounded-full p-1">
        <div 
          className={`flex-1 py-2 text-center rounded-full text-sm font-semibold transition-all duration-300 ${step === 1 ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-400'}`}
        >
          1. Tutor
        </div>
        <div 
          className={`flex-1 py-2 text-center rounded-full text-sm font-semibold transition-all duration-300 ${step === 2 ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-400'}`}
        >
          2. Pet
        </div>
      </div>

      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          {step === 1 ? 'Crie sua conta' : 'Adicione seu Pet'}
        </h2>
        <p className="text-slate-500">
          {step === 1 ? 'Comece registrando seus dados de acesso.' : 'Conte-nos um pouco sobre seu companheiro.'}
        </p>
      </div>

      <form onSubmit={step === 1 ? handleNextStep : handleRegister}>
        {step === 1 ? (
          <div className="space-y-4">
            <Input 
              name="ownerName"
              label="Seu Nome Completo" 
              placeholder="Ex: Ana Silva" 
              icon={User} 
              value={formData.ownerName}
              onChange={handleInputChange}
              required
            />
            <Input 
              name="email"
              label="Email" 
              type="email" 
              placeholder="seu@email.com" 
              icon={Mail} 
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Input 
              name="password"
              label="Senha" 
              type="password" 
              placeholder="••••••••" 
              icon={Lock} 
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <Button type="submit">
              Continuar <PawPrint className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Input 
              name="petName"
              label="Nome do Pet" 
              placeholder="Ex: Rex, Luna..." 
              icon={Sparkles} 
              value={formData.petName}
              onChange={handleInputChange}
              required
            />
            <Select 
              name="petSpecies"
              label="Espécie"
              icon={formData.petSpecies === 'dog' ? Dog : formData.petSpecies === 'cat' ? Cat : formData.petSpecies === 'bird' ? Bird : PawPrint}
              value={formData.petSpecies}
              onChange={handleInputChange}
              options={[
                { value: 'dog', label: 'Cachorro' },
                { value: 'cat', label: 'Gato' },
                { value: 'bird', label: 'Pássaro' },
                { value: 'other', label: 'Outro' },
              ]}
            />
            <Input 
              name="petBreed"
              label="Raça (Opcional)" 
              placeholder="Ex: Vira-lata, Persa..." 
              value={formData.petBreed}
              onChange={handleInputChange}
            />

            <div className="bg-sky-50 p-4 rounded-xl border border-sky-100 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
              <p className="text-sm text-sky-700">
                A nossa <strong>Inteligência Artificial</strong> irá criar uma biografia única para o {formData.petName || 'seu pet'} assim que você finalizar!
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => setStep(1)}
                className="w-1/3"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button type="submit" isLoading={loading} className="w-2/3">
                Finalizar Cadastro
              </Button>
            </div>
          </div>
        )}
      </form>

      <div className="mt-8 text-center">
        <p className="text-slate-600">
          Já tem uma conta?{' '}
          <button 
            onClick={() => setViewState(ViewState.LOGIN)}
            className="text-sky-600 font-bold hover:text-sky-700 transition-colors"
          >
            Fazer Login
          </button>
        </p>
      </div>
    </div>
  );
};