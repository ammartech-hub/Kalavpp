import { NextResponse } from 'next/server'
import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // Admin Access Control
        if (path.startsWith("/admin") && token?.role !== "ADMIN") {
            return NextResponse.rewrite(new URL("/login?error=AccessDenied", req.url));
        }

        // Dashboard Access Control (Artists/Admins only)
        if (path.startsWith("/dashboard")) {
            // Strict check for allowed roles
            if (token?.role !== "ARTIST" && token?.role !== "ADMIN") {
                // Redirect unauthorized users (e.g. Customers) to home page
                return NextResponse.redirect(new URL("/", req.url));
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"]
}
