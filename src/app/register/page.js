'use client';

import { useState } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'USER' // Default for Customers
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                // Success - Redirect to Login
                router.push('/login?registered=true');
            } else {
                setError(data.error || 'Registration failed.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Navigation />
            <div className="flex flex-col items-center justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-10 text-center text-3xl font-serif font-bold leading-9 tracking-tight text-gray-900">
                        Create Your Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join our community of art lovers and creators.
                    </p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 shadow-lg rounded-lg">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                            <div className="mt-2">
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="mt-2">
                                <input
                                    required
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 outline-none"
                                />
                            </div>
                        </div>

                        {/* Optional Role Selection for Demo Flexibility */}
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Account Type</label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="mt-2 block w-full rounded-md border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black sm:text-sm sm:leading-6"
                            >
                                <option value="USER">Customer / Learner</option>
                                <option value="ARTIST">Artist / Vendor (Instant Access)</option>
                            </select>
                            <p className="mt-1 text-xs text-gray-500">
                                Normally, Artists require approval. For this demo, Instant Access is enabled.
                            </p>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full justify-center rounded-md bg-black px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-70 transition-colors"
                            >
                                {loading ? 'Creating Account...' : 'Register'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <Link href="/login" className="font-semibold leading-6 text-black hover:text-gray-700 underline">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
