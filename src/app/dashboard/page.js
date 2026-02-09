'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { LayoutDashboard, Package, BarChart3, Settings, Plus, ShoppingBag, Palette, FileText, Image as ImageIcon } from 'lucide-react';

export default function Dashboard() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState('Overview');
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    // Form State
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: 'Original Artworks', // Default
        price: '',
        image: '',
        description: '',
        type: 'PHYSICAL' // PHYSICAL, DIGITAL, SERVICE
    });

    // Mock specific stats
    const stats = {
        revenue: 1250,
        orders: 5,
        products: products.length,
        views: 340
    };

    useEffect(() => {
        // Fetch products owned by this artist (mock: fetch all and filter by some imaginary ownerId or just show all for demo)
        // For demo purposes, we will fetch all products and pretend they are the user's.
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newProduct,
                    price: parseFloat(newProduct.price),
                    // If Digital, maybe add a mock downloadUrl
                    downloadUrl: newProduct.type === 'DIGITAL' ? 'https://example.com/download-mock' : undefined
                })
            });
            if (res.ok) {
                const created = await res.json();
                setProducts([...products, created]);
                setShowAddForm(false);
                setNewProduct({ name: '', category: 'Original Artworks', price: '', image: '', description: '', type: 'PHYSICAL' });
                alert('Product listed successfully!');
            }
        } catch (err) {
            alert('Failed to list product');
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navigation />

            <div className="flex flex-1 container mx-auto px-4 py-8 gap-8">

                {/* Sidebar */}
                <aside className="w-64 bg-white rounded-lg shadow-sm border p-4 h-fit sticky top-24 hidden md:block">
                    <div className="flex items-center gap-3 mb-8 px-2">
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                            {session?.user?.name?.charAt(0) || 'A'}
                        </div>
                        <div>
                            <p className="font-bold text-sm truncate w-32">{session?.user?.name}</p>
                            <p className="text-xs text-gray-500">Verified Artist</p>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        {['Overview', 'Products', 'Orders', 'Commissions', 'Digital Assets'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab); setShowAddForm(false); }}
                                className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 transition-colors ${activeTab === tab ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                {tab === 'Overview' && <LayoutDashboard size={18} />}
                                {tab === 'Products' && <Package size={18} />}
                                {tab === 'Orders' && <ShoppingBag size={18} />}
                                {tab === 'Commissions' && <Palette size={18} />}
                                {tab === 'Digital Assets' && <FileText size={18} />}
                                {tab}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Content */}
                <div className="flex-1 bg-white rounded-lg shadow-sm border p-8 min-h-[600px]">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-serif font-bold">{activeTab}</h1>
                        {activeTab === 'Products' && !showAddForm && (
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="btn-primary flex items-center gap-2 text-sm px-4 py-2"
                            >
                                <Plus size={16} /> Add New Listing
                            </button>
                        )}
                    </div>

                    {/* OVERVIEW TAB */}
                    {activeTab === 'Overview' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="p-4 bg-green-50 rounded border border-green-100">
                                    <p className="text-xs text-green-800 uppercase font-bold mb-1">Total Revenue</p>
                                    <h3 className="text-2xl font-bold">${stats.revenue}</h3>
                                </div>
                                <div className="p-4 bg-blue-50 rounded border border-blue-100">
                                    <p className="text-xs text-blue-800 uppercase font-bold mb-1">Total Orders</p>
                                    <h3 className="text-2xl font-bold">{stats.orders}</h3>
                                </div>
                                <div className="p-4 bg-purple-50 rounded border border-purple-100">
                                    <p className="text-xs text-purple-800 uppercase font-bold mb-1">Active Listings</p>
                                    <h3 className="text-2xl font-bold">{products.length}</h3>
                                </div>
                                <div className="p-4 bg-orange-50 rounded border border-orange-100">
                                    <p className="text-xs text-orange-800 uppercase font-bold mb-1">Profile Views</p>
                                    <h3 className="text-2xl font-bold">{stats.views}</h3>
                                </div>
                            </div>

                            <div className="border rounded-lg p-6">
                                <h3 className="font-bold mb-4">Recent Activity</h3>
                                <p className="text-gray-500 text-sm">No recent activity to display.</p>
                            </div>
                        </div>
                    )}

                    {/* PRODUCTS TAB */}
                    {activeTab === 'Products' && (
                        <>
                            {showAddForm ? (
                                <div className="max-w-2xl">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-bold">Create New Listing</h3>
                                        <button onClick={() => setShowAddForm(false)} className="text-sm text-gray-500 hover:text-black">Cancel</button>
                                    </div>
                                    <form onSubmit={handleAddProduct} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Listing Type</label>
                                            <div className="flex gap-4">
                                                {['PHYSICAL', 'DIGITAL', 'SERVICE'].map(type => (
                                                    <label key={type} className={`flex-1 border rounded p-3 text-center cursor-pointer transition-colors ${newProduct.type === type ? 'bg-black text-white border-black' : 'hover:bg-gray-50'}`}>
                                                        <input
                                                            type="radio"
                                                            name="type"
                                                            value={type}
                                                            checked={newProduct.type === type}
                                                            onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                                                            className="hidden"
                                                        />
                                                        <span className="text-sm font-bold">{type}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Product Name</label>
                                            <input
                                                required
                                                className="w-full p-2 border rounded"
                                                value={newProduct.name}
                                                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Category</label>
                                                <select
                                                    className="w-full p-2 border rounded"
                                                    value={newProduct.category}
                                                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                                >
                                                    <option>Original Artworks</option>
                                                    <option>Prints & Reproductions</option>
                                                    <option>Digital Art Products</option>
                                                    <option>Home Decor</option>
                                                    <option>Commission Service</option>
                                                    <option>Workshop</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Price ($)</label>
                                                <input
                                                    required
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    className="w-full p-2 border rounded"
                                                    value={newProduct.price}
                                                    onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Image URL</label>
                                            <input
                                                required
                                                type="url"
                                                placeholder="https://images.unsplash.com/..."
                                                className="w-full p-2 border rounded"
                                                value={newProduct.image}
                                                onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Use a hosted image URL.</p>
                                        </div>

                                        {newProduct.type === 'DIGITAL' && (
                                            <div className="p-4 bg-blue-50 rounded border border-blue-100">
                                                <h4 className="font-bold text-sm text-blue-800 mb-2 flex items-center gap-2">
                                                    <ImageIcon size={14} /> Digital Asset Upload
                                                </h4>
                                                <div className="border-2 border-dashed border-blue-200 bg-white p-6 rounded text-center cursor-pointer hover:bg-blue-50 transition-colors">
                                                    <p className="text-sm text-blue-600">Click to upload mock file (simulation)</p>
                                                    <p className="text-xs text-gray-400 mt-1">Supports .zip, .png, .psd</p>
                                                </div>
                                            </div>
                                        )}

                                        <button type="submit" className="w-full btn-primary py-3">Publish Listing</button>
                                    </form>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map(p => (
                                        <div key={p.id} className="border rounded-lg overflow-hidden group">
                                            <div className="aspect-square bg-gray-100 relative">
                                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                                <div className="absolute top-2 right-2 bg-white px-2 py-1 text-xs font-bold rounded shadow">
                                                    ${p.price}
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-bold truncate">{p.name}</h4>
                                                <p className="text-xs text-gray-500">{p.category}</p>
                                                <div className="mt-3 flex gap-2">
                                                    <button className="flex-1 py-1.5 text-xs border rounded hover:bg-gray-50">Edit</button>
                                                    <button className="flex-1 py-1.5 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50">Unlist</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* COMMISSIONS TAB */}
                    {activeTab === 'Commissions' && (
                        <div className="space-y-4">
                            <div className="bg-yellow-50 p-4 rounded border border-yellow-100 text-yellow-800 flex items-start gap-3">
                                <Palette className="shrink-0 mt-1" size={18} />
                                <div>
                                    <h4 className="font-bold text-sm">Commission Requests</h4>
                                    <p className="text-sm opacity-90">Manage custom artwork requests from clients here. You can accept, reject, or negotiate terms.</p>
                                </div>
                            </div>

                            <div className="border rounded-lg p-6 text-center text-gray-500 py-12">
                                <p>No active commission requests.</p>
                                <button className="mt-4 text-blue-600 hover:underline text-sm">View Archived Requests</button>
                            </div>
                        </div>
                    )}

                    {/* ORDERS TAB */}
                    {activeTab === 'Orders' && (
                        <div>
                            <p className="text-gray-500">Order management view for selling artists.</p>
                            {/* Mock order list similar to admin view but filtered */}
                        </div>
                    )}

                    {/* DIGITAL ASSETS TAB */}
                    {activeTab === 'Digital Assets' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold">My Digital Library</h3>
                                <button className="text-sm bg-gray-100 px-3 py-2 rounded hover:bg-gray-200">Upload New Asset</button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="border rounded p-4 flex flex-col items-center justify-center gap-2 aspect-square hover:bg-gray-50 cursor-pointer">
                                        <FileText size={32} className="text-gray-400" />
                                        <span className="text-xs text-gray-500">asset-bundle-{i}.zip</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </main>
    );
}
