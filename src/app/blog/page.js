import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

const posts = [
    {
        slug: 'resurgence-of-physical-art',
        title: "The Resurgence of Physical Art in a Digital Age",
        excerpt: "Why collectors are returning to tangible textures and canvas in 2026 despite the metaverse boom.",
        date: "February 2, 2026",
        author: "Elena Vance",
        category: "Art Market",
        image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=1000"
    },
    {
        slug: 'collecting-101',
        title: "Collecting 101: How to Start Your Art Collection",
        excerpt: "A beginner's guide to understanding value, provenance, and finding pieces that resonate with you.",
        date: "January 28, 2026",
        author: "Archive Admin",
        category: "Guide",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000"
    },
    {
        slug: 'sustainable-studio-practices',
        title: "Sustainable Studio Practices",
        excerpt: "How modern artists are reducing waste and choosing eco-friendly materials for their creations.",
        date: "January 15, 2026",
        author: "Marcus Chen",
        category: "Sustainability",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000"
    },
    {
        slug: 'interior-design-art',
        title: "Curating Art for Minimalist Spaces",
        excerpt: "Tips on selecting bold pieces that compliment rather than clutter modern interior designs.",
        date: "December 10, 2025",
        author: "Sarah James",
        category: "Interior Design",
        image: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=1000"
    }
];

export default function Blog() {
    return (
        <main>
            <Navigation />

            {/* Header */}
            <div className="bg-stone-50 py-24 text-center border-b" style={{ backgroundColor: '#faf9f6' }}>
                <h1 className="text-5xl font-serif mb-6" style={{ fontFamily: 'var(--font-heading)' }}>The Journal</h1>
                <p className="text-gray-500 max-w-2xl mx-auto px-4 text-lg">
                    Stories, interviews, and insights from the world of contemporary art and curation.
                </p>
            </div>

            {/* Featured Grid */}
            <div className="container mx-auto px-6 py-16" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>

                    {posts.map((post, index) => (
                        <Link href={`/blog/${post.slug}`} key={index} className="group cursor-pointer">
                            <div className="overflow-hidden rounded-lg mb-6 aspect-[16/9]" style={{ borderRadius: '8px', overflow: 'hidden', aspectRatio: '16/9', marginBottom: '1.5rem' }}>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            <div className="flex items-center gap-4 text-xs font-bold text-amber-800 uppercase tracking-widest mb-3" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', fontWeight: 700, color: '#8d6e63', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                                <span>{post.category}</span>
                                <span className="text-gray-300">•</span>
                                <span className="text-gray-500 font-medium normal-case flex items-center gap-1">
                                    <Calendar size={12} /> {post.date}
                                </span>
                            </div>

                            <h2 className="text-3xl font-serif font-bold mb-3 group-hover:text-amber-700 transition-colors" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem' }}>
                                {post.title}
                            </h2>

                            <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3" style={{ color: '#4b5563', lineHeight: 1.6, marginBottom: '1rem' }}>
                                {post.excerpt}
                            </p>

                            <div className="flex items-center gap-2 font-medium text-sm group-hover:translate-x-1 transition-transform" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>
                                Read Article <ArrowRight size={16} />
                            </div>
                        </Link>
                    ))}

                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-black text-white py-16 px-6 text-center" style={{ backgroundColor: 'black', color: 'white', padding: '4rem 1.5rem', textAlign: 'center' }}>
                <h3 className="text-2xl font-serif mb-4">Stay Inspired</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">Join our weekly newsletter for curated art news, exhibition updates, and exclusive artist interviews.</p>
                <div className="flex max-w-md mx-auto gap-2" style={{ display: 'flex', maxWidth: '400px', margin: '0 auto', gap: '0.5rem' }}>
                    <input type="email" placeholder="Enter your email" className="flex-1 p-3 text-black border-none rounded-sm outline-none" style={{ flex: 1, padding: '0.75rem', color: 'black', border: 'none', borderRadius: '2px', outline: 'none' }} />
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 font-bold uppercase tracking-wider text-sm transition-colors" style={{ background: '#d4af37', padding: '0 1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', border: 'none', cursor: 'pointer', color: 'black' }}>Subscribe</button>
                </div>
            </div>

            <Footer />
        </main>
    );
}
