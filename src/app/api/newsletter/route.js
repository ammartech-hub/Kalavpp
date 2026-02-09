import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
        }

        console.log("New Newsletter Subscription:", email);

        // In a real app, we might save this to a 'subscribers' table
        // For now, we'll just log it or save to mock DB if we add that model

        return NextResponse.json({ success: true, message: "Thank you for joining our community!" });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
