import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req) {
    // In a real app, verify session here using getServerSession(authOptions)
    // For now, we'll accept a 'email' query param for the mock
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // In Mock DB, Order model has 'customer' field which is a JSON object. 
        // We can't query deep JSON reliably with all Prisma adapters in mock.
        // But let's try `where: { customer: { path: ['email'], equals: email } }` if permitted
        // OR, since it's a small mock DB, fetch all and filter.

        const allOrders = await prisma.order.findMany({
            orderBy: {
                date: 'desc'
            }
        });

        // Manual filter for Mock JSON structure
        const userOrders = allOrders.filter(o => o.customer?.email === email);

        return NextResponse.json(userOrders);
    } catch (error) {
        console.error("Fetch orders error:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
