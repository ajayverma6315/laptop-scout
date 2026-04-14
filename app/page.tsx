import Link from 'next/link';
import type { Metadata } from 'next';
import Logo from '@/components/Logo';
import { ArrowRight, CheckCircle2, Shield, Lock, Zap, AlertTriangle, Battery, HardDrive, Cpu, Monitor } from 'lucide-react';

export const metadata: Metadata = {
  title: 'LaptopScout — India’s Used Laptop Buying Assistant',
  description: 'Check second hand laptops before buying. Run hardware tests, check battery health, RAM, CPU, GPU. 100% Private & Safe.',
};

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[#052E2B] blur-[140px] opacity-70 mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-[#C6A96B]/10 blur-[140px] opacity-50 mix-blend-screen" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full bg-[#0F3D2E]/20 blur-[120px] opacity-40 mix-blend-screen" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        {/* Hero */}
        <section className="py-24 md:py-40 text-center">
          <div className="flex justify-center mb-12">
            <Logo size="lg" showTagline={true} className="animate-in fade-in zoom-in duration-1000" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#C6A96B]/20 text-[#C6A96B] text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C6A96B] animate-pulse shadow-[0_0_10px_#C6A96B]" />
            India&apos;s #1 Used Laptop Buying Assistant
          </div>
          <h1 className="font-space text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 text-[#F9FAFB] tracking-tight">
            Used Laptop Lene Se Pehle <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#C6A96B] via-[#EAD7A1] to-[#C6A96B] bg-clip-text text-transparent">Sach Jaan Lo</span>
          </h1>
          <p className="text-lg md:text-xl text-[#9CA3AF] max-w-2xl mx-auto mb-12 leading-relaxed">
            Don&apos;t get scammed. Check Battery, RAM, SSD, and GPU health in 2 minutes. 
            <span className="text-[#F9FAFB] block mt-2">100% Private. 100% Accurate. 100% Free.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href="/tool" className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] hover:from-[#EAD7A1] hover:to-[#C6A96B] text-slate-900 rounded-full font-bold transition-all shadow-[0_0_30px_rgba(198,169,107,0.3)] hover:shadow-[0_0_50px_rgba(198,169,107,0.5)] hover:scale-105 flex items-center justify-center gap-2 text-lg">
              Check Laptop Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/blog" className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 border border-[#C6A96B]/30 text-[#F9FAFB] rounded-full font-medium transition-all flex items-center justify-center gap-2 backdrop-blur-md text-lg">
              Avoid Bad Purchase
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2 text-sm text-[#9CA3AF] font-medium"><Lock className="w-5 h-5 text-[#C6A96B]" /> No Installation Required</div>
            <div className="flex items-center gap-2 text-sm text-[#9CA3AF] font-medium"><Zap className="w-5 h-5 text-[#C6A96B]" /> Works 100% Offline</div>
            <div className="flex items-center gap-2 text-sm text-[#9CA3AF] font-medium"><Shield className="w-5 h-5 text-[#C6A96B]" /> Zero Data Collection</div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-24 border-t border-[#C6A96B]/10">
          <div className="text-center mb-16">
            <h2 className="font-space text-3xl md:text-5xl font-bold text-[#F9FAFB] mb-6">Kyun log dhokha khate hain?</h2>
            <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">Bahar se laptop naya lagta hai, par andar ki kahani kuch aur hoti hai.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-[#C6A96B]/10 rounded-3xl p-8 hover:border-[#C6A96B]/30 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[#C6A96B]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Battery className="w-7 h-7 text-[#C6A96B]" />
              </div>
              <h3 className="font-space font-bold text-xl text-[#F9FAFB] mb-3">Dead Battery</h3>
              <p className="text-[#9CA3AF] leading-relaxed">Seller bolta hai &quot;2 ghante chalegi&quot;, par ghar aake 15 minute mein band ho jata hai.</p>
            </div>
            <div className="bg-white/5 border border-[#C6A96B]/10 rounded-3xl p-8 hover:border-[#C6A96B]/30 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[#C6A96B]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HardDrive className="w-7 h-7 text-[#C6A96B]" />
              </div>
              <h3 className="font-space font-bold text-xl text-[#F9FAFB] mb-3">Slow Hard Drive</h3>
              <p className="text-[#9CA3AF] leading-relaxed">System boot hone mein 5 minute lagte hain. Purani HDD ko SSD bol ke bech dete hain.</p>
            </div>
            <div className="bg-white/5 border border-[#C6A96B]/10 rounded-3xl p-8 hover:border-[#C6A96B]/30 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[#C6A96B]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-7 h-7 text-[#C6A96B]" />
              </div>
              <h3 className="font-space font-bold text-xl text-[#F9FAFB] mb-3">Hidden Faults</h3>
              <p className="text-[#9CA3AF] leading-relaxed">Keyboard ke kuch buttons kaam nahi karte, ya screen mein dead pixels hote hain jo dikhte nahi.</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 border-t border-[#C6A96B]/10">
          <div className="text-center mb-16">
            <h2 className="font-space text-3xl md:text-5xl font-bold text-[#F9FAFB] mb-6">3 Simple Steps</h2>
            <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">Bina kisi technical knowledge ke, expert ki tarah laptop check karo.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C6A96B]/20 to-transparent -translate-y-1/2 z-0" />
            {[
              { step: '01', title: 'Open Scanner', desc: 'Hamara diagnostic tool open karein jo laptop ka health data read karega.' },
              { step: '02', title: 'Run Tests', desc: 'Sirf 2 minute mein battery, RAM aur SSD ki health check karein.' },
              { step: '03', title: 'Get Report', desc: 'Instant health score aur fair price estimate dekhein.' }
            ].map((item, i) => (
              <div key={i} className="relative z-10 bg-[#020617] border border-[#C6A96B]/20 rounded-3xl p-8 text-center shadow-xl hover:border-[#C6A96B]/40 transition-all">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#C6A96B] to-[#EAD7A1] rounded-full flex items-center justify-center font-space font-bold text-2xl text-slate-900 mb-6 shadow-[0_0_20px_rgba(198,169,107,0.3)]">
                  {item.step}
                </div>
                <h3 className="font-space font-bold text-xl text-[#F9FAFB] mb-3">{item.title}</h3>
                <p className="text-[#9CA3AF] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/tool" className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-[#C6A96B]/30 text-[#F9FAFB] rounded-full font-bold transition-all hover:scale-105">
              Check Laptop Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 border-t border-[#C6A96B]/10">
          <div className="bg-white/5 border border-[#C6A96B]/20 rounded-[3rem] p-12 md:p-20 backdrop-blur-md">
            <div className="text-center mb-16">
              <h2 className="font-space text-3xl md:text-5xl font-bold text-[#F9FAFB] mb-6">Hum Kya Check Karte Hain?</h2>
              <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">Ek complete health report jo aapko sach batati hai.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-[#C6A96B]/20 flex items-center justify-center mb-4 group-hover:bg-[#C6A96B]/10 transition-all"><Battery className="w-8 h-8 text-[#C6A96B]" /></div>
                <h4 className="font-bold text-[#F9FAFB] mb-2">Battery Health</h4>
                <p className="text-sm text-[#9CA3AF]">Original capacity kitni bachi hai</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-[#C6A96B]/20 flex items-center justify-center mb-4 group-hover:bg-[#C6A96B]/10 transition-all"><Cpu className="w-8 h-8 text-[#C6A96B]" /></div>
                <h4 className="font-bold text-[#F9FAFB] mb-2">Processor & RAM</h4>
                <p className="text-sm text-[#9CA3AF]">Asli specs kya hain</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-[#C6A96B]/20 flex items-center justify-center mb-4 group-hover:bg-[#C6A96B]/10 transition-all"><HardDrive className="w-8 h-8 text-[#C6A96B]" /></div>
                <h4 className="font-bold text-[#F9FAFB] mb-2">Storage (SSD/HDD)</h4>
                <p className="text-sm text-[#9CA3AF]">Speed aur health status</p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-[#C6A96B]/20 flex items-center justify-center mb-4 group-hover:bg-[#C6A96B]/10 transition-all"><Monitor className="w-8 h-8 text-[#C6A96B]" /></div>
                <h4 className="font-bold text-[#F9FAFB] mb-2">GPU & Display</h4>
                <p className="text-sm text-[#9CA3AF]">Graphics card details</p>
              </div>
            </div>
            <div className="mt-16 text-center">
              <Link href="/tool" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] text-slate-900 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(198,169,107,0.2)]">
                Check Laptop Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center">
          <h2 className="font-space text-4xl md:text-6xl font-bold text-[#F9FAFB] mb-8">Ready to check your laptop?</h2>
          <p className="text-xl text-[#9CA3AF] mb-12 max-w-2xl mx-auto">Don&apos;t risk your money. Get a complete health report and fair price estimate in 2 minutes.</p>
          <Link href="/tool" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] hover:from-[#EAD7A1] hover:to-[#C6A96B] text-slate-900 rounded-full text-lg font-bold transition-all shadow-[0_0_30px_rgba(198,169,107,0.3)] hover:shadow-[0_0_50px_rgba(198,169,107,0.5)] hover:scale-105">
            Check Laptop Now <ArrowRight className="w-6 h-6" />
          </Link>
        </section>
      </main>
    </div>
  );
}
