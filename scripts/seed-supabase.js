const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const DB_PATH = path.join(process.cwd(), 'db.json');

async function main() {
    console.log("🚀 Starting Seed to Supabase...");

    if (!fs.existsSync(DB_PATH)) {
        console.error("❌ db.json not found!");
        return;
    }

    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

    // 1. Seed Users
    console.log(`👤 Seeding ${data.users.length} Users...`);
    for (const u of data.users) {
        // Build password hash
        const hashedPassword = await bcrypt.hash(u.password, 10);

        await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: {
                // Ensure ID usually autoincrements, but for seed we might want to keep sync or just let PG handle it.
                // Better to let PG handle ID, but we strictly need to map relations.
                // For simplicity, we'll let PG generate IDs and just match by Email for now.
                name: u.name,
                email: u.email,
                password: hashedPassword,
                role: u.role || 'USER',
                address: u.address || null,
                phone: u.phone || null
            }
        });
    }

    // Retrieve users map for relations (email -> new ID)
    const allUsers = await prisma.user.findMany();
    const userMap = {};
    allUsers.forEach(u => userMap[u.email] = u.id);

    // 2. Seed Products
    console.log(`📦 Seeding ${data.products.length} Products...`);
    for (const p of data.products) {
        // Find mapped artist ID
        // Mock data usually referenced artistId directly. We need to find the artist email in mock data if possible
        // OR fallback to just assigning to the firs ADMIN/ARTIST.

        // In this 'db.json', products have 'artistId'. We need to see if that ID matches a user in 'db.json'.
        let realArtistId = null;
        const originalArtist = data.users.find(u => u.id === p.artistId);
        if (originalArtist && userMap[originalArtist.email]) {
            realArtistId = userMap[originalArtist.email];
        }

        await prisma.product.create({
            data: {
                name: p.name,
                category: p.category,
                price: p.price,
                image: p.image,
                description: p.description,
                type: p.type || 'PHYSICAL',
                artistId: realArtistId
            }
        });
    }

    // 3. Seed Orders
    console.log(`🛒 Seeding ${data.orders.length} Orders...`);
    for (const o of data.orders) {
        let realUserId = null;
        if (o.userId) {
            const originalUser = data.users.find(u => u.id === o.userId);
            if (originalUser && userMap[originalUser.email]) {
                realUserId = userMap[originalUser.email];
            }
        }

        await prisma.order.create({
            data: {
                date: new Date(o.date),
                total: o.total,
                status: o.status || 'PENDING',
                userId: realUserId,
                customer: o.customer || {},
                items: o.items || []
            }
        });
    }

    console.log("✅ Seeding Complete!");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
