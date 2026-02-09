const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db.json');

const premiumProducts = [
    // --- ORIGINAL ARTWORKS ---
    {
        id: 201,
        name: "Ethereal Landscapes - Oil on Canvas",
        description: "A mesmerizing series capturing the quiet beauty of misty mountains. Original oil painting, 24x36 inches.",
        price: 1250.00,
        image: "https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?q=80&w=1000&auto=format&fit=crop", // Abstract painting
        category: "Original Artworks",
        stock: 1,
        artistId: 2
    },
    {
        id: 202,
        name: "The Gilded Cage - Sculpture",
        description: "Modern bronze sculpture exploring themes of freedom and confinement. Hand-cast with gold leaf accents.",
        price: 3800.00,
        image: "https://images.unsplash.com/photo-1551893478-d726eaf0442c?q=80&w=1000&auto=format&fit=crop", // Abstract sculpture/texture
        category: "Original Artworks",
        stock: 1,
        artistId: 2
    },
    {
        id: 203,
        name: "Midnight in Paris - Charcoal",
        description: "Atmospheric charcoal sketch of a rainy Parisian street. Framed in vintage oak.",
        price: 450.00,
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop", // Sketchy art vibe
        category: "Original Artworks",
        stock: 1,
        artistId: 2
    },

    // --- DIGITAL ASSETS ---
    {
        id: 204,
        name: "Procreate Master Collection: Oils",
        description: "The ultimate brush set for digital painters. Includes 50+ custom brushes mimicking real oil paint texture.",
        price: 29.00,
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop", // Digital abstract
        category: "Digital Art Products",
        stock: 999,
        artistId: 1
    },
    {
        id: 205,
        name: "3D Asset Pack: Ancient Ruins",
        description: "High-fidelity 3D models of ancient temple ruins, fully textured and game-ready. OBJ/FBX formats.",
        price: 49.00,
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", // Abstract 3D shape
        category: "Digital Art Products",
        stock: 999,
        artistId: 1
    },
    {
        id: 206,
        name: "Modern UI Kit for Artists",
        description: "A clean, minimalist UI capability kit designed specifically for art portfolio websites. Figma & Sketch.",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=1000&auto=format&fit=crop", // UI/Minimal
        category: "Digital Art Products",
        stock: 999,
        artistId: 1
    },

    // --- MERCHANDISE ---
    {
        id: 207,
        name: "Organic Cotton Tote - 'Abstract #4'",
        description: "Durable, eco-friendly tote bag featuring print 'Abstract #4'. Perfect for carrying art supplies.",
        price: 25.00,
        image: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?q=80&w=1000&auto=format&fit=crop", // Tote/Fabric texture
        category: "Merchandise",
        stock: 50,
        artistId: 1
    },
    {
        id: 208,
        name: "Ceramic Studio Mug",
        description: "Hand-thrown ceramic mug with a unique glaze. Each piece is one-of-a-kind.",
        price: 32.00,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000&auto=format&fit=crop", // Ceramic mug
        category: "Merchandise",
        stock: 20,
        artistId: 2
    },

    // --- WORKSHOPS (Technically services/products) ---
    {
        id: 209,
        name: "Workshop: Introduction to Pottery",
        description: "A 2-day intensive workshop learning the basics of wheel throwing and hand-building.",
        price: 150.00,
        image: "https://images.unsplash.com/photo-1565193566173-0923d5a6c559?q=80&w=1000&auto=format&fit=crop", // Pottery hands
        category: "Workshop",
        stock: 10,
        artistId: 2
    },
    {
        id: 210,
        name: "Masterclass: Plein Air Painting",
        description: "Join us outdoors for a guided session on capturing natural light and landscapes.",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=1000&auto=format&fit=crop", // Painting supplies
        category: "Workshop",
        stock: 15,
        artistId: 2
    },

    // --- MORE ART ---
    {
        id: 211,
        name: "Geometric Harmony Print",
        description: "Limited edition giclee print of geometric abstraction.",
        price: 90.00,
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop", // Geometric
        category: "Original Artworks",
        stock: 100,
        artistId: 1
    },
    {
        id: 212,
        name: "Fluid Dynamics - Acrylic Pour",
        description: "Vibrant acrylic pour on canvas, resin coated for a glass-like finish.",
        price: 280.00,
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop", // Fluid art
        category: "Original Artworks",
        stock: 1,
        artistId: 2
    }
];

function populateGallery() {
    if (!fs.existsSync(DB_PATH)) {
        console.error("db.json not found!");
        return;
    }

    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

    if (!db.products) db.products = [];

    // Filter out old "default" products that might be ugly placeholders (keeping the ones I added manually via previous script)
    // Keep products with IDs < 100 (original placeholders? actually my added ones are 101-105).
    // Let's keep 101-105. Remove everything else to have a clean slate of premium items?
    // OR just append.
    // The user said "add images... empty is not looking good".
    // I'll append these new ones.

    // Avoid duplicates
    premiumProducts.forEach(newP => {
        if (!db.products.find(p => p.id === newP.id)) {
            db.products.push(newP);
        } else {
            // Updgrade images if ID matches? (Unlikely since these are new IDs)
        }
    });

    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    console.log(`Added ${premiumProducts.length} premium products to the gallery!`);
}

populateGallery();
