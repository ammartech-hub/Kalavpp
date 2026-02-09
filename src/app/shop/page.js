import prisma from '@/lib/prisma';
import ShopClient from '@/components/ShopClient';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default async function Shop() {
    const products = await prisma.product.findMany({});

    return (
        <main>
            <Navigation />

            {/* Header */}
            <div className="bg-stone-100 py-16 text-center" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                <h1 className="text-4xl font-serif mb-4">Shop Physical Art</h1>
                <p className="text-gray-600 max-w-2xl mx-auto px-4">
                    Browse our curated collection of original paintings, handcrafted artifacts, and exclusive prints.
                </p>
            </div>

            <ShopClient initialProducts={products} />

            <Footer />
        </main>
    );
}
