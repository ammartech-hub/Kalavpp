'use client';

import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {

    return (
        <section className={styles.heroContainer}>
            <div
                className={styles.splitSection}
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=2070&auto=format&fit=crop')" // Art Gallery
                }}
            >
                <div className={styles.content}>
                    <h2 className={styles.title}>E-Commerce</h2>
                    <p className={styles.subtitle}>Curated Art & Merchandise</p>
                    <Link href="/shop" className={styles.heroBtn}>
                        Shop Now
                    </Link>
                </div>
            </div>

            <div
                className={styles.splitSection}
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080&auto=format&fit=crop')" // Creative Studio
                }}
            >
                <div className={styles.content}>
                    <h2 className={styles.title}>Creative Services</h2>
                    <p className={styles.subtitle}>Commission & Custom Work</p>
                    <Link href="/services" className={styles.heroBtn}>
                        Explore Services
                    </Link>
                </div>
            </div>
        </section>
    );
}
