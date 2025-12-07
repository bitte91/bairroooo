import React from 'react';
import { Post, Alert, User } from '../../../shared/types';
import { Button } from '../../../shared/components/ui/Button';

// Mock data for now, will replace with React Query hooks later
const mockPosts: Post[] = [
    {
        id: 1,
        title: 'Promoção de Inauguração',
        desc: 'Toda a loja com 20% de desconto neste fim de semana!',
        author: 'Padaria do Zé',
        type: 'promocao',
        category: 'padaria',
        businessId: '1'
    }
];

export const HomeFeed = () => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Feed do Bairro</h2>
                <Button variant="outline" size="sm">Filtrar</Button>
            </div>

            {mockPosts.map(post => (
                <div key={post.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{post.desc}</p>
                    <div className="mt-3 flex justify-between items-center">
                        <span className="text-sm text-gray-500">{post.author}</span>
                        <Button size="sm" variant="ghost">Ver mais</Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
