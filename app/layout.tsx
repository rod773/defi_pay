import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { CartProvider } from '@/lib/cart-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DeFiPay Store',
  description: 'Decentralized e-commerce platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <CartProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-64px)] pb-24">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}