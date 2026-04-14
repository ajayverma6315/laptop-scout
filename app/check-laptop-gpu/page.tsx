import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Monitor } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Check Laptop GPU & Graphics — LaptopScout',
  description: 'Learn how to verify the dedicated graphics card in a used laptop for gaming or video editing.',
};

export default function CheckGpuPage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto bg-[#C6A96B]/10 rounded-3xl flex items-center justify-center mb-8">
            <Monitor className="w-10 h-10 text-[#C6A96B]" />
          </div>
          <h1 className="font-space text-4xl md:text-6xl font-bold text-[#F9FAFB] mb-6 leading-tight">
            How to Check Laptop <span className="bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] bg-clip-text text-transparent">GPU & Graphics</span>
          </h1>
          <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">
            Buying a laptop for gaming or video editing? Learn how to verify the dedicated graphics card.
          </p>
        </div>

        <div className="bg-white/5 border border-[#C6A96B]/20 rounded-3xl p-8 md:p-12 mb-16 backdrop-blur-sm text-[#E5E7EB] leading-relaxed space-y-6">
          <h2 className="font-space text-2xl font-bold text-[#F9FAFB] mb-4">Dedicated vs Integrated Graphics</h2>
          <p>
            Most standard laptops have &quot;Integrated Graphics&quot; (like Intel UHD or Iris Xe), which are fine for office work but terrible for gaming or video editing. If a seller claims the laptop is for &quot;gaming&quot;, it must have a &quot;Dedicated GPU&quot; (like NVIDIA GTX/RTX or AMD Radeon).
          </p>

          <h2 className="font-space text-2xl font-bold text-[#F9FAFB] mt-10 mb-4">How to Check Manually (Windows)</h2>
          <ol className="list-decimal space-y-4 pl-5">
            <li>Press <code>Ctrl + Shift + Esc</code> to open Task Manager.</li>
            <li>Go to the <strong>Performance</strong> tab.</li>
            <li>Scroll down on the left side. If you see <strong>GPU 0</strong> and <strong>GPU 1</strong>, the laptop has a dedicated graphics card.</li>
            <li>Click on the GPU to see its exact model name (e.g., NVIDIA GeForce RTX 3060).</li>
          </ol>

          <div className="bg-[#052E2B] border border-emerald-500/20 rounded-2xl p-8 my-12 text-center">
            <h3 className="font-space text-2xl font-bold text-[#F9FAFB] mb-4">Verify GPU Instantly</h3>
            <p className="text-[#9CA3AF] mb-6">Our tool detects both integrated and dedicated GPUs and factors them into the final valuation of the laptop.</p>
            <Link href="/tool" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] hover:from-[#EAD7A1] hover:to-[#C6A96B] text-slate-900 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(198,169,107,0.3)] hover:scale-105">
              Check Laptop Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
