'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Palette, PenTool, BookOpen, Layers, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
    {
        title: "Customized & Commission Art",
        category: "Visual Arts",
        description: "From realistic oil portraits to contemporary digital illustrations. We bridge your vision with world-class artistic execution.",
        icon: <Palette size={24} />,
        link: "/services/custom",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200"
    },
    {
        title: "Limited Edition Installations",
        category: "Exhibition",
        description: "Curation of large-scale sculptures and exclusive signed series for corporate spaces and private collectors.",
        icon: <Layers size={24} />,
        link: "/services/limited",
        image: "https://images.unsplash.com/photo-1551893478-d726eaf0442c?q=80&w=1200"
    },
    {
        title: "Professional Art Curation",
        category: "Consultancy",
        description: "Strategic art direction for publishing, branding, and exhibition design. Elevate your brand with authentic artistry.",
        icon: <PenTool size={24} />,
        link: "/services/preorder",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=1200"
    },
    {
        title: "Masterclass Workshops",
        category: "Education",
        description: "Intensive certificate courses and offline workshops led by industry experts. Master the craft of traditional and modern art.",
        icon: <BookOpen size={24} />,
        link: "/services/educational",
        image: "https://images.unsplash.com/photo-1565193566173-0923d5a6c559?q=80&w=1200"
    }
];

export default function Services() {
    return (
        <main className="bg-[#FAFAFA]">
            <Navigation />

            {/* HERO */}
            <section className="relative h-[60vh] flex items-center bg-black overflow-hidden">
                <div className="absolute inset-0 opacity-50">
                    <Image
                        src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1600"
                        alt="Background"
                        fill
                        className="object-cover grayscale"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>

                <div className="relative z-10 container mx-auto px-6">
                    <span className="text-gold uppercase tracking-[0.3em] text-sm font-bold mb-4 block">Our Ecosystem</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Creative <span className="italic">Services</span></h1>
                    <p className="text-gray-300 max-w-xl text-lg font-light leading-relaxed">
                        Beyond the marketplace, Kalavpp provides a dedicated framework for bespoke artistic collaboration and education.
                    </p>
                </div>
            </section>

            {/* SERVICES LIST - SMART GRID */}
            <section className="py-24 container mx-auto px-6">
                <div className="grid grid-cols-1 gap-24">
                    {services.map((service, index) => (
                        <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
                            {/* Image Part */}
                            <div className="flex-1 w-full">
                                <div className="relative aspect-[16/9] overflow-hidden group">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                                </div>
                            </div>

                            {/* Text Part */}
                            <div className="flex-1 max-w-xl">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold">
                                        {service.icon}
                                    </div>
                                    <span className="text-gold font-bold tracking-widest text-xs uppercase">{service.category}</span>
                                </div>
                                <h2 className="text-4xl font-serif mb-6 text-black">{service.title}</h2>
                                <p className="text-gray-600 text-lg mb-8 leading-relaxed font-light">
                                    {service.description}
                                </p>
                                <Link href={service.link} className="inline-flex items-center gap-3 text-black font-bold uppercase tracking-widest text-xs border-b border-black pb-2 hover:text-gold hover:border-gold transition">
                                    Explore Framework <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="bg-black text-white py-24">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-serif mb-8 text-gold">Have a Vision?</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg font-light leading-relaxed">
                        If you're looking for something uniquely yours that isn't listed above, our curation team is ready to help you bring it to life.
                    </p>
                    <Link href="/about" className="inline-block bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-white transition-all">
                        Consult Our Curators
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
