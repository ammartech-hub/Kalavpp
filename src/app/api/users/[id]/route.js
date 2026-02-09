import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {
    const { id } = params;
    try {
        const body = await req.json();
        // In real app, only admin can do this.

        // Convert to int if using int IDs in db.json, string if UUID.
        // Mock DB uses int usually if auto-increment, but let's see. 
        // My previous registers used int IDs implicitly by json-server/lowdb or uuid. 
        // Let's safe cast.

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) || id },
            data: body
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { id } = params;
    try {
        await prisma.user.delete({
            where: { id: parseInt(id) || id }
        });
        return NextResponse.json({ message: "User deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}
