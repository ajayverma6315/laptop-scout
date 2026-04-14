import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-[#C6A96B]/10 bg-[#020617] pt-16 pb-8 mt-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="mb-4 inline-block">
              <Logo size="md" showTagline={true} />
            </Link>
            <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-sm">
              India&apos;s #1 premium used laptop evaluation tool. Don&apos;t get scammed, check battery, RAM, SSD, and GPU health in 2 minutes.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[#F9FAFB] mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li><Link href="/tool" className="hover:text-[#C6A96B] transition-colors">Free Evaluation Tool</Link></li>
              <li><Link href="/check-laptop-battery" className="hover:text-[#C6A96B] transition-colors">Check Battery</Link></li>
              <li><Link href="/check-laptop-ram" className="hover:text-[#C6A96B] transition-colors">Check RAM</Link></li>
              <li><Link href="/check-laptop-ssd" className="hover:text-[#C6A96B] transition-colors">Check SSD</Link></li>
              <li><Link href="/check-laptop-gpu" className="hover:text-[#C6A96B] transition-colors">Check GPU</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#F9FAFB] mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li><Link href="/about" className="hover:text-[#C6A96B] transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-[#C6A96B] transition-colors">Blog & Guides</Link></li>
              <li><Link href="/contact" className="hover:text-[#C6A96B] transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-[#C6A96B] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#C6A96B]/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#9CA3AF]">
          <p>© {new Date().getFullYear()} LaptopScout. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>100% Safe</span>
            <span>•</span>
            <span>Works Offline</span>
            <span>•</span>
            <span>Zero Data Collection</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
