import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Battery, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Check Laptop Battery Health — LaptopScout',
  description: 'Learn how to generate a battery report and verify its real capacity before buying a used laptop.',
};

export default function CheckBatteryPage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto bg-[#C6A96B]/10 rounded-3xl flex items-center justify-center mb-8">
            <Battery className="w-10 h-10 text-[#C6A96B]" />
          </div>
          <h1 className="font-space text-4xl md:text-6xl font-bold text-[#F9FAFB] mb-6 leading-tight">
            How to Check Laptop <span className="bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] bg-clip-text text-transparent">Battery Health</span>
          </h1>
          <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">
            Don&apos;t buy a used laptop with a dead battery. Learn how to generate a battery report and verify its real capacity.
          </p>
        </div>

        <div className="bg-white/5 border border-[#C6A96B]/20 rounded-3xl p-8 md:p-12 mb-16 backdrop-blur-sm text-[#E5E7EB] leading-relaxed space-y-6">
          <h2 className="font-space text-2xl font-bold text-[#F9FAFB] mb-4">Why Battery Health Matters</h2>
          <p>
            A laptop battery degrades over time. A laptop that originally lasted 8 hours might only last 45 minutes after 3 years of heavy use. Replacing a battery can cost anywhere from ₹3,000 to ₹10,000 depending on the model.
          </p>

          <h2 className="font-space text-2xl font-bold text-[#F9FAFB] mt-10 mb-4">How to Check it Manually (Windows)</h2>
          <ol className="list-decimal space-y-4 pl-5">
            <li>Open Command Prompt as Administrator.</li>
            <li>Type <code>powercfg /batteryreport</code> and press Enter.</li>
            <li>Open the generated HTML file in your browser.</li>
            <li>Look for <strong>Design Capacity</strong> and <strong>Full Charge Capacity</strong>.</li>
            <li>Divide Full Charge Capacity by Design Capacity to get the health percentage.</li>
          </ol>

          <div className="bg-[#052E2B] border border-emerald-500/20 rounded-2xl p-8 my-12 text-center">
            <h3 className="font-space text-2xl font-bold text-[#F9FAFB] mb-4">The Easier Way</h3>
            <p className="text-[#9CA3AF] mb-6">Our free tool automatically reads the battery report and calculates the exact health percentage for you, along with RAM, SSD, and GPU checks.</p>
            <Link href="/tool" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] hover:from-[#EAD7A1] hover:to-[#C6A96B] text-slate-900 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(198,169,107,0.3)] hover:scale-105">
              Check Laptop Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
