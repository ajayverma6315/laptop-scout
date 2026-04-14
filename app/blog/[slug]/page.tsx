import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${title} — LaptopScout`,
    description: `Learn more about ${title.toLowerCase()} and how to avoid scams when buying a used laptop.`,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const BLOG_CONTENT: Record<string, { title: string, content: React.ReactNode }> = {
    'how-to-check-used-laptop-battery': {
      title: 'How to Check Used Laptop Battery Health Before Buying',
      content: (
        <>
          <p>Buying a used laptop without checking the battery is like buying a car without checking the engine. A battery can look fine but only hold 20% of its original charge.</p>
          <h2>The Windows Battery Report</h2>
          <p>Windows has a hidden feature that generates a detailed health report. Here is how to use it:</p>
          <ol>
            <li>Right-click the Start button and select <strong>Terminal (Admin)</strong> or <strong>Command Prompt (Admin)</strong>.</li>
            <li>Type <code>powercfg /batteryreport</code> and press Enter.</li>
            <li>Windows will save an HTML file. Navigate to the path shown (usually C:\Windows\system32) and open it.</li>
          </ol>
          <p>Look for <strong>Design Capacity</strong> vs <strong>Full Charge Capacity</strong>. If the latter is less than 70% of the former, the battery is heavily degraded.</p>
        </>
      )
    },
    'hdd-vs-ssd-used-laptop': {
      title: 'HDD vs SSD: Why You Should Never Buy a Used Laptop with an HDD',
      content: (
        <>
          <p>In 2024, an SSD is not a luxury—it is a necessity. A mechanical Hard Disk Drive (HDD) will make even a powerful laptop feel like a turtle.</p>
          <h2>Why SSDs are Better</h2>
          <ul>
            <li><strong>Speed:</strong> SSDs are up to 10x faster at reading and writing data.</li>
            <li><strong>Durability:</strong> HDDs have moving parts that can break if the laptop is bumped. SSDs are solid-state.</li>
            <li><strong>Silence:</strong> No more clicking or whirring sounds.</li>
          </ul>
          <p>If you find a great deal on a laptop with an HDD, factor in the cost of upgrading to an SSD immediately (approx ₹2,000 - ₹4,000).</p>
        </>
      )
    },
    'used-laptop-buying-checklist': {
      title: 'The Ultimate Used Laptop Buying Checklist (2024)',
      content: (
        <>
          <p>Before you hand over your hard-earned cash, run through this essential physical inspection checklist:</p>
          <ul>
            <li><strong>Hinges:</strong> Open and close the lid. It should be firm, not loose or creaky.</li>
            <li><strong>Ports:</strong> Plug a pendrive into every USB port. Check the HDMI and charging port.</li>
            <li><strong>Keyboard:</strong> Open Notepad and type every single key. Don&apos;t skip the function keys!</li>
            <li><strong>Screen:</strong> Look for white spots (backlight bleed) or tiny black dots (dead pixels).</li>
            <li><strong>Webcam & Mic:</strong> Open the Camera app and record a 5-second video to test both.</li>
          </ul>
        </>
      )
    },
    'common-scams-used-laptops': {
      title: '5 Common Scams When Buying Used Laptops on OLX/Quikr',
      content: (
        <>
          <p>Be careful! Scammers are getting smarter. Here are the top red flags:</p>
          <ol>
            <li><strong>Fake Specs:</strong> Scammers use software to make an i3 look like an i7 in System Properties. Always check Task Manager.</li>
            <li><strong>The &quot;Urgent Sale&quot;:</strong> They rush you so you don&apos;t test the laptop properly. Never rush.</li>
            <li><strong>Advance Payment:</strong> Never pay a single rupee before seeing the laptop in person.</li>
            <li><strong>Hidden Repairs:</strong> Look for mismatched screws or pry marks on the bottom case.</li>
          </ol>
        </>
      )
    },
    'macbook-buying-guide-used': {
      title: 'Used MacBook Buying Guide: What to Check for in 2024',
      content: (
        <>
          <p>MacBooks hold their value well, but they have specific issues to watch out for:</p>
          <ul>
            <li><strong>Activation Lock:</strong> Ensure the seller has signed out of iCloud and Find My. If it&apos;s locked, it&apos;s a brick.</li>
            <li><strong>Battery Cycle Count:</strong> Go to About This Mac → System Report → Power. Anything over 1000 cycles needs replacement.</li>
            <li><strong>Flexgate:</strong> Open the lid to different angles. If the screen flickers or shows &quot;stage light&quot; effects, the display cable is failing.</li>
          </ul>
        </>
      )
    }
  };

  const post = BLOG_CONTENT[slug] || {
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    content: (
      <>
        <p>Buying a used laptop can save you a lot of money, but it also comes with risks. Sellers often hide issues like a degraded battery, a failing hard drive, or overheating problems. In this guide, we will walk you through everything you need to know.</p>
        <h2 className="font-space text-2xl font-bold text-[#F9FAFB] mt-10 mb-4">Why You Need to Check Before Buying</h2>
        <p>A laptop might look brand new on the outside, but the internal components degrade over time. The battery is the most common point of failure. If you don&apos;t check it, you might end up spending thousands on a replacement just weeks after your purchase.</p>
      </>
    )
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#C6A96B] transition-colors mb-12 font-medium text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to all articles
        </Link>
        
        <article className="prose prose-invert prose-lg max-w-none">
          <div className="mb-16 text-center">
            <span className="text-xs font-bold text-[#C6A96B] uppercase tracking-wider bg-[#C6A96B]/10 px-3 py-1 rounded-full mb-6 inline-block">Buying Guide</span>
            <h1 className="font-space text-4xl md:text-6xl font-bold text-[#F9FAFB] mb-6 leading-tight">{post.title}</h1>
            <p className="text-[#9CA3AF] text-lg">Published on Oct 15, 2023 • 5 min read</p>
          </div>

          <div className="bg-white/5 border border-[#C6A96B]/20 rounded-3xl p-8 md:p-12 mb-16 backdrop-blur-sm text-[#E5E7EB] leading-relaxed space-y-6">
            {post.content}
            
            <h3 className="font-space text-xl font-bold text-[#F9FAFB] mt-8 mb-4">Key Things to Inspect:</h3>
            <ul className="list-none space-y-3 pl-0">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Battery Health:</strong> Generate a Windows battery report to see the actual design capacity vs full charge capacity.</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>Storage Drive:</strong> Ensure it has an SSD, not an old mechanical HDD. Check its health status.</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" /> <span><strong>RAM & CPU:</strong> Verify the specs match what the seller claims.</span></li>
            </ul>

            <div className="bg-[#052E2B] border border-emerald-500/20 rounded-2xl p-8 my-12 text-center">
              <h3 className="font-space text-2xl font-bold text-[#F9FAFB] mb-4">Don&apos;t want to do this manually?</h3>
              <p className="text-[#9CA3AF] mb-6">Our free diagnostic tool runs all these checks automatically in just 2 minutes. No installation required.</p>
              <Link href="/tool" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] hover:from-[#EAD7A1] hover:to-[#C6A96B] text-slate-900 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(198,169,107,0.3)] hover:scale-105">
                Check Laptop Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <h2 className="font-space text-2xl font-bold text-[#F9FAFB] mt-10 mb-4">Conclusion</h2>
            <p>
              Always take your time when inspecting a used laptop. Don&apos;t let the seller rush you. If they refuse to let you run basic diagnostic tests, walk away from the deal.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
