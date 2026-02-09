'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (res.ok) {
                setStatus('success');
                setEmail('');
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative group">
            <input
                type="email"
                placeholder={status === 'success' ? "Subscribed!" : "Email address"}
                className={`w-full bg-stone-900 border-b ${status === 'error' ? 'border-red-500' : 'border-white/10'} py-3 text-sm focus:border-gold outline-none transition`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
            />
            <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-gold transition disabled:opacity-50"
                disabled={status === 'loading' || status === 'success'}
            >
                {status === 'success' ? <Check size={18} className="text-green-500" /> : <ArrowRight size={18} />}
            </button>
        </form>
    );
}
