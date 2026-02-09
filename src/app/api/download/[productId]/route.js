import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
    const session = await getServerSession(authOptions);
    const { productId } = params;

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Verify user purchased this product
    // Fetch ALL orders (Mock DB limitation: filtering efficiently in memory)
    const allOrders = await prisma.order.findMany();

    // Filter for current user
    const myOrders = allOrders.filter(o => {
        // loose equality for string/int ID mix in mocks
        return o.userId == session.user.id || (o.customer && o.customer.email === session.user.email);
    });

    const hasPurchased = myOrders.some(order => {
        // order.items is Json in schema, but array of objects in mock.
        return Array.isArray(order.items) && order.items.some(item =>
            // Check if item.id matches productId or item.product.id matches
            (item.id == productId) || (item.product && item.product.id == productId)
        );
    });

    if (!hasPurchased) {
        // Also allow Artists to download their own products? 
        // For now, strict check.
        return NextResponse.json({ error: "Access Denied. You must purchase this product." }, { status: 403 });
    }

    // 2. Fetch Product to get the "file"
    const product = await prisma.product.findUnique({ where: { id: parseInt(productId) } });

    if (!product || product.type !== 'DIGITAL') {
        return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // 3. Serve the file (Mocking a secure signed URL or stream)
    // In production, generate a signed S3 URL here.
    // For demo, we redirect to a mock file or return a success message with the public URL.

    return NextResponse.json({
        url: product.image, // Mock: returning the image as the "download"
        message: "Secure download link generated."
    });
}
