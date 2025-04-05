import db from '../database/index.js';

interface Post {
    id: number;
    category_id: number;
    title: string;
    content: string;
    published_at?: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

interface CreatePostDTO {
    category_id: number;
    title: string;
    content: string;
}

interface UpdatePostDTO {
    title?: string;
    content?: string;
    published_at?: Date;
}

interface GetAllPostsParams {
    category?: number;
    status?: 'draft' | 'published';
    showDeleted?: boolean;
    onlyDeleted?: boolean;
}

const Post = {
    async getAll({ category, status, showDeleted = false, onlyDeleted = false }: GetAllPostsParams = {}) {
        let query = db('posts').select('*');
        
        if (category) {
            query = query.where('category_id', category);
        }
        
        if (status) {
            if (status === 'draft') {
                query = query.whereNull('published_at');
            } else if (status === 'published') {
                query = query.whereNotNull('published_at');
            }
        }
        
        if (!showDeleted) {
            query = query.whereNull('deleted_at');
        } else if (onlyDeleted) {
            query = query.whereNotNull('deleted_at');
        }
        
        return await query;
    },

    async getById(id: number) {
        const posts = await db('posts')
            .select('*')
            .where('id', id)
            .whereNull('deleted_at');
        return posts[0];
    },

    async create(data: CreatePostDTO) {
        const [post] = await db('posts')
            .insert(data)
            .returning('*');
        return post;
    },

    async update(id: number, data: UpdatePostDTO) {
        const [post] = await db('posts')
            .where('id', id)
            .whereNull('deleted_at')
            .update(data)
            .returning('*');
        return post;
    },

    async delete(id: number) {
        const [post] = await db('posts')
            .where('id', id)
            .whereNull('deleted_at')
            .update({ deleted_at: new Date() })
            .returning('*');
        return post;
    }
};

export type { Post, CreatePostDTO, UpdatePostDTO, GetAllPostsParams };
export default Post; 