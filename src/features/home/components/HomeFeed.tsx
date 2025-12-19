import React from 'react';
import { CreatePostForm } from '../../feed/components/CreatePostForm';
import { PostList } from '../../feed/components/PostList';

export const HomeFeed = () => {
    return (
        <div className="max-w-2xl mx-auto pb-20">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Feed do Bairro</h2>

            <CreatePostForm />

            <div className="mt-6">
                <PostList />
            </div>
        </div>
    );
};
