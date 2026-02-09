'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (err) {
            setStatus('idle');
        }
    };

    return (
        <main className="bg-white">
            <Navigation />

            {/* HERO */}
            <section className="bg-black text-white py-32 border-b border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block font-sans">Reach Out</span>
                    <h1 className="text-5xl md:text-7xl font-serif mb-8 italic">Contact the <span className="text-gold not-italic">Concierge</span></h1>
                    <p className="text-stone-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Whether you are looking for a bespoke commission, gallery installation, or brand collaboration—our team is here to guide the conversation.
                    </p>
                </div>
            </section>

            <section className="py-24 container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

                    {/* INFO */}
                    <div className="space-y-16">
                        <div>
                            <h2 className="text-3xl font-serif mb-8 italic">Global Presence</h2>
                            <p className="text-stone-500 font-light leading-relaxed mb-12">
                                We operate across major art hubs, bridging the gap between digital innovation and physical curation.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-6">
                                    <div className="p-4 bg-stone-50 text-gold rounded-full">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-1">Email Inquiries</h4>
                                        <p className="text-stone-500 font-light">concierge@kalavpp.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="p-4 bg-stone-50 text-gold rounded-full">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-1">Direct Line</h4>
                                        <p className="text-stone-500 font-light">+1 (555) ART-CORE</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="p-4 bg-stone-50 text-gold rounded-full">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-1">Headquarters</h4>
                                        <p className="text-stone-500 font-light">4th Floor, The Creative Collective<br />Mumbai, MH 400001</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FORM */}
                    <div className="bg-stone-50 p-12 border border-stone-100">
                        <h3 className="text-2xl font-serif mb-8 uppercase tracking-widest text-black/80">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full bg-white border border-stone-200 p-4 text-sm focus:border-gold outline-none transition"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Your Address"
                                    className="w-full bg-white border border-stone-200 p-4 text-sm focus:border-gold outline-none transition"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full bg-white border border-stone-200 p-4 text-sm focus:border-gold outline-none transition"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="How can we help?"
                                rows="5"
                                className="w-full bg-white border border-stone-200 p-4 text-sm focus:border-gold outline-none transition"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            ></textarea>

                            <button
                                type="submit"
                                disabled={status !== 'idle'}
                                className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-gold transition-all flex items-center justify-center gap-3"
                            >
                                {status === 'loading' ? 'Transmitting...' : (status === 'success' ? <Check size={14} /> : 'Send Request')}
                                {status === 'idle' && <Send size={14} />}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
