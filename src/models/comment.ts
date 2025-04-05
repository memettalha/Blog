import db from '../database/index.js';

interface Comment {
    id: number;
    post_id: number;
    content: string;
    commenter_name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

interface CreateCommentDTO {
    post_id: number;
    content: string;
    commenter_name: string;
}

interface UpdateCommentDTO {
    content?: string;
    commenter_name?: string;
}

interface GetAllCommentsParams {
    post?: number;
    commenter?: string;
    showDeleted?: boolean;
    onlyDeleted?: boolean;
}

const Comment = {
    async getAll({ post, commenter, showDeleted = false, onlyDeleted = false }: GetAllCommentsParams = {}) {
        let query = db('comments').select('*');
        
        if (post) {
            query = query.where('post_id', post);
        }
        
        if (commenter) {
            query = query.where('commenter_name', 'like', `%${commenter}%`);
        }
        
        if (!showDeleted) {
            query = query.whereNull('deleted_at');
        } else if (onlyDeleted) {
            query = query.whereNotNull('deleted_at');
        }
        
        return await query;
    },

    async getById(id: number) {
        const comments = await db('comments')
            .select('*')
            .where('id', id)
            .whereNull('deleted_at');
        return comments[0];
    },

    async create(data: CreateCommentDTO) {
        const [comment] = await db('comments')
            .insert(data)
            .returning('*');
        return comment;
    },

    async update(id: number, data: UpdateCommentDTO) {
        const [comment] = await db('comments')
            .where('id', id)
            .whereNull('deleted_at')
            .update(data)
            .returning('*');
        return comment;
    },

    async delete(id: number) {
        const [comment] = await db('comments')
            .where('id', id)
            .whereNull('deleted_at')
            .update({ deleted_at: new Date() })
            .returning('*');
        return comment;
    }
};

export type { Comment, CreateCommentDTO, UpdateCommentDTO, GetAllCommentsParams };
export default Comment; 