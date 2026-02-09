'use client';

import { useState, useEffect } from 'react';
import { Package, Trash2, Edit, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            if (res.ok) {
                setProducts(await res.json());
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await fetch(`/api/products/${id}`, { method: 'DELETE' });
            fetchProducts();
        } catch (err) {
            alert('Failed to delete product');
        }
    };

    const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

    if (loading) return <div>Loading Products...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold">Product Management</h1>
                <Link href="/dashboard" className="btn-primary flex items-center gap-2 px-4 py-2 text-sm">
                    <Plus size={16} /> Add New Product
                </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 border-b pb-2 overflow-x-auto">
                {['All', 'Original Artworks', 'Prints & Reproductions', 'Home Decor', 'Digital Art Products', 'Merchandise'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${filter === cat ? 'bg-gray-100 text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 uppercase text-gray-500 text-xs">
                        <tr>
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No products found in this category.</td>
                            </tr>
                        ) : (
                            filteredProducts.map(product => (
                                <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{product.name}</td>
                                    <td className="px-6 py-4 text-gray-500 text-xs">{product.category}</td>
                                    <td className="px-6 py-4 font-bold text-gray-900">${product.price}</td>
                                    <td className="px-6 py-4 flex gap-3">
                                        <button className="text-blue-600 hover:text-blue-800" title="Edit (Coming Soon)">
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => deleteProduct(product.id)}
                                            className="text-red-500 hover:text-red-700"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
