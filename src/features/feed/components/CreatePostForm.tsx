import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImagePlus, X, Send, Loader2 } from 'lucide-react';
import { usePostActions } from '../hooks/usePosts';
import clsx from 'clsx';
import toast from 'react-hot-toast';

interface FormData {
  content: string;
}

export const CreatePostForm = () => {
  const { register, handleSubmit, reset, watch, setValue } = useForm<FormData>();
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { createPost } = usePostActions();
  const content = watch('content');

  const { ref, ...rest } = register('content', {
    onChange: (e) => {
      // Auto-resize
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const onSubmit = (data: FormData) => {
    if (!data.content.trim() && images.length === 0) {
      toast.error('Escreva algo ou adicione uma imagem!');
      return;
    }

    createPost.mutate(
      { content: data.content, images },
      {
        onSuccess: () => {
          reset();
          setImages([]);
          setPreviews([]);
          if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
          }
        },
      }
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 mb-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3">
          <img
            src="https://i.pravatar.cc/150?u=current-user"
            alt="Seu avatar"
            className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-600 flex-shrink-0"
          />
          <div className="flex-1">
            <textarea
              {...rest}
              ref={(e) => {
                ref(e);
                textareaRef.current = e;
              }}
              placeholder="O que está acontecendo no bairro?"
              className="w-full bg-transparent border-none resize-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 text-lg min-h-[48px] py-2 px-0"
              rows={1}
              disabled={createPost.isPending}
            />

            {previews.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2 mt-2">
                {previews.map((url, index) => (
                  <div key={index} className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden group">
                    <img src={url} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <label className="cursor-pointer text-slate-500 hover:text-sky-500 dark:text-slate-400 dark:hover:text-sky-400 transition-colors p-2 rounded-full hover:bg-sky-50 dark:hover:bg-sky-900/20">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={createPost.isPending}
                  />
                  <ImagePlus size={20} />
                </label>
              </div>

              <button
                type="submit"
                disabled={(!content?.trim() && images.length === 0) || createPost.isPending}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all",
                  (!content?.trim() && images.length === 0) || createPost.isPending
                    ? "bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500 cursor-not-allowed"
                    : "bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:shadow-lg"
                )}
              >
                {createPost.isPending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Publicando...
                  </>
                ) : (
                  <>
                    Publicar <Send size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
