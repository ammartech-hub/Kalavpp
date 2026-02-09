'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from 'react';

export default function SellWithUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        portfolio: '',
        bio: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        console.log("Registering artist:", formData);
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    return (
        <main>
            <Navigation />

            <section className="py-20 bg-gray-50" style={{ padding: '5rem 0', background: '#f9f9f7' }}>
                <div className="container mx-auto px-4 max-w-2xl" style={{ maxWidth: '700px', margin: '0 auto', padding: '0 1rem' }}>

                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-serif mb-4">Join Our Creator Community</h1>
                        <p className="text-gray-600">
                            Showcase your work to a global audience of collectors and art enthusiasts.
                            Apply now to become a verified seller on ArtCommerce.
                        </p>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg" style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>

                            <div className="mb-6">
                                <label className="block mb-2 font-medium">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-3 border rounded focus:outline-none focus:border-amber-500"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block mb-2 font-medium">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full p-3 border rounded focus:outline-none focus:border-amber-500"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block mb-2 font-medium">Portfolio / Social Media URL</label>
                                <input
                                    type="url"
                                    placeholder="https://instagram.com/yourhandle"
                                    className="w-full p-3 border rounded focus:outline-none focus:border-amber-500"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    value={formData.portfolio}
                                    onChange={e => setFormData({ ...formData, portfolio: e.target.value })}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block mb-2 font-medium">Artist Bio & Statement</label>
                                <textarea
                                    rows={5}
                                    required
                                    className="w-full p-3 border rounded focus:outline-none focus:border-amber-500"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    value={formData.bio}
                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full btn-primary py-3 font-bold text-lg"
                                style={{ width: '100%' }}
                            >
                                Submit Application
                            </button>
                        </form>
                    ) : (
                        <div className="bg-white p-12 rounded-lg shadow text-center" style={{ background: 'white', padding: '3rem', borderRadius: '8px', textAlign: 'center' }}>
                            <h3 className="text-2xl font-serif text-green-600 mb-4" style={{ color: '#2ecc71', fontSize: '1.5rem', marginBottom: '1rem' }}>Application Received!</h3>
                            <p className="text-gray-600 mb-6">
                                Thank you, {formData.name}. Our curation team will review your portfolio and get back to you within 48 hours.
                            </p>
                            <button onClick={() => setSubmitted(false)} className="btn-secondary">Submit another</button>
                        </div>
                    )}

                </div>
            </section>

            <Footer />
        </main>
    );
}
