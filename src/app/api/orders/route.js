import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            orderBy: {
                date: 'desc'
            }
        });
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { items, total, customer } = body;

        // Validate
        if (!items || items.length === 0) {
            return NextResponse.json({ error: "No items in cart" }, { status: 400 });
        }

        // Create Order
        // In a real app with real Prisma relations:
        // const order = await prisma.order.create({
        //   data: {
        //     items: { create: items.map(i => ({ productId: i.id, quantity: i.quantity })) },
        //     total,
        //     customerEmail: customer.email
        //   }
        // });

        // For Mock JSON DB (flat structure):
        const order = await prisma.order.create({
            data: {
                items,
                total,
                customer,
                status: 'PENDING',
                date: new Date().toISOString()
            }
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error("Order creation failed:", error);
        return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
    }
}
