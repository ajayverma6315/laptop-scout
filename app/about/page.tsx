import Link from 'next/link';
import type { Metadata } from 'next';
import Logo from '@/components/Logo';
import { ArrowRight, ShieldCheck, Users, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — LaptopScout',
  description: 'Learn about our mission to make buying used laptops safe, transparent, and scam-free in India.',
};

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <Logo size="lg" showText={false} />
          </div>
          <h1 className="font-space text-5xl md:text-7xl font-bold text-[#F9FAFB] mb-6 tracking-tight">
            About <span className="bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] bg-clip-text text-transparent">LaptopScout</span>
          </h1>
          <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">
            We are on a mission to make buying used laptops safe, transparent, and scam-free for everyone in India.
          </p>
        </div>

        <div className="bg-white/5 border border-[#C6A96B]/20 rounded-3xl p-8 md:p-12 mb-16 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#C6A96B]/10 rounded-2xl flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-[#C6A96B]" />
              </div>
              <h3 className="font-bold text-[#F9FAFB] mb-2">Our Mission</h3>
              <p className="text-sm text-[#9CA3AF]">To eliminate scams in the second-hand electronics market.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#C6A96B]/10 rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-[#C6A96B]" />
              </div>
              <h3 className="font-bold text-[#F9FAFB] mb-2">100% Safe</h3>
              <p className="text-sm text-[#9CA3AF]">Our tools run entirely in your browser. We collect zero personal data.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#C6A96B]/10 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-[#C6A96B]" />
              </div>
              <h3 className="font-bold text-[#F9FAFB] mb-2">For Everyone</h3>
              <p className="text-sm text-[#9CA3AF]">Built for non-techies to easily understand complex hardware data.</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-[#E5E7EB]">
            <h2 className="font-space text-2xl font-bold text-[#F9FAFB] mb-4">The Story</h2>
            <p className="mb-6">
              Buying a used laptop is stressful. You meet a stranger, you have 5 minutes to check a complex machine, and if you miss something, your money is gone. 
            </p>
            <p className="mb-6">
              We saw too many students and professionals getting scammed with dead batteries, fake specs, and failing hard drives. That&apos;s why we built LaptopScout.
            </p>
            <p>
              Our tool automates the entire diagnostic process. It runs a safe, offline script to gather real hardware data, and translates it into a simple &quot;Buy&quot; or &quot;Don&apos;t Buy&quot; verdict with a fair price estimate.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/tool" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] hover:from-[#EAD7A1] hover:to-[#C6A96B] text-slate-900 rounded-full text-lg font-bold transition-all shadow-[0_0_30px_rgba(198,169,107,0.3)] hover:scale-105">
            Try The Tool Now <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </main>
    </div>
  );
}
