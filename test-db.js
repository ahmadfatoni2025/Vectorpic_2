const postgres = require('postgres');
require('dotenv').config();

const sql = postgres(process.env.DATABASE_URL, { prepare: false });

async function test() {
    try {
        console.log('Connecting to database...');
        const result = await sql`SELECT version()`;
        console.log('Connected! Database version:', result[0].version);
    } catch (error) {
        console.error('Connection failed:', error);
    } finally {
        await sql.end();
    }
}

test();
