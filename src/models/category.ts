import db from '../database/index.js'

interface Category {
    id: number;
    name: string;
    description?: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

interface CreateCategoryDTO {
    name: string;
    description?: string;
}

interface UpdateCategoryDTO {
    name?: string;
    description?: string;
}

const Category = {
    async getAll(showDeleted = false, onlyDeleted = false) {
        let query = db('categories').select('*');
        
        if (!showDeleted) {
            query = query.whereNull('deleted_at');
        } else if (onlyDeleted) {
            query = query.whereNotNull('deleted_at');
        }
        
        return await query;
    },

    async getById(id: number) {
        const categories = await db('categories')
            .select('*')
            .where('id', id)
            .whereNull('deleted_at');
        return categories[0];
    },

    async create(data: CreateCategoryDTO) {
        const [category] = await db('categories')
            .insert(data)
            .returning('*');
        return category;
    },

    async update(id: number, data: UpdateCategoryDTO) {
        const [category] = await db('categories')
            .where('id', id)
            .whereNull('deleted_at')
            .update(data)
            .returning('*');
        return category;
    },

    async delete(id: number) {
        const [category] = await db('categories')
            .where('id', id)
            .whereNull('deleted_at')
            .update({ deleted_at: new Date() })
            .returning('*');
        return category;
    }
};

export type { Category, CreateCategoryDTO, UpdateCategoryDTO };
export default Category