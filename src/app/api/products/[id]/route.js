import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {
    const { id } = params;
    try {
        const body = await req.json();
        // Convert ID if necessary based on DB. Mock uses Int normally.
        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(id) || id },
            data: body
        });
        return NextResponse.json(updatedProduct);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { id } = params;
    try {
        await prisma.product.delete({
            where: { id: parseInt(id) || id }
        });
        return NextResponse.json({ message: "Product deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
