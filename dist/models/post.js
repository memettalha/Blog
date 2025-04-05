import db from '../database/index.js';
const Post = {
    async getAll({ category, status = 'all', showDeleted = false, onlyDeleted = false } = {}) {
        let query = db('posts').select('*');
        if (category) {
            query = query.where('category_id', category);
        }
        if (status !== 'all') {
            query = query.where('published_at', status === 'published' ? 'is not null' : 'is null');
        }
        if (!showDeleted) {
            query = query.whereNull('deleted_at');
        }
        if (onlyDeleted) {
            query = query.whereNotNull('deleted_at');
        }
        return query;
    },
    async getById(id) {
        return db('posts').where('id', id).first();
    },
    async create(data) {
        const [post] = await db('posts')
            .insert({
            ...data,
            created_at: new Date(),
            updated_at: new Date()
        })
            .returning('*');
        return post;
    },
    async update(id, data) {
        const [post] = await db('posts')
            .where('id', id)
            .update({
            ...data,
            updated_at: new Date()
        })
            .returning('*');
        return post;
    },
    async delete(id) {
        const [post] = await db('posts')
            .where('id', id)
            .update({
            deleted_at: new Date(),
            updated_at: new Date()
        })
            .returning('*');
        return post;
    }
};
export default Post;
