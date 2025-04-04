import db from '../database/index.js'

export interface Category {
    id: number;
    name: string;
    description?: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

export interface CreateCategoryDTO {
    name: string;
    description?: string;
}

export interface UpdateCategoryDTO {
    name?: string;
    description?: string;
}

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

    async getById(id: number) {
        return db('categories').where('id', id).first();
    },

    async create(data: CreateCategoryDTO) {
        const [category] = await db('categories')
            .insert({
                ...data,
                created_at: new Date(),
                updated_at: new Date()
            })
            .returning('*');
        return category;
    },

    async update(id: number, data: UpdateCategoryDTO) {
        const [category] = await db('categories')
            .where('id', id)
            .update({
                ...data,
                updated_at: new Date()
            })
            .returning('*');
        return category;
    },

    async delete(id: number) {
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

export default Category