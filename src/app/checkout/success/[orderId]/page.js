'use client';

import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function OrderSuccess({ params }) {
    // In a real app, you might fetch order details by ID here to show dynamic summary.
    // For now we'll show a generic success message or active usage of order ID.
    const orderId = params.orderId;
    const { data: session } = useSession();

    return (
        <main className="bg-gray-50 min-h-screen flex flex-col">
            <Navigation />

            <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="bg-white p-12 rounded-2xl shadow-xl max-w-lg w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-600" size={40} />
                    </div>

                    <h1 className="text-3xl font-serif font-bold mb-2">Order Confirmed!</h1>
                    <p className="text-gray-500 mb-8">
                        Thank you for your purchase. Your order <span className="font-mono font-bold text-black">#{orderId}</span> has been received.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                        <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">Next Steps</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-black shrink-0"></div>
                                <span>You will receive an email confirmation shortly at <strong>{session?.user?.email || 'your email'}</strong>.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-black shrink-0"></div>
                                <span>You can track your order status in your profile.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-black shrink-0"></div>
                                <span>Digital items are available for download immediately.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link href="/profile" className="btn-primary w-full flex items-center justify-center gap-2">
                            <Package size={18} /> View Order History
                        </Link>
                        <Link href="/shop" className="text-sm text-gray-600 hover:text-black py-2">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
