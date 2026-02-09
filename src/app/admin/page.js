'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DollarSign, ShoppingBag, Users as UsersIcon, Clock, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0,
        recentOrders: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
        if (session && session.user.role !== 'ADMIN') {
            // Normally middleware handles this, but secondary check
            router.push('/');
        }
    }, [status, session, router]);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Parallel fetch for stats
                const [ordersRes, productsRes, usersRes] = await Promise.all([
                    fetch('/api/orders'), // Would need GET all orders endpoint. Currently POST/GET user specific. Let me add GET ALL to api/orders or filter. 
                    // Actually api/orders only has POST in my previous view. I need to add GET to it.
                    // Wait, I made api/orders only POST.
                    // I need to update api/orders to support GET all (for admin) or create api/admin/orders.
                    // Let's assume I'll update api/orders to return all for now or mock it if time is tight.
                    // Actually, I'll update api/orders/route.js to support GET.
                    fetch('/api/products'),
                    fetch('/api/users')
                ]);

                // Mock logic since I might not have implemented GET /api/orders yet.
                // Let's implement GET /api/orders first then come back?
                // Or I can mock the response here if I can't update.
                // No, I should update it.

                // Let's proceed assuming I will update /api/orders.
                const orders = ordersRes.ok ? await ordersRes.json() : [];
                const products = productsRes.ok ? await productsRes.json() : [];
                const users = usersRes.ok ? await usersRes.json() : [];

                const revenue = Array.isArray(orders) ? orders.reduce((acc, order) => acc + (parseFloat(order.total) || 0), 0) : 0;

                setStats({
                    totalRevenue: revenue,
                    totalOrders: Array.isArray(orders) ? orders.length : 0,
                    totalProducts: Array.isArray(products) ? products.length : 0,
                    totalUsers: Array.isArray(users) ? users.length : 0,
                    // users.filter(u => u.role === 'ARTIST').length for vendors
                    recentOrders: Array.isArray(orders) ? orders.slice(0, 5) : []
                });
            } catch (err) {
                console.error("Dashboard data load failed", err);
            } finally {
                setLoading(false);
            }
        };

        if (session?.user?.role === 'ADMIN') {
            loadData();
        }
    }, [session]);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-serif font-bold text-gray-900">Platform Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
                        <h3 className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</h3>
                    </div>
                    <div className="p-3 bg-green-50 rounded-full">
                        <DollarSign className="text-green-600" size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
                        <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-full">
                        <ShoppingBag className="text-blue-600" size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Active Products</p>
                        <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-full">
                        <TrendingUp className="text-purple-600" size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Users</p>
                        <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-full">
                        <UsersIcon className="text-orange-600" size={24} />
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-lg font-bold font-serif">Recent Orders</h2>
                    <button className="text-sm text-blue-600 hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-400 uppercase bg-stone-50">
                            <tr>
                                <th className="px-6 py-4">Art Collector</th>
                                <th className="px-6 py-4 text-center">Date</th>
                                <th className="px-6 py-4">Acquisition Amount</th>
                                <th className="px-6 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-gray-300 font-serif italic">No recent transactions recorded.</td>
                                </tr>
                            ) : (
                                stats.recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-500 overflow-hidden shrink-0 border border-stone-200">
                                                    {order.customer?.image ? (
                                                        <img src={order.customer.image} alt="User" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span>{order.customer?.name?.charAt(0) || 'G'}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-black">{order.customer?.name || 'Art Collector'}</div>
                                                    <div className="text-gray-400 text-[10px] uppercase tracking-tighter">{order.customer?.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center text-gray-500 font-light">
                                            {new Date(order.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                        </td>
                                        <td className="px-6 py-4 font-mono font-bold text-black">
                                            ${parseFloat(order.total).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-black text-white">
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
