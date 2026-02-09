'use client';

import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function CartSidebar() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart();
    const sidebarRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsCartOpen(false);
            }
        }
        if (isCartOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCartOpen, setIsCartOpen]);

    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
            <div
                ref={sidebarRef}
                className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300"
                style={{ width: '100%', maxWidth: '450px', background: 'white', height: '100%', boxShadow: '-5px 0 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}
            >
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center" style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 className="text-xl font-serif font-bold" style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>Your Cart ({cart.length})</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {cart.length === 0 ? (
                        <div className="text-center text-gray-500 mt-10" style={{ textAlign: 'center', color: '#888', marginTop: '2.5rem' }}>
                            <p>Your cart is currently empty.</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="mt-4 text-black underline"
                                style={{ marginTop: '1rem', color: 'black', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex gap-4" style={{ display: 'flex', gap: '1rem' }}>
                                <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0" style={{ width: '80px', height: '80px', background: '#f5f5f5', borderRadius: '4px', overflow: 'hidden' }}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="flex-1" style={{ flex: 1 }}>
                                    <div className="flex justify-between mb-1" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <h3 className="font-medium" style={{ fontWeight: 500 }}>{item.name}</h3>
                                        <span className="font-semibold" style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-3" style={{ fontSize: '0.875rem', color: '#888', marginBottom: '0.75rem' }}>{item.category}</p>

                                    <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="flex items-center border rounded" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px' }}>
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="px-2 py-1 hover:bg-gray-100"
                                                style={{ padding: '0.25rem 0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="px-2 text-sm" style={{ padding: '0 0.5rem', fontSize: '0.875rem' }}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="px-2 py-1 hover:bg-gray-100"
                                                style={{ padding: '0.25rem 0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                            style={{ color: '#aaa', background: 'none', border: 'none', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-6 border-t bg-gray-50" style={{ padding: '1.5rem', borderTop: '1px solid #eee', background: '#fafafa' }}>
                        <div className="flex justify-between mb-4 text-lg font-semibold" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-6" style={{ fontSize: '0.75rem', color: '#888', marginBottom: '1.5rem' }}>Shipping and taxes calculated at checkout.</p>
                        <button
                            className="w-full bg-black text-white py-4 uppercase tracking-widest font-medium hover:bg-gray-800 transition-colors"
                            style={{ width: '100%', background: 'var(--color-secondary)', color: 'white', padding: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500, border: 'none', cursor: 'pointer' }}
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
