import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star, X } from 'lucide-react';
import { Review } from '../types';

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(3, "O comentário deve ter pelo menos 3 caracteres").max(140)
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewModalProps {
    postId: number;
    postTitle: string;
    onClose: () => void;
    onSubmit: (data: ReviewFormData) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ postId, postTitle, onClose, onSubmit }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ReviewFormData>({
        resolver: zodResolver(reviewSchema),
        defaultValues: { rating: 0 }
    });

    const rating = watch('rating');

    const handleRating = (r: number) => {
        setValue('rating', r);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

             <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl p-6 md:p-8 transform transition-all animate-fadeIn border border-gray-100 dark:border-slate-800">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-heading font-bold text-gray-800 dark:text-white mb-2">Avaliar Serviço</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Como foi sua experiência com "{postTitle}"?</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className="transition-transform hover:scale-110 focus:outline-none"
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => handleRating(star)}
                                >
                                    <Star
                                        size={32}
                                        fill={(hoverRating || rating) >= star ? "#fbbf24" : "none"}
                                        className={(hoverRating || rating) >= star ? "text-amber-400" : "text-gray-300 dark:text-gray-600"}
                                    />
                                </button>
                            ))}
                        </div>
                        <p className="text-sm font-bold text-amber-500 h-5">
                            {(hoverRating || rating) === 1 ? 'Ruim' :
                             (hoverRating || rating) === 2 ? 'Razoável' :
                             (hoverRating || rating) === 3 ? 'Bom' :
                             (hoverRating || rating) === 4 ? 'Muito Bom' :
                             (hoverRating || rating) === 5 ? 'Excelente' : ''}
                        </p>
                        {errors.rating && <p className="text-red-500 text-xs">Por favor, selecione uma nota.</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Comentário</label>
                        <textarea
                            {...register('comment')}
                            placeholder="Conte mais sobre o serviço..."
                            rows={3}
                            className={`w-full px-5 py-4 bg-gray-100 dark:bg-slate-800 rounded-xl border-2 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all resize-none text-gray-800 dark:text-white ${errors.comment ? 'border-red-500' : 'border-transparent focus:border-primary dark:focus:border-primary-light'}`}
                        />
                         {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-primary dark:bg-primary-dark text-white rounded-xl font-bold shadow-lg hover:bg-primary-light transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={rating === 0}
                    >
                        Enviar Avaliação
                    </button>
                </form>
             </div>
        </div>
    );
};
