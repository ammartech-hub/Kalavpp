'use client';

import { useState } from 'react';
import { Filter, ChevronDown, ShoppingBag, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const categories = [
    "All Products",
    "Original Artworks",
    "Digital Art Products",
    "Merchandise",
    "Workshop",
    "Prints & Reproductions",
    "Handcrafted Items",
    "Traditional & Tribal Art",
    "Home Decor"
];

export default function ShopClient({ initialProducts }) {
    const [selectedCategory, setSelectedCategory] = useState("All Products");
    const [searchQuery, setSearchQuery] = useState("");
    const { addToCart } = useCart();

    const filteredProducts = initialProducts.filter(p => {
        const matchesCategory = selectedCategory === "All Products" || p.category === selectedCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">

                {/* SMART FILTER SIDEBAR */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <div className="mb-8">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search artworks..."
                                    className="w-full bg-stone-50 border-none rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-1 focus:ring-gold outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="border-t border-stone-100 pt-8">
                            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-6 flex items-center gap-2">
                                <Filter size={14} /> Categories
                            </h3>
                            <ul className="space-y-4">
                                {categories.map(cat => (
                                    <li key={cat}>
                                        <button
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`text-sm tracking-wide transition-all ${selectedCategory === cat
                                                    ? 'text-gold font-bold translate-x-2'
                                                    : 'text-gray-500 hover:text-black hover:translate-x-1'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* PRODUCT GALLERY */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-10 pb-6 border-b border-stone-100">
                        <span className="text-stone-400 text-sm font-light italic">
                            Displaying <span className="text-black font-medium">{filteredProducts.length}</span> masterpieces
                        </span>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-gray-500 cursor-pointer hover:text-black transition">
                            Sort By <ChevronDown size={14} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="group flex flex-col h-full animate-fade-in">
                                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 mb-6">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="absolute -bottom-12 left-0 right-0 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group-hover:bottom-0 flex items-center justify-center gap-2 hover:bg-gold"
                                    >
                                        <ShoppingBag size={14} /> Add to Collection
                                    </button>
                                </div>

                                <div className="flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-serif text-black group-hover:text-gold transition-colors line-clamp-1">{product.name}</h3>
                                        <span className="text-lg font-light text-stone-900 ml-4">${product.price}</span>
                                    </div>
                                    <p className="text-xs uppercase tracking-widest text-stone-400 font-bold mb-4">{product.category}</p>
                                    <p className="text-sm text-stone-500 font-light line-clamp-2 leading-relaxed mb-6">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="py-24 text-center">
                            <h3 className="text-2xl font-serif text-stone-300">No results found for your selection.</h3>
                            <button
                                onClick={() => { setSelectedCategory("All Products"); setSearchQuery(""); }}
                                className="mt-6 text-gold text-sm font-bold uppercase tracking-widest border-b border-gold pb-1"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
