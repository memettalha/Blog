import knex from '../database/index.js'
import { SHOW_DELETED } from '../const.js'

interface Category {
    getAll: (query: { showDeleted: string }) => Promise<any>;
    getById: (id: number) => Promise<any>;
    create: (category: any) => Promise<any>;
    update: (id: number, category: any) => Promise<any>;
    delete: (id: number) => Promise<any>;      
}

const Category: Category = {
    getAll: async(query) => {
        const {showDeleted} = query
        if(showDeleted === SHOW_DELETED.TRUE){
            return await knex('categories')
        }else if(showDeleted === SHOW_DELETED.ONLY_DELETED){
            return await knex('categories').whereNotNull('deleted_at')
        }else{
            return await knex('categories').whereNull('deleted_at')
        }
    },
    getById: async(id) => {
        return await knex('categories').where({ id }).first()
    },
    create: async(category) => {
        return await knex('categories').insert(category).returning('*')
    },
    update: async(id, category) => {
        return await knex('categories').where({id}).update(category).returning('*')
    },
    delete: async(id) => {
        return await knex('categories').where({id}).update({deleted_at: new Date()}).returning('*')
    }
}

export default Category