import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Mock Admin Hardcoded (for easy testing of roles without DB insert)
                if (credentials.email === "admin@artcommerce.com" && credentials.password === "admin123") {
                    return { id: "admin-1", name: "System Admin", email: "admin@artcommerce.com", role: "ADMIN" };
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user) {
                    return null;
                }

                // Check password with bcrypt
                // Note: user.password should be hashed. If using Mock DB verify hashing.
                // For simplicity in this demo, we'll try bcrypt compare first. If fail, check plain text (backward compatibility for mock data).

                let isValid = false;
                try {
                    isValid = await bcrypt.compare(credentials.password, user.password);
                } catch (e) {
                    // Fallback for legacy plain text mock data
                    isValid = user.password === credentials.password;
                }

                // Double check plain text specifically for seed data that might not be hashed yet
                if (!isValid && user.password === credentials.password) {
                    isValid = true;
                }

                if (!isValid) {
                    return null;
                }

                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-dev",
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
