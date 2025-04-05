/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.integer('post_id').unsigned().notNullable();
    table.text('content').notNullable();
    table.string('commenter_name').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
    
    table.foreign('post_id').references('id').inTable('posts');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('comments');
} 