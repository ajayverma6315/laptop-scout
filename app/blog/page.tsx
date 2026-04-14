import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, BookOpen, Shield, Lock, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Laptop Buying Guides — LaptopScout',
  description: 'Expert advice, checklists, and tips to help you buy the perfect used laptop without getting scammed.',
};

const BLOG_POSTS = [
  {
    slug: 'how-to-check-used-laptop-battery',
    title: 'How to Check Used Laptop Battery Health Before Buying',
    excerpt: 'Don\'t get scammed with a dead battery. Learn how to generate a battery report in Windows and understand the real capacity.',
    category: 'Buying Guides',
    date: 'Oct 15, 2023',
  },
  {
    slug: 'hdd-vs-ssd-used-laptop',
    title: 'HDD vs SSD: Why You Should Never Buy a Used Laptop with an HDD',
    excerpt: 'A slow hard drive can ruin your experience. Discover why an SSD is mandatory in 2024 and how to check what\'s inside.',
    category: 'Comparison',
    date: 'Oct 12, 2023',
  },
  {
    slug: 'used-laptop-buying-checklist',
    title: 'The Ultimate Used Laptop Buying Checklist (2024)',
    excerpt: 'A comprehensive 15-point checklist to inspect any second-hand laptop physically and internally before handing over your money.',
    category: 'Checklist',
    date: 'Oct 05, 2023',
  },
  {
    slug: 'common-scams-used-laptops',
    title: '5 Common Scams When Buying Used Laptops on OLX/Quikr',
    excerpt: 'From fake specs to hidden motherboard repairs, learn the tricks shady sellers use and how to protect yourself.',
    category: 'Problems',
    date: 'Sep 28, 2023',
  },
  {
    slug: 'macbook-buying-guide-used',
    title: 'Used MacBook Buying Guide: What to Check for in 2024',
    excerpt: 'Buying a pre-owned Mac? From activation locks to battery cycles, here is everything you need to verify before paying.',
    category: 'Apple',
    date: 'Sep 20, 2023',
  },
  {
    slug: 'gaming-laptop-inspection-tips',
    title: 'How to Inspect a Used Gaming Laptop for Overheating',
    excerpt: 'Gaming laptops are prone to thermal throttling. Learn how to run stress tests and check fan health in minutes.',
    category: 'Gaming',
    date: 'Sep 15, 2023',
  },
  {
    slug: 'screen-defects-used-laptop',
    title: 'How to Spot Dead Pixels and Screen Bleeding on Used Laptops',
    excerpt: 'A faulty display can be the most expensive part to replace. Use these simple tests to find hidden screen defects.',
    category: 'Display',
    date: 'Sep 10, 2023',
  },
  {
    slug: 'keyboard-trackpad-testing',
    title: 'The Secret Way to Test Every Key on a Used Laptop Keyboard',
    excerpt: 'Don\'t find out a key is broken after you get home. Here is the fastest way to verify keyboard and trackpad responsiveness.',
    category: 'Hardware',
    date: 'Sep 05, 2023',
  },
  {
    slug: 'negotiation-tips-used-laptop',
    title: 'How to Negotiate the Price of a Used Laptop Like a Pro',
    excerpt: 'Found some issues? Learn how to use our health report to negotiate a fair price and save thousands on your purchase.',
    category: 'Negotiation',
    date: 'Aug 30, 2023',
  },
  {
    slug: 'best-used-laptops-under-30000',
    title: 'Top 5 Used Laptops Under ₹30,000 for Students in India',
    excerpt: 'On a budget? We have curated the best value-for-money second-hand laptops that are reliable for studies and work.',
    category: 'Recommendations',
    date: 'Aug 25, 2023',
  }
];

export default function BlogPage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-[#C6A96B]/10 blur-[140px] opacity-50 mix-blend-screen" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h1 className="font-space text-5xl md:text-7xl font-bold text-[#F9FAFB] mb-6 tracking-tight">
            Laptop Buying <span className="bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] bg-clip-text text-transparent">Guides</span>
          </h1>
          <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">
            Expert advice, checklists, and tips to help you buy the perfect used laptop without getting scammed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white/5 border border-[#C6A96B]/10 rounded-3xl p-8 hover:border-[#C6A96B]/30 hover:bg-white/10 transition-all duration-300 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-[#C6A96B] uppercase tracking-wider bg-[#C6A96B]/10 px-3 py-1 rounded-full">{post.category}</span>
                <span className="text-sm text-[#9CA3AF]">{post.date}</span>
              </div>
              <h2 className="font-space text-2xl font-bold text-[#F9FAFB] mb-4 group-hover:text-[#C6A96B] transition-colors">{post.title}</h2>
              <p className="text-[#9CA3AF] leading-relaxed mb-8 flex-1">{post.excerpt}</p>
              <div className="flex items-center gap-2 text-[#C6A96B] font-bold text-sm mt-auto">
                Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[#052E2B] to-[#020617] border border-[#C6A96B]/20 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5"><BookOpen className="w-64 h-64 text-[#C6A96B]" /></div>
          <div className="relative z-10">
            <h2 className="font-space text-3xl md:text-5xl font-bold text-[#F9FAFB] mb-6">Stop Guessing. Start Testing.</h2>
            <p className="text-lg text-[#9CA3AF] mb-10 max-w-2xl mx-auto">Use our free diagnostic tool to check the exact health of any used laptop before you buy it.</p>
            <Link href="/tool" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] hover:from-[#EAD7A1] hover:to-[#C6A96B] text-slate-900 rounded-full text-lg font-bold transition-all shadow-[0_0_30px_rgba(198,169,107,0.3)] hover:scale-105">
              Check Laptop Now <ArrowRight className="w-6 h-6" />
            </Link>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[#9CA3AF] font-medium">
              <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-emerald-400" /> No Install Required</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#C6A96B]" /> Works Offline</div>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#0F3D2E]" /> Zero Data Collection</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
