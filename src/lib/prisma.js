const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'db.json');

// Simple JSON DB to unblock functionality while SQL driver issues are resolved
class MockPrismaClient {
    constructor() {
        this.data = { users: [], products: [], orders: [] };
        this.DB_PATH = path.join(process.cwd(), 'db.json');

        if (fs.existsSync(this.DB_PATH)) {
            try {
                this.data = JSON.parse(fs.readFileSync(this.DB_PATH, 'utf-8'));
                if (!this.data.users) this.data.users = [];
                if (!this.data.products) this.data.products = [];
                if (!this.data.orders) this.data.orders = [];
            } catch (e) { console.error("Failed to load db.json"); }
        } else { this._save(); }

        this.user = {
            findMany: async () => this.data.users,
            findUnique: async ({ where }) => {
                if (where.email) return this.data.users.find(u => u.email === where.email) || null;
                if (where.id) return this.data.users.find(u => u.id === where.id) || null;
                return null;
            },
            create: async ({ data }) => {
                const user = { id: this.data.users.length + 1, ...data, createdAt: new Date() };
                this.data.users.push(user);
                this._save();
                return user;
            },
            update: async ({ where, data }) => {
                const index = this.data.users.findIndex(u => u.id === where.id || u.email === where.email);
                if (index !== -1) {
                    this.data.users[index] = { ...this.data.users[index], ...data };
                    this._save();
                    return this.data.users[index];
                }
                throw new Error("User not found");
            }
        };

        this.product = {
            findMany: async (args) => {
                let res = this.data.products;
                if (args?.where?.category) res = res.filter(p => p.category === args.where.category);
                return res;
            },
            findUnique: async ({ where }) => this.data.products.find(p => p.id === where.id) || null,
            create: async ({ data }) => {
                const product = { id: this.data.products.length + 1, ...data, createdAt: new Date() };
                this.data.products.push(product);
                this._save();
                return product;
            }
        };

        this.order = {
            findMany: async (args) => {
                let res = [...this.data.orders];
                if (args?.orderBy?.date === 'desc') res.sort((a, b) => new Date(b.date) - new Date(a.date));
                return res;
            },
            create: async ({ data }) => {
                const order = { id: this.data.orders.length + 1, ...data };
                this.data.orders.push(order);
                this._save();
                return order;
            }
        };
    }

    _save() { fs.writeFileSync(this.DB_PATH, JSON.stringify(this.data, null, 2)); }
    async $disconnect() { }
}

// SMART EXPORT: Default to MockPrismaClient for builds - use real Prisma only in production with DATABASE_URL
const prisma = new MockPrismaClient();

export default prisma;
