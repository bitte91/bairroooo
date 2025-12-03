import React, { useState } from 'react';
import { PostType, AlertType } from '../types';
import { X, Store, HeartHandshake, AlertTriangle, PawPrint, Camera } from 'lucide-react';

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
  
  // Post States
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const [postType, setPostType] = useState<PostType>('comercio');

  // Alert States
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDesc, setAlertDesc] = useState('');
  const [alertType, setAlertType] = useState<AlertType>(initialAlertType);
  const [hasImage, setHasImage] = useState(false);

  const handleSubmit = () => {
    if (mode === 'post') {
        if (!postTitle.trim() || !postDesc.trim()) return;
        onSubmitPost(postTitle.trim(), postDesc.trim(), postType);
    } else {
        if (!alertTitle.trim() || !alertDesc.trim()) return;
        const mockImage = hasImage ? "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" : undefined;
        onSubmitAlert(alertTitle.trim(), alertDesc.trim(), alertType, mockImage);
    }
  };

  const isValid = mode === 'post' 
    ? (postTitle.trim() && postDesc.trim()) 
    : (alertTitle.trim() && alertDesc.trim());

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
            <>
                <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Categoria</label>
                <select 
                    value={postType}
                    onChange={(e) => setPostType(e.target.value as PostType)}
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
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Ex: Vendo Bolos Caseiros"
                    maxLength={50}
                    className="w-full px-5 py-4 bg-gray-100 dark:bg-slate-800 rounded-xl border-2 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-primary dark:focus:border-primary-light outline-none transition-all text-gray-800 dark:text-white"
                />
                </div>

                <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Descrição</label>
                <textarea 
                    value={postDesc}
                    onChange={(e) => setPostDesc(e.target.value)}
                    placeholder="Detalhes do serviço ou produto..."
                    rows={3}
                    maxLength={140}
                    className="w-full px-5 py-4 bg-gray-100 dark:bg-slate-800 rounded-xl border-2 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-primary dark:focus:border-primary-light outline-none transition-all resize-none text-gray-800 dark:text-white"
                />
                </div>
            </>
        ) : (
            <>
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tipo de Alerta</label>
                    <div className="grid grid-cols-3 gap-3">
                        <button 
                            className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 text-xs font-bold transition-all ${alertType === 'ajuda' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400' : 'border-transparent bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400'}`}
                            onClick={() => setAlertType('ajuda')}
                        >
                            <HeartHandshake size={24} /> Pedido de Ajuda
                        </button>
                        <button 
                            className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 text-xs font-bold transition-all ${alertType === 'pet' ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400' : 'border-transparent bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400'}`}
                            onClick={() => setAlertType('pet')}
                        >
                            <PawPrint size={24} /> Pet Perdido
                        </button>
                        <button 
                            className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 text-xs font-bold transition-all ${alertType === 'seguranca' ? 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' : 'border-transparent bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400'}`}
                            onClick={() => setAlertType('seguranca')}
                        >
                            <AlertTriangle size={24} /> Segurança
                        </button>
                    </div>
                </div>

                <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Título do Alerta</label>
                <input 
                    type="text" 
                    value={alertTitle}
                    onChange={(e) => setAlertTitle(e.target.value)}
                    placeholder={alertType === 'pet' ? "Ex: Cachorro perdido no centro" : "Ex: Preciso de ajuda para..."}
                    maxLength={50}
                    className="w-full px-5 py-4 bg-gray-100 dark:bg-slate-800 rounded-xl border-2 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-primary dark:focus:border-primary-light outline-none transition-all text-gray-800 dark:text-white"
                />
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
                    value={alertDesc}
                    onChange={(e) => setAlertDesc(e.target.value)}
                    placeholder="Descreva a situação, local e como entrar em contato..."
                    rows={3}
                    maxLength={200}
                    className="w-full px-5 py-4 bg-gray-100 dark:bg-slate-800 rounded-xl border-2 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-primary dark:focus:border-primary-light outline-none transition-all resize-none text-gray-800 dark:text-white"
                />
                </div>
            </>
        )}

        <div className="flex gap-4 pt-6 border-t border-gray-100 dark:border-slate-800">
          <button 
            onClick={onClose}
            className="flex-1 py-3.5 bg-white dark:bg-transparent border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSubmit}
            className={`flex-1 py-3.5 rounded-xl font-bold shadow-lg transition-all disabled:opacity-50 ${mode === 'post' ? 'bg-primary dark:bg-primary-dark hover:bg-primary-light text-white' : 'bg-rose-500 dark:bg-rose-600 hover:bg-rose-600 text-white'}`}
            disabled={!isValid}
          >
            {mode === 'post' ? 'Publicar Anúncio' : 'Publicar Alerta'}
          </button>
        </div>
      </div>
    </Modal>
  );
};