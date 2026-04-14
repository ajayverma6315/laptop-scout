'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-2xl border-b border-[#C6A96B]/10">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/">
          <Logo size="sm" />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/tool" className="px-5 py-2.5 text-sm font-medium text-[#111827] bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] hover:from-[#EAD7A1] hover:to-[#C6A96B] rounded-full transition-all shadow-[0_0_15px_rgba(198,169,107,0.3)]">Free Test</Link>
          <Link href="/blog" className="text-sm font-medium text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Blog</Link>
          <Link href="/about" className="text-sm font-medium text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">About</Link>
          <Link href="/contact" className="text-sm font-medium text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Contact</Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-[#C6A96B]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[#020617] border-b border-[#C6A96B]/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <Link href="/tool" onClick={() => setIsOpen(false)} className="w-full py-4 text-center font-bold text-[#111827] bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] rounded-xl">Free Test</Link>
          <Link href="/blog" onClick={() => setIsOpen(false)} className="text-lg font-medium text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Blog</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg font-medium text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">About</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="text-lg font-medium text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors">Contact</Link>
        </div>
      )}
    </nav>
  );
}
