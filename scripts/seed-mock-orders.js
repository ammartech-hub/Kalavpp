const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db.json');

// Helper to get random item from array
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function seedOrders() {
    if (!fs.existsSync(DB_PATH)) {
        console.error("db.json not found!");
        return;
    }

    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

    // Ensure we have users and products
    if (!db.users || db.users.length === 0) {
        console.log("Creating default users...");
        db.users = [
            { id: 1, name: "Admin User", email: "admin@artcommerce.com", role: "ADMIN", password: "admin123", createdAt: new Date().toISOString() },
            { id: 2, name: "Elena Vance", email: "artist@artcommerce.com", role: "ARTIST", password: "artist123", createdAt: new Date().toISOString() },
            { id: 3, name: "John Doe", email: "john@example.com", role: "USER", password: "user123", createdAt: new Date().toISOString() },
            { id: 4, name: "Alice Smith", email: "alice@example.com", role: "USER", password: "user123", createdAt: new Date().toISOString() }
        ];
    }

    if (!db.products || db.products.length === 0) {
        console.error("No products found to create orders from.");
        return;
    }

    console.log("Seeding orders...");

    // Generate 15 mock orders
    const orders = [];
    const statuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

    // Random Users for Orders (exclude Admin/Artist usually, but for demo let's use customers)
    const customers = db.users.filter(u => u.role === 'USER');
    if (customers.length === 0) customers.push(db.users[0]); // Fallback

    for (let i = 0; i < 15; i++) {
        const customer = random(customers);
        const numItems = randomInt(1, 4);
        const items = [];
        let total = 0;

        for (let j = 0; j < numItems; j++) {
            const product = random(db.products);
            const qty = randomInt(1, 2);
            items.push({
                product: product, // Store full product snapshot as per our lightweight schema
                quantity: qty,
                price: product.price
            });
            total += product.price * qty;
        }

        // Add shipping if physical
        const hasPhysical = items.some(i => i.product.category !== 'Digital Art Products' && i.product.category !== 'Workshop');
        if (hasPhysical) total += 15;

        // Random Date in last 30 days
        const date = new Date();
        date.setDate(date.getDate() - randomInt(0, 30));

        orders.push({
            id: 1000 + i,
            date: date.toISOString(),
            total: parseFloat(total.toFixed(2)),
            status: random(statuses),
            userId: customer.id,
            customer: {
                name: customer.name,
                email: customer.email,
                address: "123 Mock Lane, New York, NY"
            },
            items: items
        });
    }

    db.orders = orders;

    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    console.log(`Successfully seeded ${orders.length} orders!`);
}

seedOrders();
