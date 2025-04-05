import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'blog'
    }
});

export default db; 