import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Generate params for static generation and pre-rendering
export function generateStaticParams() {
    return [
        { slug: 'custom' },
        { slug: 'commission' },
        { slug: 'limited' },
        { slug: 'preorder' },
        { slug: 'educational' }
    ];
}

export default async function ServicePage({ params }) {
    const { slug } = await params;

    // Mock data for services details
    const serviceDetails = {
        'custom': {
            title: "Customized & Commission-Based Art",
            desc: "Bring your vision to life with bespoke creations.",
            image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071",
            features: [
                "Portrait paintings (realistic, caricature, digital)",
                "Custom sculptures",
                "Wall murals",
                "Calligraphy nameplates",
                "Personalized illustrations",
                "Religious and ceremonial artworks"
            ],
            detailedDesc: "Our network of skilled artists is ready to translate your ideas into tangible masterpieces. Whether it's a family portrait, a statement sculpture for your lobby, or a devotional piece for your home, we handle the entire process from concept to delivery."
        },
        'limited': {
            title: "Limited Edition & Large-Scale Works",
            desc: "Exclusive art pieces for collectors and businesses.",
            image: "https://images.unsplash.com/photo-1560953689-d931be6784d1?q=80&w=2070",
            features: [
                "Limited edition prints",
                "Art installations",
                "Special art series",
                "Signed and certified artworks"
            ],
            detailedDesc: "Invest in exclusivity. Our limited edition collection features signed and numbered prints from renowned artists. For larger spaces, we commission site-specific art installations that transform environments. Every piece comes with a certificate of authenticity."
        },
        'preorder': {
            title: "Professional Art Services",
            desc: "Book consultations for branding, illustration, etc.",
            image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2070",
            features: [
                "Art direction & curation",
                "Illustration for publishing",
                "Branding & identity design",
                "Exhibition design"
            ]
        },
        'educational': {
            title: "Educational Art Products (Pre-Booking)",
            desc: "Master the craft with expert-led sessions.",
            image: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=2070",
            features: [
                "Offline art workshops",
                "Certificate courses",
                "Masterclasses by professional artists",
                "Portfolio review and mentoring sessions"
            ],
            detailedDesc: "Join our vibrant community of learners. We offer hands-on offline workshops, intensive certificate courses, and exclusive masterclasses. Aspiring artists can also book one-on-one portfolio reviews and mentoring sessions to advance their careers."
        }
    };

    const service = serviceDetails[slug] || { title: "Service Not Found", desc: "We are expanding our services." };

    return (
        <main>
            <Navigation />

            <div className="relative h-96 flex items-center justify-center text-center text-white" style={{ height: '400px', position: 'relative' }}>
                <div className="absolute inset-0 bg-black/50 z-10" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 1 }}></div>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${service.image || 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071'}')` }}></div>
                <div className="relative z-20 max-w-3xl px-6">
                    <h1 className="text-4xl font-serif mb-4" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 700 }}>{service.title}</h1>
                    <p className="text-xl opacity-90" style={{ fontSize: '1.25rem' }}>{service.desc}</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16" style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 1.5rem' }}>
                <h2 className="text-2xl font-serif mb-6 text-center">Service Overview</h2>
                <p className="mb-12 text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
                    {service.detailedDesc || "Detailed information about this service will go here. Including pricing tiers, timelines, portfolio examples, and availability calendar."}
                </p>

                {service.features && (
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 border rounded hover:shadow-md transition bg-gray-50">
                                <div className="mt-1 h-2 w-2 rounded-full bg-black shrink-0"></div>
                                <span className="text-lg font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center">
                    {slug === 'educational' ? (
                        <Link href="/workshops" className="btn-primary px-8 py-3 text-lg inline-block">
                            Browse & Book Workshops
                        </Link>
                    ) : (
                        <button className="btn-primary px-8 py-3 text-lg">Book Consultation / Request Quote</button>
                    )}
                    <p className="mt-4 text-sm text-gray-500">Free initial consultation for all custom projects.</p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
