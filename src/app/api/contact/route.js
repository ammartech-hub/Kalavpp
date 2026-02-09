import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!process.env.RESEND_API_KEY) {
            console.error("Missing RESEND_API_KEY");
            return NextResponse.json({ success: false, error: "Email service not configured" }, { status: 500 });
        }

        // Send Email via Resend
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: 'techammarit@gmail.com', // Your notification email
            subject: `New Contact: ${subject}`,
            html: `
                <div style="font-family: serif; padding: 20px; border: 1px solid #D4AF37;">
                    <h2 style="color: #D4AF37;">New Inquiry from Kalavpp</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr style="border: 0.5px solid #eee; margin: 20px 0;">
                    <p><strong>Message:</strong></p>
                    <p style="font-style: italic;">${message}</p>
                </div>
            `
        });

        return NextResponse.json({ success: true, message: "Aesthetically Transmitted. We will contact you soon." });
    } catch (error) {
        console.error("Email error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
