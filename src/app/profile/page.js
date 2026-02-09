'use client';

import { useSession } from 'next-auth/react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useState } from 'react';
import { Package, Download, User, MapPin, Calendar, Clock, FileText } from 'lucide-react';
import Link from 'next/link';

export default function Profile() {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock Profile Data (In real app, fetch from /api/user/me)
    const [profile, setProfile] = useState({
        address: '123 Art Street, Creative City, 400001',
        phone: '+91 98765 43210'
    });

    useEffect(() => {
        if (session?.user?.email) {
            fetchOrders(session.user.email);
        }
    }, [session]);

    const fetchOrders = async (email) => {
        try {
            const res = await fetch(`/api/orders/user?email=${email}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setOrders(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'unauthenticated') {
        return (
            <main>
                <Navigation />
                <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
                    <h2 className="text-2xl font-serif mb-4">Access Denied</h2>
                    <p className="mb-6">Please sign in to view your profile.</p>
                    <Link href="/login" className="btn-primary">Sign In</Link>
                </div>
                <Footer />
            </main>
        );
    }

    // Filter for Digital Downloads
    const digitalOrders = orders.flatMap(o =>
        o.items.filter(i => i.category === 'Digital Art Products' || i.category === 'Workshop')
            .map(i => ({ ...i, orderDate: o.date, orderId: o.id }))
    );

    // Filter for Bookings (Workshops)
    const bookings = orders.flatMap(o =>
        o.items.filter(i => i.category === 'Workshop')
            .map(i => ({ ...i, orderDate: o.date, orderId: o.id }))
    );

    return (
        <main className="bg-gray-50 min-h-screen">
            <Navigation />

            <div className="container mx-auto px-6 py-12 max-w-6xl">
                <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                    {/* Sidebar */}
                    <aside className="w-full md:w-64 bg-gray-100 p-6 border-r">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-gray-600">
                                {session.user.name.charAt(0)}
                            </div>
                            <h2 className="text-lg font-bold text-center">{session.user.name}</h2>
                            <p className="text-sm text-gray-500 text-center">{session.user.email}</p>
                            <span className="mt-2 text-xs bg-black text-white px-2 py-1 rounded uppercase tracking-wider">
                                {session.user.role}
                            </span>
                        </div>

                        <nav className="space-y-1">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded transition-colors ${activeTab === 'profile' ? 'bg-white shadow text-black' : 'text-gray-600 hover:bg-gray-200'}`}
                            >
                                <User size={18} /> My Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded transition-colors ${activeTab === 'orders' ? 'bg-white shadow text-black' : 'text-gray-600 hover:bg-gray-200'}`}
                            >
                                <Package size={18} /> Order History
                            </button>
                            <button
                                onClick={() => setActiveTab('downloads')}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded transition-colors ${activeTab === 'downloads' ? 'bg-white shadow text-black' : 'text-gray-600 hover:bg-gray-200'}`}
                            >
                                <Download size={18} /> Digital Downloads
                            </button>
                            <button
                                onClick={() => setActiveTab('bookings')}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded transition-colors ${activeTab === 'bookings' ? 'bg-white shadow text-black' : 'text-gray-600 hover:bg-gray-200'}`}
                            >
                                <Calendar size={18} /> Workshop Bookings
                            </button>
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1 p-8 overflow-y-auto">

                        {activeTab === 'profile' && (
                            <div>
                                <h3 className="text-2xl font-serif mb-6 border-b pb-2">Profile & Address Management</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input type="text" value={session.user.name} readOnly className="w-full p-2 border rounded bg-gray-50 text-gray-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input type="email" value={session.user.email} readOnly className="w-full p-2 border rounded bg-gray-50 text-gray-500" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                                        <textarea
                                            rows={3}
                                            value={profile.address}
                                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                            className="w-full p-2 border rounded focus:ring-black focus:border-black"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            className="w-full p-2 border rounded focus:ring-black focus:border-black"
                                        />
                                    </div>
                                </div>
                                <button className="mt-6 btn-primary px-6 py-2">Save Changes</button>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div>
                                <h3 className="text-2xl font-serif mb-6 border-b pb-2">Order History & Invoices</h3>
                                {loading ? <p>Loading orders...</p> : orders.length === 0 ? (
                                    <p className="text-gray-500">No past orders found.</p>
                                ) : (
                                    <div className="space-y-6">
                                        {orders.map(order => (
                                            <div key={order.id} className="border rounded-lg p-6 bg-white hover:shadow-md transition">
                                                <div className="flex justify-between items-start mb-4 border-b pb-4">
                                                    <div>
                                                        <p className="font-bold text-lg">Order #{order.id}</p>
                                                        <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-lg">${order.total}</p>
                                                        <span className="inline-block px-2 py-1 text-xs font-bold text-green-800 bg-green-100 rounded-full mt-1">
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="font-medium text-sm">{item.name}</p>
                                                                <p className="text-xs text-gray-500">Qty: {item.quantity || 1} x ${item.price}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-4 pt-4 border-t flex justify-end">
                                                    <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                                        <FileText size={14} /> Download Invoice
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'downloads' && (
                            <div>
                                <h3 className="text-2xl font-serif mb-6 border-b pb-2">Digital Downloads</h3>
                                {digitalOrders.length === 0 ? (
                                    <p className="text-gray-500">You haven't purchased any digital items yet.</p>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4">
                                        {digitalOrders.filter(i => i.category === 'Digital Art Products').map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 border rounded bg-blue-50 border-blue-100">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white rounded-lg border border-blue-200">
                                                        <Download className="text-blue-500" size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold">{item.name}</h4>
                                                        <p className="text-xs text-gray-500">Purchased on {new Date(item.orderDate).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <button className="btn-primary py-2 px-4 shadow-sm text-sm">Download Now</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'bookings' && (
                            <div>
                                <h3 className="text-2xl font-serif mb-6 border-b pb-2">Workshop Bookings</h3>
                                {bookings.length === 0 ? (
                                    <p className="text-gray-500">No upcoming workshops booked.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {bookings.map((item, idx) => (
                                            <div key={idx} className="border rounded-lg p-4 flex flex-col sm:flex-row gap-6 relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                                                <div className="sm:w-32 h-24 bg-gray-200 rounded overflow-hidden shrink-0">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-lg mb-2">{item.name}</h4>
                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                        <div className="flex items-center gap-1"><Calendar size={14} /> {item.description?.split('|')[1]?.replace('Date:', '').trim() || 'TBD'}</div>
                                                        <div className="flex items-center gap-1"><User size={14} /> {item.description?.split('|')[0]?.replace('Instructor:', '').trim() || 'TBD'}</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold text-center mb-2">CONFIRMED</span>
                                                    <button className="text-xs text-gray-500 hover:text-black underline">View Details</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
