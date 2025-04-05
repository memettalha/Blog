import db from '../database/index.js';
const Comment = {
    async getAll({ post, commenter } = {}) {
        let query = db('comments').select('*');
        if (post) {
            query = query.where('post_id', post);
        }
        if (commenter) {
            query = query.where('commenter_name', commenter);
        }
        return query;
    },
    async getById(id) {
        return db('comments').where('id', id).first();
    },
    async create(data) {
        const [comment] = await db('comments')
            .insert({
            ...data,
            created_at: new Date(),
            updated_at: new Date()
        })
            .returning('*');
        return comment;
    },
    async update(id, data) {
        const [comment] = await db('comments')
            .where('id', id)
            .update({
            ...data,
            updated_at: new Date()
        })
            .returning('*');
        return comment;
    },
    async delete(id) {
        const [comment] = await db('comments')
            .where('id', id)
            .update({
            deleted_at: new Date(),
            updated_at: new Date()
        })
            .returning('*');
        return comment;
    }
};
export default Comment;
