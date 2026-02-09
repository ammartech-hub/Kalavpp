import prisma from '@/lib/prisma';
import ShopClient from '@/components/ShopClient';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export function generateStaticParams() {
    return [
        { category: 'physical' },
        { category: 'merchandise' },
        { category: 'digital' }
    ];
}

export default async function ShopCategoryPage({ params }) {
    const { category } = await params;

    // Normalize category slug to database category name (rough mapping)
    let dbCategory = "All Products";
    if (category === 'physical') dbCategory = "Original Artworks"; // Or multiple? We'll just filter simpler for now.
    if (category === 'merchandise') dbCategory = "Prints & Reproductions"; // Placeholder mapping
    if (category === 'digital') dbCategory = "Stationery";

    // In a real app, I'd query: where category IN [...] or match slug.
    // For mock, I'll fetch all and filter client side or fetch filtered if adapter supported better filtering.
    // My mock adapter supports exact match on `category`.

    // Let's just pass all products to ShopClient and let it filter initially?
    // Or fetch specific.

    const products = await prisma.product.findMany({});

    // Pre-filter for server-side rendering relevance
    const filtered = products.filter(p => {
        if (category === 'physical') {
            return [
                'Original Artworks',
                'Prints & Reproductions',
                'Handcrafted Items',
                'Miniature Modeling',
                'Traditional & Tribal Art',
                'Art Books & Zines',
                'Stationery'
            ].includes(p.category);
        }
        if (category === 'merchandise') return ['Apparel', 'Home Decor', 'Accessories', 'Stationery'].includes(p.category);
        if (category === 'digital') return ['Digital Art Products'].includes(p.category); // Placeholder for 3.3
        return true;
    });

    return (
        <main>
            <Navigation />

            {/* Header */}
            <div className="bg-stone-100 py-16 text-center" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                <h1 className="text-4xl font-serif mb-4 capitalize">{category.replace('-', ' ')} Collection</h1>
                <p className="text-gray-600 max-w-2xl mx-auto px-4">
                    Browse our exclusive range of {category} items.
                </p>
            </div>

            <ShopClient initialProducts={filtered} />

            <Footer />
        </main>
    );
}
