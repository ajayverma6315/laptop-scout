'use client';

import React, { useState } from 'react';
import type { Metadata } from 'next';
import { Mail, MessageSquare, CheckCircle2, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="font-space text-5xl md:text-7xl font-bold text-[#F9FAFB] mb-6 tracking-tight">
            Get in <span className="bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-[#9CA3AF]">
            Have a question, feedback, or found a bug? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 border border-[#C6A96B]/20 rounded-3xl p-8 text-center hover:border-[#C6A96B]/40 transition-colors">
            <div className="w-16 h-16 mx-auto bg-[#C6A96B]/10 rounded-2xl flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-[#C6A96B]" />
            </div>
            <h3 className="font-bold text-[#F9FAFB] text-xl mb-2">Email Us</h3>
            <p className="text-[#9CA3AF] mb-4">For general queries and support.</p>
            <a href="mailto:hello@laptopscout.in" className="text-[#C6A96B] font-medium hover:underline">hello@laptopscout.in</a>
          </div>
          <div className="bg-white/5 border border-[#C6A96B]/20 rounded-3xl p-8 text-center hover:border-[#C6A96B]/40 transition-colors">
            <div className="w-16 h-16 mx-auto bg-[#C6A96B]/10 rounded-2xl flex items-center justify-center mb-6">
              <MessageSquare className="w-8 h-8 text-[#C6A96B]" />
            </div>
            <h3 className="font-bold text-[#F9FAFB] text-xl mb-2">Social Media</h3>
            <p className="text-[#9CA3AF] mb-4">Follow us for tips and updates.</p>
            <a href="#" className="text-[#C6A96B] font-medium hover:underline">@LaptopScoutIN</a>
          </div>
        </div>

        <div className="bg-white/5 border border-[#C6A96B]/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
          {submitted ? (
            <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="font-space text-3xl font-bold text-[#F9FAFB] mb-4">Message Sent!</h2>
              <p className="text-[#9CA3AF] mb-8">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-[#C6A96B]/30 text-[#F9FAFB] rounded-full font-bold transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-space text-2xl font-bold text-[#F9FAFB] mb-6">Send a Message</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Name</label>
                    <input required type="text" className="w-full bg-[#020617] border border-[#C6A96B]/20 rounded-xl px-4 py-3 text-[#F9FAFB] focus:outline-none focus:border-[#C6A96B] transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Email</label>
                    <input required type="email" className="w-full bg-[#020617] border border-[#C6A96B]/20 rounded-xl px-4 py-3 text-[#F9FAFB] focus:outline-none focus:border-[#C6A96B] transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Message</label>
                  <textarea required rows={5} className="w-full bg-[#020617] border border-[#C6A96B]/20 rounded-xl px-4 py-3 text-[#F9FAFB] focus:outline-none focus:border-[#C6A96B] transition-colors" placeholder="How can we help you?"></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] hover:from-[#EAD7A1] hover:to-[#C6A96B] text-slate-900 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(198,169,107,0.2)] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <CheckCircle2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Send Message</>}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
