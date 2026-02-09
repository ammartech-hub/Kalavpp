'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Star, ShoppingBag, Palette } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    return (
        <main className="bg-stone-50 selection:bg-gold selection:text-white">
            <Navigation />

            {/* HERO SECTION */}
            <section className="relative h-screen min-h-[800px] w-full overflow-hidden flex items-center justify-center bg-[#111] text-white">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image
                        src="/images/temp/mumbai-sculpture.jpg"
                        alt="Background Art"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black/60" />

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-serif tracking-widest uppercase mb-6 animate-fade-in text-gold">
                        Welcome to Kalavpp
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-8 leading-tight animate-slide-up">
                        Where Culture <br /> Meets <span className="text-gold italic">Commerce</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                        Discover a curated ecosystem of original masterpieces, digital assets, and bespoke creative services. The new standard for art.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/shop" className="btn-primary rounded-full px-10 py-4 text-sm tracking-widest uppercase bg-white text-black hover:bg-gold hover:text-white transition-all duration-300">
                            Explore Collection
                        </Link>
                        <Link href="/services" className="px-10 py-4 text-sm tracking-widest uppercase border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                            Our Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* CURATED COLLECTION (New Arrivals) */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="text-4xl font-serif text-black mb-2">Curated Arrivals</h2>
                            <p className="text-gray-500 font-light">Handpicked masterpieces from our latest exhibition.</p>
                        </div>
                        <Link href="/shop" className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gold hover:border-gold transition">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
                        {/* Artwork 1 */}
                        <div className="group cursor-pointer">
                            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-6">
                                <Image
                                    src="/images/temp/relief-art.jpg"
                                    alt="Ancient Scripts"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 bg-white text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">
                                    Original
                                </div>
                            </div>
                            <h3 className="text-2xl font-serif mb-1 group-hover:text-gold transition-colors">Ancient Scripts</h3>
                            <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Mixed Media Relief</p>
                            <p className="text-lg font-medium">$1,200.00</p>
                        </div>

                        {/* Artwork 2 */}
                        <div className="group cursor-pointer lg:translate-y-12">
                            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-6">
                                <Image
                                    src="/images/temp/bird-nest.jpg"
                                    alt="Hungry Nestlings"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-2xl font-serif mb-1 group-hover:text-gold transition-colors">Hungry Nestlings</h3>
                            <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Fine Art Photography</p>
                            <p className="text-lg font-medium">$85.00</p>
                        </div>

                        {/* Artwork 3 */}
                        <div className="group cursor-pointer">
                            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-6">
                                <Image
                                    src="/images/temp/quilling-portrait.jpg"
                                    alt="Mangesh Padgaonkar Portrait"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-black/80 text-white backdrop-blur-md text-xs font-bold px-3 py-1 uppercase tracking-widest">
                                    Best Seller
                                </div>
                            </div>
                            <h3 className="text-2xl font-serif mb-1 group-hover:text-gold transition-colors">Literary Tribute</h3>
                            <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Paper Quilling Art</p>
                            <p className="text-lg font-medium">$950.00</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* DUAL COMMERCE SECTION */}
            <section className="py-32 bg-stone-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <div className="relative aspect-square lg:aspect-[4/5]">
                            <Image
                                src="/images/temp/foundry-boy.jpg"
                                alt="Services"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-white p-6 flex flex-col justify-center shadow-2xl z-10 hidden md:flex">
                                <span className="text-4xl font-serif font-bold text-gold">50+</span>
                                <span className="text-sm text-gray-500 uppercase tracking-widest mt-2">Active Artists</span>
                            </div>
                        </div>

                        <div>
                            <span className="text-gold text-sm font-bold uppercase tracking-widest mb-4 block">The Kalavpp Ecosystem</span>
                            <h2 className="text-5xl font-serif mb-8 leading-tight">More Than Just A <br /> Marketplace.</h2>
                            <p className="text-gray-600 text-lg mb-8 font-light leading-relaxed">
                                We bridge the gap between creation and acquisition. Experience our two distinct verticals designed for the modern connoisseur.
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                                        <ShoppingBag size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-serif font-bold mb-2">ArtCommerce</h4>
                                        <p className="text-gray-500">Shop curated physical artworks, limited edition prints, and exclusive digital assets directly from creators.</p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-full border border-black text-black flex items-center justify-center shrink-0">
                                        <Palette size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-serif font-bold mb-2">Creative Services</h4>
                                        <p className="text-gray-500">Commission bespoke pieces, book workshops, or hire artists for large-scale installations.</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/services" className="inline-block mt-12 text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gold hover:border-gold transition">
                                Explore Services Framework
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* SCROLLING BANNER */}
            <div className="bg-gold py-4 overflow-hidden">
                <div className="flex gap-12 animate-marquee whitespace-nowrap text-white font-serif italic text-2xl">
                    <span>Original Artworks</span>
                    <span>•</span>
                    <span>Digital Assets</span>
                    <span>•</span>
                    <span>Workshops</span>
                    <span>•</span>
                    <span>Commissions</span>
                    <span>•</span>
                    <span>Original Artworks</span>
                    <span>•</span>
                    <span>Digital Assets</span>
                    <span>•</span>
                    <span>Workshops</span>
                </div>
            </div>

            <Footer />
        </main>
    );
}
