'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ShoppingBag, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    const isActive = (path) => pathname === path ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navigation />
            <div className="flex flex-1 container mx-auto px-4 py-8">
                {/* Sidebar */}
                <aside className="w-64 bg-white rounded-lg shadow-sm border p-4 mr-8 hidden md:block h-fit sticky top-24">
                    <div className="mb-6 px-4">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Admin Console</h2>
                    </div>
                    <nav className="space-y-1">
                        <Link href="/admin" className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md ${isActive('/admin')}`}>
                            <LayoutDashboard size={18} /> Dashboard Overview
                        </Link>
                        <Link href="/admin/products" className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md ${isActive('/admin/products')}`}>
                            <ShoppingBag size={18} /> Manage Products
                        </Link>
                        <Link href="/admin/vendors" className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md ${isActive('/admin/vendors')}`}>
                            <Users size={18} /> Vendor & Users
                        </Link>
                        {/* <Link href="/admin/settings" className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md ${isActive('/admin/settings')}`}>
                            <Settings size={18} /> Platform Settings
                        </Link> */}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}
