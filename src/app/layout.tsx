import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import { CartProvider } from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Kalavpp | ArtCommerce & Creative Services',
  description: 'A premier platform for discovering unique art, merchandise, and creative workshops.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-[#FAFAFA] text-gray-900`}>
        <AuthProvider>
          <CartProvider>
            {children}
            <CartSidebar />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
