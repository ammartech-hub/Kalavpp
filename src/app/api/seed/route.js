import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const artist = await prisma.user.upsert({
            where: { email: 'artist@artcommerce.com' },
            update: {},
            create: {
                email: 'artist@artcommerce.com',
                name: 'Elena Vance',
                password: 'password123',
                role: 'ARTIST'
            },
        })

        // Add logic to avoid duplicate seeds more robustly, maybe truncate product table?
        // prisma.product.deleteMany({}) // Only specialized seed route

        const products = [
            { name: "Abstract Harmony", category: "Original Artworks", subCategory: "Paintings", price: 450, image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600", description: "A beautiful abstract piece.", stock: 5 },
            { name: "Sunset Reflections", category: "Prints & Reproductions", price: 85, image: "https://images.unsplash.com/photo-1578301137019-56fb0a04595e?q=80&w=600", description: "Sunset on the horizon.", stock: 20 },
            { name: "Ceramic Vase Set", category: "Handcrafted Items", price: 120, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600", description: "Handcrafted vase.", stock: 3 },
            { name: "Urban Sketchbook", category: "Stationery", price: 25, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600", description: "Premium sketchbook.", stock: 50 },
            { name: "Golden Hour", category: "Original Artworks", subCategory: "Drawings", price: 600, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600", description: "Golden hour painting.", stock: 1 },
            { name: "Tribal Mask", category: "Traditional & Tribal Art", price: 300, image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600", description: "Authentic tribal mask.", stock: 2 },
        ]

        for (const p of products) {
            const existing = await prisma.product.findFirst({ where: { name: p.name } })
            if (!existing) {
                await prisma.product.create({
                    data: {
                        name: p.name,
                        description: p.description,
                        price: p.price,
                        image: p.image,
                        category: p.category,
                        subCategory: p.subCategory,
                        stock: p.stock,
                        artistId: artist.id,
                    }
                })
            }
        }

        return NextResponse.json({ message: 'Seeded successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
