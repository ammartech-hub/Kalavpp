import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from 'next/link';

export function generateStaticParams() {
    return [
        { slug: 'resurgence-of-physical-art' },
        { slug: 'collecting-101' },
        { slug: 'sustainable-studio-practices' },
        { slug: 'interior-design-art' }
    ];
}

const postData = {
    'resurgence-of-physical-art': {
        title: "The Resurgence of Physical Art in a Digital Age",
        date: "February 2, 2026",
        content: "Body of the article about physical art...",
        image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=1000",
        author: "Elena Vance"
    },
    'collecting-101': {
        title: "Collecting 101: How to Start Your Art Collection",
        date: "January 28, 2026",
        content: "Guide on collecting...",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000",
        author: "Archive Admin"
    }
};

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const post = postData[slug] || { title: "Post not found", content: "This post does not exist.", image: "", date: "" };

    return (
        <main>
            <Navigation />

            <div className="max-w-4xl mx-auto px-4 py-12" style={{ maxWidth: '896px', margin: '0 auto', padding: '3rem 1rem' }}>
                <Link href="/blog" className="text-sm text-gray-500 hover:text-black mb-8 inline-block">&larr; Back to Journal</Link>

                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)', marginTop: '1rem', lineHeight: 1.2 }}>{post.title}</h1>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 border-b pb-8">
                    <span className="font-bold text-black">{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                </div>

                {post.image && (
                    <div className="w-full aspect-video mb-12 rounded-lg overflow-hidden" style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', marginBottom: '3rem' }}>
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                )}

                <div className="prose prose-lg max-w-none font-serif leading-relaxed text-gray-800" style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#333' }}>
                    <p className="mb-6 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-2">
                        {post.content.split(' ').slice(0, 30).join(' ')}...
                    </p>
                    <p>
                        (Full article content placeholder. In a real application, this would be fetched from a CMS or Markdown file. The layout mimics a high-quality editorial spread with generous whitespace and elegant typography.)
                    </p>
                    <p className="mt-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
