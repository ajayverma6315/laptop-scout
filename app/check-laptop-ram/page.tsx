import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Check Laptop RAM & CPU — LaptopScout',
  description: 'Verify the processor generation and RAM capacity to ensure you are getting what you pay for.',
};

export default function CheckRamPage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto bg-[#C6A96B]/10 rounded-3xl flex items-center justify-center mb-8">
            <Cpu className="w-10 h-10 text-[#C6A96B]" />
          </div>
          <h1 className="font-space text-4xl md:text-6xl font-bold text-[#F9FAFB] mb-6 leading-tight">
            How to Check Laptop <span className="bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] bg-clip-text text-transparent">RAM & CPU</span>
          </h1>
          <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">
            Verify the processor generation and RAM capacity to ensure you&apos;re getting what you pay for.
          </p>
        </div>

        <div className="bg-white/5 border border-[#C6A96B]/20 rounded-3xl p-8 md:p-12 mb-16 backdrop-blur-sm text-[#E5E7EB] leading-relaxed space-y-6">
          <h2 className="font-space text-2xl font-bold text-[#F9FAFB] mb-4">Why Checking Specs is Crucial</h2>
          <p>
            Sellers often misrepresent specifications. They might claim a laptop has an &quot;i7 processor&quot;, but fail to mention it&apos;s a 10-year-old 4th generation i7 that is slower than a modern i3. Similarly, they might claim 16GB of RAM when it only has 8GB.
          </p>

          <h2 className="font-space text-2xl font-bold text-[#F9FAFB] mt-10 mb-4">How to Check Manually (Windows)</h2>
          <ol className="list-decimal space-y-4 pl-5">
            <li>Press <code>Ctrl + Shift + Esc</code> to open Task Manager.</li>
            <li>Go to the <strong>Performance</strong> tab.</li>
            <li>Click on <strong>CPU</strong> to see the exact processor model and generation.</li>
            <li>Click on <strong>Memory</strong> to see the total RAM installed and its speed.</li>
          </ol>

          <div className="bg-[#052E2B] border border-emerald-500/20 rounded-2xl p-8 my-12 text-center">
            <h3 className="font-space text-2xl font-bold text-[#F9FAFB] mb-4">Get a Complete Hardware Audit</h3>
            <p className="text-[#9CA3AF] mb-6">Our free tool extracts the exact CPU model, generation, and RAM capacity, and tells you if it&apos;s worth the asking price.</p>
            <Link href="/tool" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] hover:from-[#EAD7A1] hover:to-[#C6A96B] text-slate-900 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(198,169,107,0.3)] hover:scale-105">
              Check Laptop Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
