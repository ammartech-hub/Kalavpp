import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(req) {
    // Basic protection (optional, can use middleware)
    // In a real app, verify token here or use middleware
    try {
        const body = await req.json();
        const product = await prisma.product.create({
            data: body
        });
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
