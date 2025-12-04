import React, { useState } from 'react';
import { PostType, AlertType } from '../types';
import { X, Store, HeartHandshake, AlertTriangle, PawPrint, Camera } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

/* --- Shared Modal Shell --- */
interface ModalProps {
  title: string;
  subtitle: string;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, subtitle, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Content */}
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl p-6 md:p-8 transform transition-all animate-fadeIn max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-slate-800">
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        )}
        <h2 className="text-2xl font-heading font-bold text-primary dark:text-primary-light mb-1">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">{subtitle}</p>
        {children}
      </div>
    </div>
  );
};

/* --- Login Modal --- */
interface LoginModalProps {
  onLogin: (name: string) => void;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim().length < 3) return; 
    onLogin(name.trim());
  };

  return (
    <Modal 
      title="Bem-vindo!" 
      subtitle="Identifique-se para participar da comunidade."
      onClose={onClose}
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Seu Nome</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Ex: Maria Silva"
            className="w-full px-5 py-4 bg-gray-100 dark:bg-slate-800 rounded-xl border-2 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-primary dark:focus:border-primary-light outline-none transition-all text-gray-800 dark:text-white"
            autoFocus
          />
        </div>
        <button 
          onClick={handleSubmit}
          className="w-full py-4 bg-primary dark:bg-primary-dark text-white rounded-xl font-bold shadow-lg hover:bg-primary-light dark:hover:bg-primary transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          disabled={name.trim().length < 3}
        >
          Entrar na Comunidade
        </button>
      </div>
    </Modal>
  );
};

/* --- Zod Schemas --- */
const postSchema = z.object({
  title: z.string().min(5, 'O título deve ter pelo menos 5 caracteres').max(50),
  description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres').max(200),
  category: z.enum(['comercio', 'autonomo', 'promocao'])
});

const alertSchema = z.object({
  title: z.string().min(5, 'O título deve ter pelo menos 5 caracteres').max(50),
  description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres').max(200),
  type: z.enum(['ajuda', 'pet', 'seguranca'])
});

type PostFormData = z.infer<typeof postSchema>;
type AlertFormData = z.infer<typeof alertSchema>;

/* --- Create Post/Alert Modal --- */
interface CreatePostModalProps {
  onClose: () => void;
  onSubmitPost: (title: string, desc: string, type: PostType) => void;
  onSubmitAlert: (title: string, desc: string, type: AlertType, image?: string) => void;
  initialMode?: 'post' | 'alert';
  initialAlertType?: AlertType;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ 
  onClose, 
  onSubmitPost, 
  onSubmitAlert, 
  initialMode = 'post',
  initialAlertType = 'ajuda'
}) => {
  const [mode, setMode] = useState<'post' | 'alert'>(initialMode);
  const [hasImage, setHasImage] = useState(false);
  
  // React Hook Form
  const { register: registerPost, handleSubmit: handleSubmitPost, formState: { errors: errorsPost }, reset: resetPost } = useForm<PostFormData>({
      resolver: zodResolver(postSchema),
      defaultValues: { category: 'comercio' }
  });

  const { register: registerAlert, handleSubmit: handleSubmitAlert, formState: { errors: errorsAlert }, setValue: setAlertValue, watch: watchAlert } = useForm<AlertFormData>({
      resolver: zodResolver(alertSchema),
      defaultValues: { type: initialAlertType }
  });

  const alertType = watchAlert('type');

  const onPostSubmit = (data: PostFormData) => {
      onSubmitPost(data.title, data.description, data.category as PostType);
      resetPost();
  };

  const onAlertSubmit = (data: AlertFormData) => {
      const mockImage = hasImage ? "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" : undefined;
      onSubmitAlert(data.title, data.description, data.type as AlertType, mockImage);
  };

  return (
    <Modal 
      title="Nova Publicação" 
      subtitle="Escolha o tipo de publicação que deseja fazer."
      onClose={onClose}
    >
        {/* Tabs */}
        <div className="flex p-1.5 bg-gray-100 dark:bg-slate-800 rounded-xl mb-8">
            <button 
                className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === 'post' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setMode('post')}
            >
                <Store size={18} /> Anúncio
            </button>
            <button 
                className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === 'alert' ? 'bg-white dark:bg-slate-700 shadow-sm text-rose-500 dark:text-rose-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setMode('alert')}
            >
                <HeartHandshake size={18} /> Solidariedade
            </button>
        </div>

      <div className="space-y-5 animate-fadeIn">
        {mode === 'post' ? (
            <form id="postForm" onSubmit={handleSubmitPost(onPostSubmit)} className="space-y-5">
                <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Categoria</label>
                <select 
                    {...registerPost('category')}
                    className="w-full px-5 py-4 bg-gray-100 dark:bg-slate-800 rounded-xl border-2 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-primary dark:focus:border-primary-light outline-none transition-all appearance-none cursor-pointer text-gray-800 dark:text-white"
                >
                    <option value="comercio">Comércio Local</option>
                    <option value="autonomo">Profissional Autônomo</option>
                    <option value="promocao">Promoção / Oferta</option>
                </select>
                </div>
                
                <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Título do Anúncio</label>
                <input 
                    type="text" 
                    {...registerPost('title')}
                    placeholder="Ex: Vendo Bolos Caseiros"
                    className={`w-full px-5 py-4 bg-gray-100 dark:bg-slate-800 rounded-xl border-2 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-gray-800 dark:text-white ${errorsPost.title ? 'border-red-500' : 'border-transparent focus:border-primary dark:focus:border-primary-light'}`}
                />
                {errorsPost.title && <p className="text-red-500 text-xs mt-1">{errorsPost.title.message}</p>}
                </div>

                <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Descrição</label>
                <textarea 
                    {...registerPost('description')}
                    placeholder="Detalhes do serviço ou produto..."
                    rows={3}
                    className={`w-full px-5 py-4 bg-gray-100 dark:bg-slate-800 rounded-xl border-2 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all resize-none text-gray-800 dark:text-white ${errorsPost.description ? 'border-red-500' : 'border-transparent focus:border-primary dark:focus:border-primary-light'}`}
                />
                {errorsPost.description && <p className="text-red-500 text-xs mt-1">{errorsPost.description.message}</p>}
                </div>
            </form>
        ) : (
            <form id="alertForm" onSubmit={handleSubmitAlert(onAlertSubmit)} className="space-y-5">
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tipo de Alerta</label>
                    <div className="grid grid-cols-3 gap-3">
                        {['ajuda', 'pet', 'seguranca'].map((t) => (
                            <button
                                key={t}
                                type="button"
                                className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 text-xs font-bold transition-all capitalize ${alertType === t
                                    ? (t === 'ajuda' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                                      : t === 'pet' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400'
                                      : 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400')
                                    : 'border-transparent bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400'}`}
                                onClick={() => setAlertValue('type', t as any)}
                            >
                                {t === 'ajuda' && <HeartHandshake size={24} />}
                                {t === 'pet' && <PawPrint size={24} />}
                                {t === 'seguranca' && <AlertTriangle size={24} />}
                                {t === 'seguranca' ? 'Segurança' : t === 'pet' ? 'Pet Perdido' : 'Pedido de Ajuda'}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Título do Alerta</label>
                <input 
                    type="text" 
                    {...registerAlert('title')}
                    placeholder={alertType === 'pet' ? "Ex: Cachorro perdido no centro" : "Ex: Preciso de ajuda para..."}
                    className={`w-full px-5 py-4 bg-gray-100 dark:bg-slate-800 rounded-xl border-2 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-gray-800 dark:text-white ${errorsAlert.title ? 'border-red-500' : 'border-transparent focus:border-primary dark:focus:border-primary-light'}`}
                />
                {errorsAlert.title && <p className="text-red-500 text-xs mt-1">{errorsAlert.title.message}</p>}
                </div>

                {alertType === 'pet' && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${hasImage ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-gray-200 dark:bg-slate-700 text-gray-400'}`}>
                            <Camera size={24} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Adicionar Foto</p>
                            <p className="text-xs text-gray-400">Ajuda a identificar o animal</p>
                        </div>
                        <button 
                            type="button"
                            onClick={() => setHasImage(!hasImage)}
                            className={`text-xs font-bold px-4 py-2 rounded-full transition-colors ${hasImage ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-primary dark:bg-primary-dark text-white'}`}
                        >
                            {hasImage ? 'Remover' : 'Adicionar'}
                        </button>
                    </div>
                )}

                <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Detalhes</label>
                <textarea 
                    {...registerAlert('description')}
                    placeholder="Descreva a situação, local e como entrar em contato..."
                    rows={3}
                    className={`w-full px-5 py-4 bg-gray-100 dark:bg-slate-800 rounded-xl border-2 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all resize-none text-gray-800 dark:text-white ${errorsAlert.description ? 'border-red-500' : 'border-transparent focus:border-primary dark:focus:border-primary-light'}`}
                />
                {errorsAlert.description && <p className="text-red-500 text-xs mt-1">{errorsAlert.description.message}</p>}
                </div>
            </form>
        )}

        <div className="flex gap-4 pt-6 border-t border-gray-100 dark:border-slate-800">
          <button 
            onClick={onClose}
            className="flex-1 py-3.5 bg-white dark:bg-transparent border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
          >
            Cancelar
          </button>
          <button 
            form={mode === 'post' ? 'postForm' : 'alertForm'}
            type="submit"
            className={`flex-1 py-3.5 rounded-xl font-bold shadow-lg transition-all ${mode === 'post' ? 'bg-primary dark:bg-primary-dark hover:bg-primary-light text-white' : 'bg-rose-500 dark:bg-rose-600 hover:bg-rose-600 text-white'}`}
          >
            {mode === 'post' ? 'Publicar Anúncio' : 'Publicar Alerta'}
          </button>
        </div>
      </div>
    </Modal>
  );
};