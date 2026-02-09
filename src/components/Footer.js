import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

                {/* BRAND & STORY */}
                <div>
                    <h3 className="text-3xl font-serif text-gold mb-8 italic">Kalavpp</h3>
                    <p className="text-stone-400 font-light leading-relaxed mb-8">
                        The definitive ecosystem for contemporary art and creative services. We bridge the gap between masterpiece creation and curated acquisition.
                    </p>
                    <div className="flex gap-4">
                        <Link href="/contact" className="text-stone-500 hover:text-gold transition">
                            <Mail size={18} />
                        </Link>
                        <Instagram size={18} className="text-stone-500 hover:text-gold cursor-pointer transition" />
                        <Twitter size={18} className="text-stone-500 hover:text-gold cursor-pointer transition" />
                    </div>
                </div>

                {/* VISUAL GALLERY (Required Columns) */}
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-8">Latest Artworks</h4>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            "https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?q=80&w=200",
                            "https://images.unsplash.com/photo-1551893478-d726eaf0442c?q=80&w=200",
                            "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=200",
                            "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=200",
                            "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=200",
                            "https://images.unsplash.com/photo-1565193566173-0923d5a6c559?q=80&w=200"
                        ].map((src, i) => (
                            <div key={i} className="relative aspect-square overflow-hidden bg-stone-900 group">
                                <img src={src} className="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-110 transition duration-500" alt="Gallery" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ECOSYSTEM LINKS */}
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-8">The Platform</h4>
                    <ul className="space-y-4">
                        <li><Link href="/shop" className="text-stone-300 hover:text-gold text-sm font-light transition">ArtCommerce Marketplace</Link></li>
                        <li><Link href="/services" className="text-stone-300 hover:text-gold text-sm font-light transition">Creative Services Portal</Link></li>
                        <li><Link href="/workshops" className="text-stone-300 hover:text-gold text-sm font-light transition">Educational Masterclasses</Link></li>
                        <li><Link href="/sell" className="text-stone-300 hover:text-gold text-sm font-light transition">Artist Registration</Link></li>
                    </ul>
                </div>

                {/* CONCIERGE */}
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-8">Art Concierge</h4>
                    <p className="text-white/60 text-sm mb-6 font-light">Join our inner circle for exclusive art drops and curations.</p>
                    <NewsletterForm />
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <span className="text-[10px] uppercase tracking-widest text-white/30">&copy; {new Date().getFullYear()} Kalavpp Platform. Fine Art & Commerce.</span>
                <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/30">
                    <Link href="/privacy" className="hover:text-gold">Privacy</Link>
                    <Link href="/terms" className="hover:text-gold">Terms</Link>
                    <Link href="/shipping" className="hover:text-gold">Shipping</Link>
                </div>
            </div>
        </footer>
    );
}
