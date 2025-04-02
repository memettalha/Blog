import knex from 'knex'

const Comment = {
    create : (comment) => {
        return knex('comments').insert(comment).returning('*')
    },
    getAll : (query_string) => {
        const {post,commenter} = query_string
        const query =  knex('comments')
        if(post){
            query.where({post_id:post})
        }
        return query;
        if(commenter){
            query.where({commenter_name:commenter})
        }
    },
    getById : (id) =>{
        return knex('comments').where({id}).first()
    },
    update : (id,comment) => {
        return knex('comments').where({id}).update(comment).returning('*')
    },
    delete:(id) => {
        return knex('comments').where({id}).delete()
    }
}

module.exports = Comment