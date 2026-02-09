'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
// @ts-ignore
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function Checkout() {
    const { cart, clearCart, getCartTotal } = useCart();
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: session?.user?.name || '',
        email: session?.user?.email || '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call to create order
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart,
                    total: getCartTotal(),
                    customer: formData
                })
            });

            if (response.ok) {
                // Success
                clearCart();
                const newOrder = await response.json();
                router.push(`/checkout/success/${newOrder.id}`);
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <main>
                <Navigation />
                <div className="container mx-auto px-6 py-24 text-center">
                    <h1 className="text-3xl font-serif mb-4">Your Cart is Empty</h1>
                    <p className="mb-8">Visits the ArtCommerce vertical to shop masterpieces.</p>
                    <button onClick={() => router.push('/shop')} className="btn-primary px-6 py-2">Go to Shop</button>
                </div>
                <Footer />
            </main>
        );
    }

    // Check if cart has physical items
    const hasPhysicalItems = cart.some(item =>
        item.category !== 'Digital Art Products' && item.category !== 'Workshop'
    );

    return (
        <main className="bg-white min-h-screen">
            <Navigation />

            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* LEFT: FORM */}
                    <div className="flex-[1.5]">
                        <div className="mb-12">
                            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Secure Transaction</span>
                            <h1 className="text-4xl md:text-5xl font-serif text-black italic">Complete <span className="text-gold not-italic">Acquisition</span></h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-12">
                            {/* SECTION: IDENTITY */}
                            <section>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-6 pb-2 border-b border-stone-100">01. Collector Identity</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        required name="name" placeholder="Full Legal Name"
                                        value={formData.name} onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-100 p-4 text-sm focus:border-gold outline-none transition"
                                    />
                                    <input
                                        required type="email" name="email" placeholder="Email Address"
                                        value={formData.email} onChange={handleChange}
                                        className="w-full bg-stone-50 border border-stone-100 p-4 text-sm focus:border-gold outline-none transition"
                                    />
                                </div>
                            </section>

                            {/* SECTION: LOGISTICS (Physical Only) */}
                            {hasPhysicalItems && (
                                <section>
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-6 pb-2 border-b border-stone-100">02. Shipping Logistics</h3>
                                    <div className="space-y-6">
                                        <input
                                            required name="address" placeholder="Shipping Destination"
                                            value={formData.address} onChange={handleChange}
                                            className="w-full bg-stone-50 border border-stone-100 p-4 text-sm focus:border-gold outline-none transition"
                                        />
                                        <div className="grid grid-cols-2 gap-6">
                                            <input
                                                required name="city" placeholder="City"
                                                value={formData.city} onChange={handleChange}
                                                className="w-full bg-stone-50 border border-stone-100 p-4 text-sm focus:border-gold outline-none transition"
                                            />
                                            <input
                                                required name="zip" placeholder="Postal Code"
                                                value={formData.zip} onChange={handleChange}
                                                className="w-full bg-stone-50 border border-stone-100 p-4 text-sm focus:border-gold outline-none transition"
                                            />
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* SECTION: FINANCING */}
                            <section>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-6 pb-2 border-b border-stone-100">{hasPhysicalItems ? '03' : '02'}. Secure Financing</h3>
                                <div className="bg-stone-900 p-8 text-white space-y-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex gap-4">
                                            <div className="w-10 h-6 bg-white/10 rounded border border-white/5"></div>
                                            <div className="w-10 h-6 bg-white/10 rounded border border-white/5"></div>
                                        </div>
                                        <span className="text-[10px] tracking-widest text-gold uppercase font-bold">Encrypted Gateway</span>
                                    </div>

                                    <div className="space-y-4">
                                        <input
                                            required name="cardNumber" placeholder="Card Number"
                                            value={formData.cardNumber} onChange={handleChange}
                                            className="w-full bg-black border border-white/10 p-4 text-sm focus:border-gold outline-none transition font-mono"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                required name="expiry" placeholder="MM / YY"
                                                value={formData.expiry} onChange={handleChange}
                                                className="w-full bg-black border border-white/10 p-4 text-sm focus:border-gold outline-none transition font-mono text-center"
                                            />
                                            <input
                                                required name="cvc" placeholder="CVC"
                                                value={formData.cvc} onChange={handleChange}
                                                className="w-full bg-black border border-white/10 p-4 text-sm focus:border-gold outline-none transition font-mono text-center"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <button
                                type="submit" disabled={loading}
                                className="w-full py-5 bg-black text-white text-[12px] font-bold uppercase tracking-[0.4em] hover:bg-gold transition-all shadow-2xl flex items-center justify-center gap-4"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : null}
                                {loading ? 'Authorizing...' : `Initialize Checkout — $${(getCartTotal() + (hasPhysicalItems ? 15 : 0)).toFixed(2)}`}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT: SUMMARY */}
                    <div className="flex-1">
                        <div className="sticky top-32 bg-stone-50 p-8 border border-stone-100">
                            <h2 className="text-xl font-serif text-black mb-8 italic border-b border-stone-200 pb-4">Acquisition Summary</h2>
                            <div className="space-y-6 mb-8">
                                {cart.map((item, idx) => (
                                    <div key={`${item.id}-${idx}`} className="flex gap-4">
                                        <div className="w-16 h-16 bg-stone-200 overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-black leading-tight mb-1">{item.name}</h4>
                                            <div className="text-[10px] uppercase tracking-widest text-stone-400">{item.category}</div>
                                        </div>
                                        <div className="text-sm font-light text-black">${item.price}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-stone-200">
                                <div className="flex justify-between text-xs text-stone-500 uppercase tracking-widest">
                                    <span>Portfolio Subtotal</span>
                                    <span>${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xs text-stone-500 uppercase tracking-widest">
                                    <span>Logistics & Handling</span>
                                    <span>{hasPhysicalItems ? '$15.00' : 'Inclusive'}</span>
                                </div>
                                <div className="flex justify-between text-xl font-serif text-black pt-4 border-t border-black mt-4 italic">
                                    <span>Investment Total</span>
                                    <span className="text-gold not-italic">${(getCartTotal() + (hasPhysicalItems ? 15 : 0)).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
