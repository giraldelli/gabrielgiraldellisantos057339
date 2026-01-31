import React from 'react';
import { LogOut, Plus, Heart, Sparkles } from 'lucide-react';
import { ViewState } from '../types';

interface DashboardProps {
  setViewState: (view: ViewState) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setViewState }) => {
  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in-up">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Olá, Ana! 👋</h1>
          <p className="text-slate-500">Aqui estão seus companheiros.</p>
        </div>
        <button 
          onClick={() => setViewState(ViewState.LOGIN)}
          className="text-slate-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mock Pet Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-sky-100 border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100 rounded-full -mr-16 -mt-16 group-hover:bg-sky-200 transition-colors"></div>
          
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-20 h-20 rounded-2xl bg-sky-200 overflow-hidden shrink-0">
               <img src="https://picsum.photos/200/200" alt="Pet" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-slate-800">Rex</h3>
                <span className="bg-sky-100 text-sky-700 text-xs px-2 py-0.5 rounded-full font-bold">Cachorro</span>
              </div>
              <p className="text-sm text-slate-500 mb-3">Golden Retriever • 2 anos</p>
              
            </div>
          </div>
          
          <div className="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
             <div className="flex items-center gap-2 text-sky-600 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Bio gerada por IA</span>
             </div>
             <p className="text-slate-600 text-sm italic">
               "Sou um especialista em caçar bolinhas perdidas e mestre na arte de pedir carinho na barriga. Prometo latir para o carteiro, mas só para dizer oi!"
             </p>
          </div>
        </div>

        {/* Add New Card */}
        <button className="border-2 border-dashed border-slate-300 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-sky-400 hover:text-sky-500 hover:bg-sky-50 transition-all duration-300 min-h-[280px]">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-sky-100 transition-colors">
            <Plus className="w-8 h-8" />
          </div>
          <span className="font-semibold">Adicionar novo pet</span>
        </button>
      </div>
    </div>
  );
};