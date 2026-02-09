'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result.error) {
            setError("Invalid credentials! Try using the demo accounts in db.json (e.g. artist@artcommerce.com / password123) or Admin (admin@artcommerce.com / admin123).");
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <main className="bg-stone-50 min-h-screen">
            <Navigation />

            <div className="flex justify-center items-center py-32 px-6">
                <div className="bg-white p-12 shadow-2xl max-w-md w-full border border-stone-100">
                    <div className="text-center mb-12">
                        <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Personal Access</span>
                        <h1 className="text-4xl font-serif text-black italic mb-4">Welcome <span className="text-gold not-italic">Back</span></h1>
                        <p className="text-stone-400 font-light text-sm">Enter the Kalavpp ecosystem to manage your collection.</p>
                    </div>

                    {error && <div className="text-red-500 text-xs mb-8 bg-red-50 p-4 border-l-2 border-red-500 font-light italic">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-stone-50 border border-stone-100 p-4 text-sm focus:border-gold outline-none transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-stone-50 border border-stone-100 p-4 text-sm focus:border-gold outline-none transition"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-gold transition-all shadow-xl"
                        >
                            Authorize Entry
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-stone-100 text-center space-y-4">
                        <p className="text-xs text-stone-400 font-light">
                            New to the platform? <Link href="/register" className="text-black font-bold hover:text-gold transition underline">Create an Account</Link>
                        </p>
                        <p className="text-xs text-stone-400 font-light">
                            Professional creator? <Link href="/sell" className="text-black font-bold hover:text-gold transition underline">Artist Registration</Link>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
