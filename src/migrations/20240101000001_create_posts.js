/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.integer('category_id').unsigned().notNullable();
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.timestamp('published_at').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
    
    table.foreign('category_id').references('id').inTable('categories');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('posts');
} 