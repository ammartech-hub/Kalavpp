'use client';

import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, X, Clock, Palette, PenTool, Layers, BookOpen } from 'lucide-react';
import styles from './Navigation.module.css';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

import { useSession, signOut } from "next-auth/react";

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { setIsCartOpen, cart } = useCart();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // New state for user menu
    const { data: session } = useSession();

    return (
        <nav className={styles.header}>
            <div className={styles.navContainer}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    Kalavpp
                </Link>

                {/* Desktop Links */}
                <div className={`hidden md:flex ${styles.navLinks}`}>
                    <div className={styles.navItem}>
                        <Link href="/shop" className="flex items-center gap-1">
                            ArtCommerce
                        </Link>
                        <div className={styles.dropdown}>
                            <div className={styles.dropdownHeader}>MARKETPLACE VERTICAL</div>
                            <Link href="/shop" className={styles.dropdownLink}>
                                <div className="flex items-center gap-3">
                                    <ShoppingBag size={18} className="text-gold" />
                                    <span>Browse Shop</span>
                                </div>
                            </Link>
                            <Link href="/shop/digital" className={styles.dropdownLink}>
                                <div className="flex items-center gap-3">
                                    <Clock size={18} className="text-stone-400" />
                                    <span>Latest Drops</span>
                                </div>
                            </Link>
                            <Link href="/sell" className={styles.dropdownLink}>
                                <div className="flex items-center gap-3">
                                    <Palette size={18} className="text-stone-400" />
                                    <span>Become a Creator</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className={styles.navItem}>
                        <Link href="/services">
                            Creative Services
                        </Link>
                        <div className={styles.dropdown}>
                            <div className={styles.dropdownHeader}>SERVICE VERTICAL</div>
                            <Link href="/services/custom" className={styles.dropdownLink}>
                                <div className="flex items-center gap-3">
                                    <PenTool size={18} className="text-gold" />
                                    <span>Custom Commissions</span>
                                </div>
                            </Link>
                            <Link href="/services/limited" className={styles.dropdownLink}>
                                <div className="flex items-center gap-3">
                                    <Layers size={18} className="text-stone-400" />
                                    <span>Gallery Installations</span>
                                </div>
                            </Link>
                            <Link href="/workshops" className={styles.dropdownLink}>
                                <div className="flex items-center gap-3">
                                    <BookOpen size={18} className="text-stone-400" />
                                    <span>Masterclasses</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <Link href="/blog" className="text-sm uppercase tracking-widest font-bold text-gray-400 hover:text-black transition">
                        Insights
                    </Link>
                    <Link href="/about" className="text-sm uppercase tracking-widest font-bold text-gray-400 hover:text-black transition">
                        Curation
                    </Link>
                </div>

                {/* Action Bar */}
                <div className={styles.actionBar}>
                    {isSearchOpen ? (
                        <div className="flex items-center border rounded px-2 bg-white" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="outline-none p-1 text-sm font-sans"
                                style={{ border: 'none', outline: 'none', padding: '0.25rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}
                                autoFocus
                                onBlur={() => setIsSearchOpen(false)}
                            />
                            <X size={16} className="cursor-pointer text-gray-500" onClick={() => setIsSearchOpen(false)} />
                        </div>
                    ) : (
                        <Search className={styles.actionIcon} size={20} onClick={() => setIsSearchOpen(true)} />
                    )}

                    {/* User Menu */}
                    <div className="relative" onMouseEnter={() => setIsUserMenuOpen(true)} onMouseLeave={() => setIsUserMenuOpen(false)}>
                        <User className={styles.actionIcon} size={20} style={{ color: session ? 'black' : 'inherit' }} />

                        {isUserMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded border border-gray-100 py-2 z-50 transform origin-top-right transition-all duration-200" style={{ position: 'absolute', top: '100%', right: 0, minWidth: '200px', background: 'white', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '4px', border: '1px solid #eee' }}>
                                {session ? (
                                    <>
                                        <div className="px-4 py-2 border-b mb-2">
                                            <p className="font-bold text-sm truncate">{session.user.name}</p>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{session.user.role}</p>
                                        </div>

                                        {(session.user.role === 'ARTIST' || session.user.role === 'ADMIN') && (
                                            <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                                                Seller Dashboard
                                            </Link>
                                        )}

                                        <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                                            My Orders
                                        </Link>

                                        <button
                                            onClick={() => signOut()}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors mt-2 border-t pt-2"
                                        >
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors font-bold">
                                            Sign In
                                        </Link>
                                        <Link href="/sell" className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors text-gray-600">
                                            Register (Artist)
                                        </Link>
                                        <Link href="/register" className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors text-gray-600">
                                            Register (User)
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
                        <ShoppingBag className={styles.actionIcon} size={20} />
                        {cart?.length > 0 &&
                            <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold" style={{ position: 'absolute', top: '-5px', right: '-8px', background: 'var(--color-primary)', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                                {cart.length}
                            </span>
                        }
                    </div>
                </div>

                {/* Mobile Menu Icon */}
                <Menu
                    className="md:hidden cursor-pointer ml-4"
                    size={24}
                    onClick={() => setIsMobileMenuOpen(true)}
                />
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-white z-50 flex flex-col p-6 animate-in slide-in-from-right duration-200">
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-xl font-serif font-bold">Menu</span>
                        <X className="cursor-pointer" size={24} onClick={() => setIsMobileMenuOpen(false)} />
                    </div>

                    <div className="flex flex-col gap-6 text-lg font-medium">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>

                        <div className="space-y-2">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">ArtCommerce</p>
                            <Link href="/shop" className="block pl-4" onClick={() => setIsMobileMenuOpen(false)}>All Products</Link>
                            <Link href="/shop/physical" className="block pl-4 text-gray-600 text-sm" onClick={() => setIsMobileMenuOpen(false)}>Physical Art</Link>
                            <Link href="/shop/digital" className="block pl-4 text-gray-600 text-sm" onClick={() => setIsMobileMenuOpen(false)}>Digital Assets</Link>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Creative Services</p>
                            <Link href="/services" className="block pl-4" onClick={() => setIsMobileMenuOpen(false)}>All Services</Link>
                            <Link href="/workshops" className="block pl-4 text-gray-600 text-sm" onClick={() => setIsMobileMenuOpen(false)}>Workshops</Link>
                        </div>

                        <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>

                        <div className="border-t pt-6 mt-2 space-y-4">
                            {!session ? (
                                <>
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-gray-100 py-3 rounded-lg">Sign In</Link>
                                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-black text-white py-3 rounded-lg">Register</Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block">My Profile</Link>
                                    <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="text-red-600 text-left">Sign Out</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
