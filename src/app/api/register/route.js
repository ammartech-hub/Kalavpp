import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, password, role } = body;

        if (!email || !password || !name) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Create user
        // Default role is USER (Customer/Learner) unless specified (e.g. ARTIST)
        // In a real app, you wouldn't allow passing 'role' freely in public registration.
        // But for this demo/admin creation, we might.
        // Let's restrict public registration to 'USER' by default, or 'ARTIST' if coming from a specific flow?
        // For simplicity here, we'll allow it but default to USER.

        const finalRole = role || 'USER';

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role || 'USER' // Validate or default
            }
        });

        return NextResponse.json({ message: "User created", user: { id: newUser.id, email: newUser.email, role: newUser.role } }, { status: 201 });

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
