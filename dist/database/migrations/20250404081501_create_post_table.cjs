"use strict";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('posts', (table) => {
        table.increments('id').primary();
        table.integer('category_id').unsigned().references('id').inTable('categories');
        table.string('title').notNullable();
        table.text('content').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('published_at').nullable();
        table.timestamp('deleted_at').nullable();
    });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('posts');
};
