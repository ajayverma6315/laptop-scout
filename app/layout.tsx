import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'LaptopScout — Premium Used Laptop Checker',
  description: 'Check second hand laptops before buying. Run hardware tests, check battery health, RAM, CPU, GPU.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-inter bg-gradient-to-br from-[#020617] via-[#052E2B] to-[#020617] text-[#F9FAFB] antialiased selection:bg-[#C6A96B]/30 selection:text-white min-h-screen flex flex-col" suppressHydrationWarning>
        <div className="bg-noise"></div>
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
