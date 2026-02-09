import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // For now, workshops are mock array in page.js component
        // To support mobile apps, we should store them in DB and fetch via API.
        // For now, let's return a static list or fetch from DB if I add them.
        // Since workshops aren't in `schema.prisma` yet, I'll return the array.

        // Simulating database fetch
        const workshops = [
            {
                id: 101, // Unique IDs avoiding product ID conflicts
                title: "Oil Painting for Beginners",
                instructor: "Marcus Chen",
                date: "March 15, 2026",
                time: "10:00 AM - 4:00 PM",
                location: "Studio A, Downtown Gallery",
                level: "Beginner",
                price: 150,
                image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800",
                spots: 5,
                description: "Learn the basics of oil painting in this intensive one-day workshop."
            },
            {
                id: 102,
                title: "Digital Art Masterclass: Procreate",
                instructor: "Sarah James",
                date: "March 22, 2026",
                time: "2:00 PM - 5:00 PM",
                location: "Online (Zoom)",
                level: "Intermediate",
                price: 75,
                image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800",
                spots: 12,
                description: "Take your digital art to the next level with advanced Procreate techniques."
            },
            {
                id: 103,
                title: "Sculpting with Clay: Form & Texture",
                instructor: "Elena Vance",
                date: "April 5, 2026",
                time: "11:00 AM - 3:00 PM",
                location: "The Clay Hub",
                level: "All Levels",
                price: 120,
                image: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800",
                spots: 8,
                description: "Hands-on sculpting workshop suitable for all skill levels."
            },
            {
                id: 104,
                title: "Watercolor Landscapes",
                instructor: "Emily White",
                date: "April 12, 2026",
                time: "10:00 AM - 1:00 PM",
                location: "Outdoor Session (Park)",
                level: "Beginner",
                price: 90,
                image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800",
                spots: 15,
                description: "Capture nature's beauty with watercolor techniques."
            }
        ];
        return NextResponse.json(workshops);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch workshops" }, { status: 500 });
    }
}
