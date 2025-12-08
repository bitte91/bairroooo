import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBusinessStore } from '../../../application/stores/useBusinessStore';
import { BusinessCategory } from '../../../domain/types';
import { ArrowLeft, Send } from 'lucide-react';

const BusinessForm: React.FC = () => {
  const navigate = useNavigate();
  const { addBusiness } = useBusinessStore();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    category: 'mercado' as BusinessCategory,
    address: '',
    phone: '',
    openingHours: '',
    description: '',
    isOwner: false,
    bairro: 'Centro' // Default value
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addBusiness({
        name: form.name,
        category: form.category,
        address: form.address,
        bairro: form.bairro,
        phone: form.phone,
        openingHours: form.openingHours,
        description: form.description,
        isOwner: form.isOwner,
        // Optional fields that we're not collecting in this simple form
        isVerified: false,
        isSafetyPartner: false
      });

      alert('Cadastro enviado com sucesso! Vamos analisar e publicar em breve.');
      navigate('/comercios');
    } catch (error) {
      alert('Erro ao enviar cadastro. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm p-4 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Cadastrar Comércio</h1>
      </header>

      <main className="p-4 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do comércio*
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="Ex: Mercearia da Maria"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria*
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
            >
              <option value="mercado">Mercado</option>
              <option value="padaria">Padaria</option>
              <option value="restaurante">Restaurante</option>
              <option value="salao">Salão de Beleza</option>
              <option value="farmacia">Farmácia</option>
              <option value="pet">Pet Shop</option>
              <option value="servico">Serviços</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Endereço aproximado (rua + bairro)*
            </label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="Ex.: Rua das Flores, Vila São José"
            />
            <p className="text-xs text-gray-500 mt-1">Não precisa informar o número.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp ou telefone*
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="Ex.: (12) 98765-4321"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Horário de funcionamento
            </label>
            <input
              name="openingHours"
              value={form.openingHours}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              placeholder="Ex.: Seg a Sáb, 8h às 18h"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição rápida
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              maxLength={200}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
              placeholder="Fale um pouco sobre o comércio..."
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              {form.description.length}/200
            </div>
          </div>

          <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              name="isOwner"
              checked={form.isOwner}
              onChange={handleChange}
              className="w-5 h-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">Sou responsável por este comércio</span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-primary-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" />
                Enviar cadastro
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default BusinessForm;
