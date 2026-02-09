const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db.json');

const newProducts = [
    {
        id: 101, // New ID range
        name: "Hungry Nestlings - Nature Photography",
        description: "A candid capture of new life. High-resolution print of three hatchlings in their nest.",
        price: 85.00,
        image: "/images/temp/bird-nest.jpg",
        category: "Digital Art Products",
        stock: 10,
        artistId: 1
    },
    {
        id: 102, // New ID range
        name: "Ancient Scripts - Mixed Media Relief",
        description: "Textured wall art featuring raised calligraphy in varying Indian scripts with a metallic bronze finish.",
        price: 1200.00,
        image: "/images/temp/relief-art.jpg",
        category: "Original Artworks",
        stock: 1,
        artistId: 2
    },
    {
        id: 103, // New ID range
        name: "Spirit of Mumbai - Kinetic Sculpture",
        description: "A vibrant installation piece capturing the essence of Mumbai: Includes the Dabbawala, Local Train, and Kite Festival motifs.",
        price: 3500.00,
        image: "/images/temp/mumbai-sculpture.jpg",
        category: "Home Decor", // or Sculpture if we had it
        stock: 1,
        artistId: 2
    },
    {
        id: 104, // New ID range
        name: "Portrait of Mangesh Padgaonkar",
        description: "Intricate Paper Quilling art paying tribute to the legendary Marathi poet Mangesh Padgaonkar.",
        price: 950.00,
        image: "/images/temp/quilling-portrait.jpg",
        category: "Original Artworks",
        stock: 1,
        artistId: 2
    },
    {
        id: 105, // New ID range
        name: "Light in the Foundry",
        description: "Atmospheric photography capturing the play of light and smoke in a rural workshop.",
        price: 150.00,
        image: "/images/temp/foundry-boy.jpg",
        category: "Digital Art Products",
        stock: 25,
        artistId: 1
    }
];

function addTempProducts() {
    if (!fs.existsSync(DB_PATH)) {
        console.error("db.json not found!");
        return;
    }

    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

    // Prepend new products to the list
    if (!db.products) db.products = [];

    // Remove existing temp products if run multiple times to avoid duplicates
    db.products = db.products.filter(p => !newProducts.find(np => np.id === p.id));

    // Add to top
    db.products.unshift(...newProducts);

    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    console.log("Added 5 temp products from user images!");
}

addTempProducts();
