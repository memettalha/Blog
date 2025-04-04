/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.integer('post_id').unsigned().references('id').inTable('posts');
    table.text('content').notNullable();
    table.string('commenter_name').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('comments');
}; 