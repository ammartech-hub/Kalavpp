'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Clock, MapPin, Users, ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useCart } from "@/context/CartContext";
import Image from 'next/image';

export default function Workshops() {
    const [selectedLevel, setSelectedLevel] = useState("All Levels");
    const { addToCart } = useCart();

    const workshops = [
        {
            id: 101,
            title: "Oil Painting Masterclass",
            instructor: "Marcus Chen",
            date: "March 15, 2026",
            time: "10:00 AM - 4:00 PM",
            location: "Studio A, Downtown Gallery",
            level: "Beginner",
            price: 150,
            image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800",
            category: "Traditional Art",
            description: "Deep dive into classical oil techniques, from underpainting to glazing. All materials provided."
        },
        {
            id: 102,
            title: "Digital Sculpture with ZBrush",
            instructor: "Sarah James",
            date: "March 22, 2026",
            time: "2:00 PM - 5:00 PM",
            location: "Online Interactive",
            level: "Intermediate",
            price: 75,
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800",
            category: "Digital Assets",
            description: "Master the industry-standard software for organic modeling and digital sculpture."
        },
        {
            id: 103,
            title: "Avant-Garde Ceramics",
            instructor: "Elena Vance",
            date: "April 5, 2026",
            time: "11:00 AM - 3:00 PM",
            location: "The Clay Hub",
            level: "All Levels",
            price: 120,
            image: "https://images.unsplash.com/photo-1565193566173-0923d5a6c559?q=80&w=800",
            category: "Handcrafted",
            description: "Explore unconventional forms and glazing techniques in this hands-on workshop."
        }
    ];

    const filteredWorkshops = selectedLevel === "All Levels"
        ? workshops
        : workshops.filter(w => w.level === selectedLevel || w.level === "All Levels");

    const handleBook = (workshop) => {
        const cartItem = {
            id: `workshop-${workshop.id}`,
            name: workshop.title,
            price: workshop.price,
            image: workshop.image,
            category: 'Workshop',
            description: `Instructor: ${workshop.instructor} | Date: ${workshop.date}`
        };
        addToCart(cartItem);
    };

    return (
        <main className="bg-white">
            <Navigation />

            {/* HERO - GOLD ACCENT */}
            <div className="relative bg-black text-white py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <img
                        src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600"
                        className="w-full h-full object-cover grayscale"
                        alt="Art Background"
                    />
                </div>
                <div className="relative z-10 container mx-auto px-6 text-center">
                    <span className="inline-block text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 border-b border-gold/30 pb-2">Institutional Education</span>
                    <h1 className="text-5xl md:text-7xl font-serif mb-8 italic">Master the <span className="text-gold not-italic">Craft</span></h1>
                    <p className="text-stone-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Curated certificate courses and immersive workshops led by the world's most distinguished artists and curators.
                    </p>
                </div>
            </div>

            {/* WORKSHOP GRID - SMART DESIGN */}
            <div className="container mx-auto px-6 py-24">

                {/* FILTER BAR */}
                <div className="flex flex-wrap justify-center gap-4 mb-20">
                    {['All Levels', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
                        <button
                            key={level}
                            onClick={() => setSelectedLevel(level)}
                            className={`px-8 py-2 text-[10px] uppercase tracking-widest font-bold transition-all border ${selectedLevel === level
                                    ? 'bg-black text-white border-black'
                                    : 'bg-transparent text-stone-400 border-stone-200 hover:text-black hover:border-black'
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
                    {filteredWorkshops.map(workshop => (
                        <div key={workshop.id} className="group flex flex-col bg-white border border-stone-100 p-4 hover:border-gold transition-all duration-300">
                            <div className="relative aspect-[4/3] overflow-hidden mb-8">
                                <img src={workshop.image} alt={workshop.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[8px] font-bold uppercase tracking-widest text-black">
                                    {workshop.category}
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-serif text-black group-hover:text-gold transition-colors">{workshop.title}</h3>
                                    <span className="text-lg font-light text-stone-900">${workshop.price}</span>
                                </div>

                                <p className="text-stone-500 text-sm font-light mb-8 line-clamp-2 italic">
                                    "{workshop.description}"
                                </p>

                                <div className="space-y-4 mb-10 pt-6 border-t border-stone-100">
                                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                                        <Calendar size={14} className="text-gold" /> {workshop.date}
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                                        <MapPin size={14} className="text-gold" /> {workshop.location}
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-gold font-bold">
                                        <Sparkles size={14} /> Limited Spots Remaining
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleBook(workshop)}
                                    className="mt-auto w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-gold transition-all flex items-center justify-center gap-3"
                                >
                                    Book Enrollment <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
