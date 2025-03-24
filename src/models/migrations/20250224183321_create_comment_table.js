/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('comments',function(table){
    table.increments('id');
    table.integer('post_id').references('id').inTable('categories').onDelete('CASCADE');
    table.string('content').notNullable();
    table.string('commenter_name').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('comments');

};
