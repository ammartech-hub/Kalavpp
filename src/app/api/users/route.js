import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req) {
    // In a real app, verify admin session here.
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
