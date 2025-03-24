const knex = require('./knex')
const SHOW_DELETED = require('../const')

const Category = {
    getAll: (query) => {
         const {showDeleted} = query
         if(showDeleted === SHOW_DELETED.TRUE){
            return knex('categories')
         }else if(showDeleted === SHOW_DELETED.ONLY_DELETED){
            return knex('categories').whereNotNull('deleted_at')
         }else{
            return knex('categories').whereNull('deleted_at')
         }
        
    },
    getById: (id) => {
        return knex('categories').where({ id }).first()

     },
     create:(category) => {
        return knex('categories').insert(category).returning('*')
     },
     update:(id, category)=>{
        return knex('categories').where({id}).update(category).returning('*')
     },
     delete:(id,)=> {
        return knex('categories').where({id}).update({deleted_at:new Date()}).returning('*')
     }


    }
    
    module.exports = Category