import db from '../database/index.js';
const Category = {
    async getAll(showDeleted = false, onlyDeleted = false) {
        let query = db('categories').select('*');
        if (!showDeleted) {
            query = query.whereNull('deleted_at');
        }
        if (onlyDeleted) {
            query = query.whereNotNull('deleted_at');
        }
        return query;
    },
    async getById(id) {
        return db('categories').where('id', id).first();
    },
    async create(data) {
        const [category] = await db('categories')
            .insert({
            ...data,
            created_at: new Date(),
            updated_at: new Date()
        })
            .returning('*');
        return category;
    },
    async update(id, data) {
        const [category] = await db('categories')
            .where('id', id)
            .update({
            ...data,
            updated_at: new Date()
        })
            .returning('*');
        return category;
    },
    async delete(id) {
        const [category] = await db('categories')
            .where('id', id)
            .update({
            deleted_at: new Date(),
            updated_at: new Date()
        })
            .returning('*');
        return category;
    }
};
export default Category;
