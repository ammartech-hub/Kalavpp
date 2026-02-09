import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function About() {
    return (
        <main>
            <Navigation />

            {/* Hero */}
            <div className="relative bg-stone-100 py-32 text-center" style={{ backgroundColor: '#f5f5f4', padding: '8rem 1rem' }}>
                <h1 className="text-5xl font-serif mb-6" style={{ fontFamily: 'var(--font-heading)', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
                    Connecting the World Through Creativity
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    ArtCommerce is a curated platform for artists, collectors, and enthusiasts to discover, buy, and learn about contemporary art.
                </p>
            </div>

            {/* Mission */}
            <div className="container mx-auto px-6 py-20" style={{ maxWidth: '1000px', margin: '0 auto', padding: '5rem 1.5rem' }}>
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-serif mb-6">Our Mission</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            We believe that art should be accessible to everyone. Whether you are a seasoned collector or buying your first original piece, we provide a transparent and inspiring marketplace.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Our commitment extends beyond commerce. We support our artist community with fair compensation, professional tools, and global exposure.
                        </p>
                    </div>
                    <div className="bg-gray-200 aspect-square rounded-lg overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800" alt="Artist at work" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="bg-black text-white py-24" style={{ backgroundColor: 'black', color: 'white', padding: '6rem 1.5rem' }}>
                <div className="container mx-auto px-6" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 className="text-3xl font-serif mb-12 text-center">Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-amber-500">Authenticity</h3>
                            <p className="text-gray-400">Every piece on our platform is verified and original, directly from the artist's studio.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-amber-500">Community</h3>
                            <p className="text-gray-400">We foster a supportive ecosystem where creators and patrons can connect meaningfully.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-amber-500">Sustainability</h3>
                            <p className="text-gray-400">Promoting eco-conscious practices in art production and packaging.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
