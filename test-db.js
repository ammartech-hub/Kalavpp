require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

async function main() {
    try {
        await prisma.$connect();
        console.log('Successfully connected to database');
    } catch (e) {
        require('fs').writeFileSync('db_error.log', e.toString());
        console.error('Failed to connect to database', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
