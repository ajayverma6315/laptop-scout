'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronRight, Download, Shield, Zap, Cpu, HardDrive, Monitor, Keyboard, Thermometer, Box, Battery, AlertTriangle, CheckCircle2, Info, ArrowRight, RefreshCw, Upload, Lock, AlertCircle } from 'lucide-react';

// --- DATA ---
const TESTS = [
  { id: 'battery', icon: <Battery className="w-6 h-6 text-blue-400" />, title: 'Battery Health Check', desc: 'CMD se actual battery health % nikalo.', steps: ['Run dabao', 'CMD Admin: powercfg /batteryreport', 'Desktop/Users pe battery-report.html kholo', 'FullCharge ÷ Design × 100 = Health %'] },
  { id: 'ram', icon: <Cpu className="w-6 h-6 text-purple-400" />, title: 'RAM + Slot Check', desc: 'RAM kitni hai, DDR type, upgrade slot free hai ya nahi.', steps: ['Ctrl+Shift+Esc → Task Manager', 'Performance → Memory', 'GB, Speed (MHz), DDR type dekho', 'Slots used: 1/2 = upgrade possible!'] },
  { id: 'disk', icon: <HardDrive className="w-6 h-6 text-emerald-400" />, title: 'Disk / SSD Health', desc: 'HDD hai ya SSD? Bad sectors toh nahi?', steps: ['Win+R → cmd → Enter', 'wmic diskdrive get status,model,size', 'Status OK hona chahiye', 'CrystalDiskInfo se deep check karo'] },
  { id: 'screen', icon: <Monitor className="w-6 h-6 text-orange-400" />, title: 'Screen / Dead Pixel Test', desc: 'Dead pixels, backlight bleeding check karo.', steps: ['Run dabao', 'F11 se fullscreen karo', 'Red, Green, Blue, White, Black dekho', 'Koi dark/light spot = dead pixel'] },
  { id: 'keyboard', icon: <Keyboard className="w-6 h-6 text-teal-400" />, title: 'Keyboard Test', desc: 'Har key properly kaam kar rahi hai ya nahi.', steps: ['Run dabao', 'Har key ek ek dabao', 'Green honi chahiye sab', 'Gray key = kharab'] },
  { id: 'cpu', icon: <Zap className="w-6 h-6 text-red-400" />, title: 'CPU Info & Temp', desc: 'Processor naam, cores, speed aur temperature check karo.', steps: ['Ctrl+Shift+Esc → Task Manager', 'Performance → CPU', 'Naam, cores, speed note karo', 'HWMonitor se temp check karo'] },
  { id: 'gpu', icon: <Monitor className="w-6 h-6 text-yellow-400" />, title: 'GPU / Graphics Check', desc: 'Dedicated GPU hai ya nahi? VRAM kitni hai?', steps: ['Win+X → Device Manager', 'Display Adapters expand karo', '2 GPU = dedicated GPU hai!', 'Yellow ! = driver problem'] },
  { id: 'port', icon: <Box className="w-6 h-6 text-indigo-400" />, title: 'Charging Port & Ports Test', desc: 'Loose port = motherboard risk. Sab USB, HDMI, audio check karo.', steps: ['Charger lagao aur hila ke dekho', 'Har USB mein pendrive lagao', 'HDMI se monitor connect karo', 'Headphone jack sound check karo'] },
];

const PURPOSES = [
  { id: 'student', icon: '📚', title: 'Student / Normal Use', desc: 'MS Office, movies, YouTube, studies', tags: ['MS Office', 'Movies', 'Studies', 'Browsing'], minCpu: 4, minRam: 6, minStorage: 5, needsGpu: false, ok: 'Student use ke liye bilkul theek hai! Basic kaam, MS Office, movies sab chalega.', warn: 'Chalega lekin thoda slow ho sakta hai heavy multitasking mein.', bad: 'Student work ke liye bhi weak hai. RAM ya processor bahut kam hai.' },
  { id: 'office', icon: '💼', title: 'Office / Professional', desc: 'Excel, Zoom, Teams, emails', tags: ['Excel', 'Zoom/Teams', 'Emails', 'Multitasking'], minCpu: 5, minRam: 6, minStorage: 5, needsGpu: false, ok: 'Office kaam ke liye solid hai. Excel, Teams, emails sab smooth chalega.', warn: 'Basic office chalega lekin heavy meetings ya badi files mein slow ho sakta hai.', bad: 'Office use ke liye weak hai. Zoom/Teams bhi lag kar sakta hai.' },
  { id: 'creator', icon: '🎨', title: 'Creator / Heavy Work', desc: 'Video editing, gaming, design, coding', tags: ['Video Editing', 'Gaming', 'Design', 'Coding'], minCpu: 7, minRam: 9, minStorage: 7, needsGpu: true, ok: 'Creator work ke liye capable hai! Dedicated GPU hai — editing aur gaming chalega.', warn: 'Thoda weak hai. Kuch kaam chalega lekin heavy projects slow honge.', bad: 'Creator/gaming ke liye suit nahi karta. GPU nahi ya specs bahut weak.', noGpu: 'Creator work ke liye dedicated GPU ZAROORI hai — is mein nahi hai. Mat lo!' },
  { id: 'unknown', icon: '🤔', title: 'Pata Nahi / Future ke Liye', desc: 'Abhi decide nahi, ya future-proof chahiye', tags: ['Future-proof', 'Flexible'], isUnknown: true },
];

const CL = [
  'Screen mein koi crack ya scratch nahi', 'Sab ports working (USB, HDMI)', 'Charger working hai', 'Touchpad smoothly kaam karta hai', 'Speakers mein sound sahi aata hai', 'Webcam working hai', 'WiFi connect ho raha hai', 'Bluetooth kaam karta hai', 'Fan noise normal hai', 'Body mein zyada dent nahi', 'Windows licensed hai', 'RAM upgrade slot free hai', 'SSD hai HDD ki jagah', 'Battery charge ho rahi hai', 'BIOS password nahi laga', 'Seller ke paas original bill hai', 'Serial number verify kiya — stolen nahi', 'Charging port tight hai — loose nahi', 'GPU driver sahi hai — Device Manager mein yellow sign nahi'
];

const LABELS = ['Tests', 'Download', 'Purpose', 'Specs', 'Result'];

// --- COMPONENT ---
export default function LaptopScoutPremium() {
  const [cur, setCur] = useState(0);
  const [dlDone, setDlDone] = useState(false);
  const [selPurpose, setSelPurpose] = useState<string | null>(null);
  const [selUnknown, setSelUnknown] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedTest, setExpandedTest] = useState<string | null>(null);
  
  // Form State
  const [cond, setCond] = useState(5);
  const [price, setPrice] = useState('');
  const [specs, setSpecs] = useState({ cpu: '', ram: '', storage: '', gpu: '', battery: '', screen: '', keyboard: '', heat: '', body: '' });
  const [dh, setDh] = useState({ batDesign: '', batFull: '', batCycles: '', diskHours: '', diskTBW: '', diskSmart: 'ok' });
  const [autoTags, setAutoTags] = useState({ ram: false, gpu: false });
  const [gpuName, setGpuName] = useState('');
  const [upRes, setUpRes] = useState<{ok: boolean, msg: string} | null>(null);
  const [clSet, setClSet] = useState<Set<number>>(new Set());

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 3000);
  };

  const goNext = async () => {
    setLoading(true);
    // Artificial delay for smoothness and "processing" feel
    await new Promise(r => setTimeout(r, 400));
    
    if (cur === 0) { setCur(1); setLoading(false); return; }
    if (cur === 1) {
      if (!dlDone) { showError('Pehle LaptopCheck.bat download karo!'); setLoading(false); return; }
      setCur(2); setLoading(false); return;
    }
    if (cur === 2) {
      if (!selPurpose) { showError('Apna purpose select karo!'); setLoading(false); return; }
      if (selPurpose === 'unknown' && !selUnknown) { showError('Niche wala sawaal bhi answer karo!'); setLoading(false); return; }
      setCur(3); setLoading(false); return;
    }
    if (cur === 3) {
      const req = ['cpu', 'ram', 'storage', 'gpu', 'battery', 'screen', 'keyboard', 'heat', 'body'];
      for (const key of req) {
        if (!specs[key as keyof typeof specs]) { showError('Sab specs fill karo pehle!'); setLoading(false); return; }
      }
      setCur(4); setLoading(false); return;
    }
    setLoading(false);
  };

  const goBack = () => {
    if (cur > 0 && cur < 4) setCur(cur - 1);
  };

  const resetWizard = () => {
    setCur(0); setDlDone(false); setSelPurpose(null); setSelUnknown(null);
    setSpecs({ cpu: '', ram: '', storage: '', gpu: '', battery: '', screen: '', keyboard: '', heat: '', body: '' });
    setCond(5); setPrice(''); setDh({ batDesign: '', batFull: '', batCycles: '', diskHours: '', diskTBW: '', diskSmart: 'ok' });
    setUpRes(null); setAutoTags({ ram: false, gpu: false }); setGpuName('');
  };

  const handleSpecChange = (key: string, val: string) => {
    setSpecs(prev => ({ ...prev, [key]: val }));
  };

  const handleDhChange = (key: string, val: string) => {
    setDh(prev => ({ ...prev, [key]: val }));
  };

  const toggleCl = (i: number) => {
    const newSet = new Set(clSet);
    if (newSet.has(i)) newSet.delete(i);
    else newSet.add(i);
    setClSet(newSet);
  };

  const doDownload = () => {
    const batContent = `@echo off
echo ========================================
echo   LaptopScout Diagnostic Scanner
echo ========================================
echo.
echo Scanning hardware details... please wait.
echo.

echo [CPU] > LaptopTest.txt
wmic cpu get name | findstr /V "Name" >> LaptopTest.txt

echo [RAM] >> LaptopTest.txt
wmic memorychip get capacity | findstr /V "Capacity" >> LaptopTest.txt

echo [DISK] >> LaptopTest.txt
wmic diskdrive get model, size | findstr /V "Model" >> LaptopTest.txt

echo [GPU] >> LaptopTest.txt
wmic path win32_VideoController get name | findstr /V "Name" >> LaptopTest.txt

echo [BATTERY] >> LaptopTest.txt
powercfg /batteryreport /output "%USERPROFILE%\\Desktop\\battery-report.html"
echo Battery report generated on Desktop. >> LaptopTest.txt

echo.
echo ========================================
echo   SCAN COMPLETE!
echo ========================================
echo.
echo 1. Find 'LaptopTest.txt' in this folder.
echo 2. Upload it to LaptopScout website.
echo.
pause`;
    const blob = new Blob([batContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LaptopCheck.bat';
    a.click();
    URL.revokeObjectURL(url);
    setDlDone(true);
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUpRes(null);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.split('\n');
      
      let ramVal = '6'; // Default 8GB
      let cpuVal = '5'; // Default i5
      let gpuVal = '2'; // Default Integrated
      let storageVal = '5'; // Default 256GB
      let batteryVal = '9'; // Default Good

      // Improved parsing logic
      let currentSection = '';
      let ramTotalBytes = 0;

      lines.forEach(line => {
        const clean = line.trim();
        if (!clean) return;

        if (clean.includes('[CPU]')) currentSection = 'CPU';
        else if (clean.includes('[RAM]')) currentSection = 'RAM';
        else if (clean.includes('[DISK]')) currentSection = 'DISK';
        else if (clean.includes('[GPU]')) currentSection = 'GPU';
        else if (clean.includes('[BATTERY]')) currentSection = 'BATTERY';
        else {
          if (currentSection === 'CPU') {
            if (clean.includes('i7') || clean.includes('i9') || clean.includes('Ryzen 7') || clean.includes('Ryzen 9')) cpuVal = '9';
            else if (clean.includes('i5') || clean.includes('Ryzen 5')) cpuVal = '7';
            else if (clean.includes('i3') || clean.includes('Ryzen 3')) cpuVal = '5';
            else cpuVal = '3';
          }
          if (currentSection === 'RAM') {
            const bytes = parseInt(clean.replace(/\D/g, ''));
            if (!isNaN(bytes)) ramTotalBytes += bytes;
          }
          if (currentSection === 'DISK') {
            if (clean.includes('SSD') || clean.includes('NVMe')) storageVal = '8';
            else if (clean.includes('HDD')) storageVal = '3';
          }
          if (currentSection === 'GPU') {
            if (clean.includes('NVIDIA') || clean.includes('RTX')) gpuVal = '9';
            else if (clean.includes('GTX') || clean.includes('Radeon')) gpuVal = '7';
          }
        }
      });

      if (ramTotalBytes > 0) {
        const gb = ramTotalBytes / (1024 * 1024 * 1024);
        if (gb >= 15) ramVal = '9';
        else if (gb >= 7) ramVal = '6';
        else ramVal = '4';
      }

      setTimeout(() => {
        setSpecs(prev => ({ 
          ...prev, 
          ram: ramVal, 
          storage: storageVal, 
          cpu: cpuVal, 
          gpu: gpuVal, 
          battery: batteryVal,
          screen: prev.screen || '10',
          keyboard: prev.keyboard || '10',
          heat: prev.heat || '10',
          body: prev.body || '10'
        }));
        setAutoTags({ ram: true, gpu: true });
        setUpRes({ ok: true, msg: '✅ Report parsed successfully! Specs have been auto-filled.' });
        setLoading(false);
      }, 800);
    };
    reader.onerror = () => {
      setUpRes({ ok: false, msg: '❌ File padhne mein error aaya. Dubara try karein.' });
      setLoading(false);
    };
    reader.readAsText(file);
  };

  // --- RENDER HELPERS ---
  const renderStepTracker = () => (
    <div className="flex items-center px-8 py-6 border-b border-[#C6A96B]/10 overflow-x-auto hide-scrollbar">
      {LABELS.map((l, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center shrink-0">
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${i < cur ? 'bg-[#C6A96B] border-[#C6A96B] text-slate-900' : i === cur ? 'bg-[#C6A96B] border-[#C6A96B] text-slate-900 shadow-[0_0_16px_rgba(198,169,107,0.5)]' : 'border-[#C6A96B]/20 text-[#9CA3AF]'}`}>
              {i < cur ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`ml-3 text-xs font-medium whitespace-nowrap ${i === cur ? 'text-[#C6A96B]' : 'text-[#9CA3AF]'}`}>{l}</span>
          </div>
          {i < LABELS.length - 1 && (
            <div className={`flex-1 h-[2px] mx-4 min-w-[24px] transition-colors duration-300 ${i < cur ? 'bg-[#C6A96B]' : 'bg-[#C6A96B]/10'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const specValues = React.useMemo(() => ({
    cpu: parseInt(specs.cpu || '0'),
    ram: parseInt(specs.ram || '0'),
    storage: parseInt(specs.storage || '0'),
    gpu: parseInt(specs.gpu || '0'),
    battery: parseInt(specs.battery || '0'),
    screen: parseInt(specs.screen || '0'),
    keyboard: parseInt(specs.keyboard || '0'),
    heat: parseInt(specs.heat || '0'),
    body: parseInt(specs.body || '0'),
  }), [specs]);

  const { score, fairValue, minPrice, maxPrice, arcCol } = React.useMemo(() => {
    const totalSpecValue = Object.values(specValues).reduce((a, b) => a + b, 0);
    const maxSpecValue = 80;
    const specScore = Math.round((totalSpecValue / maxSpecValue) * 100);
    const condScore = Math.round((cond / 10) * 100);
    const score = Math.round(specScore * 0.75 + condScore * 0.25);
    
    const arcCol = score >= 78 ? '#10B981' : score >= 58 ? '#F59E0B' : score >= 38 ? '#F59E0B' : '#EF4444';

    const fairValue = 10000 + (specValues.cpu * 1500) + (specValues.ram * 1000) + (specValues.storage * 800) + (specValues.gpu * 2000) + (cond * 1000);
    const minPrice = Math.round(fairValue * 0.85);
    const maxPrice = Math.round(fairValue * 1.15);

    return { score, fairValue, minPrice, maxPrice, arcCol };
  }, [specValues, cond]);

  const renderResult = () => {
    let vClass, vText, vTitle, vDesc;
    if (score >= 78) { vClass = 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'; vText = 'Ek Dum Badiya!'; vTitle = 'Lo Yeh Laptop! ✅'; vDesc = 'Condition bhi, specs bhi — sab acha hai. Deal karo!'; }
    else if (score >= 58) { vClass = 'text-[#C6A96B] bg-[#C6A96B]/10 border-[#C6A96B]/20'; vText = 'Theek Thaak'; vTitle = 'Soch Samajh Ke Lo 🤔'; vDesc = 'Kuch kami hai lekin chalega. Niche kamiyaan dekho.'; }
    else if (score >= 38) { vClass = 'text-orange-400 bg-orange-400/10 border-orange-400/20'; vText = 'Risky Deal'; vTitle = 'Price Negotiate Karo ⚠️'; vDesc = 'Kaafi problems hain. Price kam karo ya better option dekho.'; }
    else { vClass = 'text-red-400 bg-red-400/10 border-red-400/20'; vText = 'Mat Lo!'; vTitle = 'Yeh Laptop Mat Lo ❌'; vDesc = 'Bahut zyada problems. Paisa barbad hoga.'; }

    const userPrice = parseInt(price || '0');
    let priceMsg = '';
    let priceClass = '';
    let priceIcon = null;
    
    if (userPrice === 0) {
      priceMsg = 'Aapne price nahi daali, par fair value upar di gayi hai.';
      priceClass = 'text-[#9CA3AF] bg-white/5 border-[#C6A96B]/20';
      priceIcon = <Info className="w-5 h-5 shrink-0 mt-0.5" />;
    } else if (userPrice < minPrice) {
      priceMsg = 'Bahut sasta mil raha hai! Check karo koi hidden problem toh nahi.';
      priceClass = 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      priceIcon = <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />;
    } else if (userPrice > maxPrice) {
      priceMsg = 'Bahut mehenga hai! Seller se price kam karao.';
      priceClass = 'text-red-400 bg-red-400/10 border-red-400/20';
      priceIcon = <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />;
    } else {
      priceMsg = 'Qeemat Fair Hai! Fair range mein hai. Confidently deal kar sakte ho!';
      priceClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      priceIcon = <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />;
    }

    const batText = specs.battery === '9' ? 'Good' : specs.battery === '5' ? 'Average' : 'Poor';
    const ramText = specs.ram === '9' ? '16GB' : specs.ram === '6' ? '8GB' : '4GB';
    const diskText = specs.storage === '8' ? 'SSD 512GB' : specs.storage === '5' ? 'SSD 256GB' : 'HDD';

    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Hero Result */}
        <div className="relative overflow-hidden bg-white/5 border border-[#C6A96B]/20 rounded-[2.5rem] p-10 md:p-16 shadow-2xl backdrop-blur-md">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-br from-[#C6A96B]/10 via-transparent to-transparent blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="relative w-56 h-56 shrink-0">
              <svg viewBox="0 0 120 120" className="w-full h-full transform -rotate-90 drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(198,169,107,0.05)" strokeWidth="6" />
                <motion.circle 
                  cx="60" cy="60" r="54" fill="none" stroke={arcCol} strokeWidth="8" strokeLinecap="round"
                  strokeDasharray="339.3"
                  initial={{ strokeDashoffset: 339.3 }}
                  animate={{ strokeDashoffset: 339.3 - (339.3 * score / 100) }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ filter: `drop-shadow(0 0 12px ${arcCol})` }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="font-space text-7xl font-bold tracking-tighter" 
                  style={{ color: arcCol, textShadow: `0 0 30px ${arcCol}60` }}
                >
                  {score}
                </motion.span>
                <span className="text-sm text-[#9CA3AF] uppercase tracking-[0.3em] mt-1 font-bold opacity-60">Health</span>
              </div>
            </div>

            <div className="text-center md:text-left flex-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className={`inline-flex px-6 py-2 rounded-full text-sm font-black uppercase tracking-[0.2em] border-2 mb-8 ${vClass}`}
              >
                {vText}
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="font-space text-4xl md:text-6xl font-bold mb-6 text-[#F9FAFB] tracking-tight leading-tight"
              >
                {vTitle}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-[#9CA3AF] text-xl leading-relaxed max-w-xl"
              >
                {vDesc}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-[#C6A96B]/20 rounded-3xl p-8 text-center hover:bg-white/10 transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔋</div>
            <div className={`font-space text-3xl font-bold mb-2 ${specs.battery === '9' ? 'text-emerald-400' : specs.battery === '5' ? 'text-amber-400' : 'text-red-400'}`}>{batText}</div>
            <div className="text-sm font-bold text-[#9CA3AF] uppercase tracking-widest">Battery Health</div>
          </div>
          <div className="bg-white/5 border border-[#C6A96B]/20 rounded-3xl p-8 text-center hover:bg-white/10 transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🧠</div>
            <div className="font-space text-3xl font-bold text-[#F9FAFB] mb-2">{ramText}</div>
            <div className="text-sm font-bold text-[#9CA3AF] uppercase tracking-widest">RAM Capacity</div>
          </div>
          <div className="bg-white/5 border border-[#C6A96B]/20 rounded-3xl p-8 text-center hover:bg-white/10 transition-all group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💾</div>
            <div className={`font-space text-3xl font-bold mb-2 ${specs.storage === '3' ? 'text-amber-400' : 'text-emerald-400'}`}>{diskText}</div>
            <div className="text-sm font-bold text-[#9CA3AF] uppercase tracking-widest">Storage Speed</div>
          </div>
        </div>

        {/* Price Engine */}
        <div className="bg-white/5 border border-[#C6A96B]/20 rounded-[2.5rem] p-10 md:p-16 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A96B]/5 blur-[80px] -mr-32 -mt-32" />
          <h4 className="font-space text-2xl font-bold mb-12 flex items-center gap-4 text-[#F9FAFB]">
            <Zap className="w-8 h-8 text-[#C6A96B]" /> Price Analysis Engine
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex justify-between items-center pb-6 border-b border-[#C6A96B]/10">
                <span className="text-lg text-[#9CA3AF] font-medium">Seller Ki Price</span>
                <span className="font-space text-3xl font-bold text-[#F9FAFB]">₹{userPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center pb-6 border-b border-[#C6A96B]/10">
                <span className="text-lg text-[#9CA3AF] font-medium">LaptopScout Fair Value</span>
                <span className="font-space text-4xl font-bold text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">₹{fairValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg text-[#9CA3AF] font-medium">Negotiate Range</span>
                <span className="font-space text-2xl font-bold text-[#C6A96B]">₹{minPrice.toLocaleString('en-IN')} – ₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div className={`border-2 rounded-3xl p-8 text-lg flex gap-6 items-start shadow-2xl h-full ${priceClass}`}>
              <div className="p-3 bg-white/10 rounded-2xl">{priceIcon}</div>
              <div className="space-y-3">
                <p className="font-bold text-2xl leading-tight">{priceMsg.split('!')[0]}{priceMsg.includes('!') ? '!' : ''}</p>
                <p className="text-base opacity-80 leading-relaxed">{priceMsg.split('!').slice(1).join('!').trim()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-12">
          <button onClick={resetWizard} className="flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] text-slate-900 rounded-full text-xl font-bold transition-all hover:scale-105 shadow-[0_0_30px_rgba(198,169,107,0.3)]">
            Check Laptop Now <RefreshCw className="w-6 h-6" />
          </button>
          <Link href="/blog" className="flex items-center justify-center gap-3 px-12 py-6 bg-white/5 hover:bg-white/10 border border-[#C6A96B]/30 rounded-full text-xl font-bold transition-all hover:scale-105 text-[#F9FAFB]">
            Avoid Bad Purchase <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[#052E2B] blur-[140px] opacity-70 mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-[#C6A96B]/10 blur-[140px] opacity-50 mix-blend-screen" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full bg-[#0F3D2E]/20 blur-[120px] opacity-40 mix-blend-screen" />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 pb-24">
        {/* Wizard */}
        <section id="test" className="scroll-mt-24">
          <div className="text-center mb-16">
            <div className="text-[#C6A96B] text-xs font-bold tracking-widest uppercase mb-4 flex items-center justify-center gap-3">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C6A96B]" /> 
              Evaluation Engine 
              <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C6A96B]" />
            </div>
            <div className="flex justify-center mb-6">
              <Logo size="md" showText={false} />
            </div>
            <h2 className="font-space text-3xl md:text-5xl font-bold text-[#F9FAFB] tracking-tight">Laptop Test 🔬</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[#9CA3AF] font-medium">
              <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-[#C6A96B]" /> No Install Required</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#C6A96B]" /> Works 100% Offline</div>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#C6A96B]" /> Zero Data Collection</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-2xl border border-[#C6A96B]/20">
            {renderStepTracker()}

            <div className="p-6 md:p-12 min-h-[400px]">
              <AnimatePresence mode="wait">
                {/* STEP 1 */}
                {cur === 0 && (
                  <motion.div key="step0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                    <h3 className="font-space text-3xl font-bold text-[#F9FAFB] mb-3">Step 1 — Tests Guide 🔧</h3>
                    <p className="text-[#9CA3AF] mb-10 text-lg">Yeh sab tests laptop pe manually chalao. Har card pe guide hai.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {TESTS.map(t => (
                         <div key={t.id} className="group bg-white/5 border border-[#C6A96B]/10 rounded-3xl p-6 hover:bg-white/10 hover:border-[#C6A96B]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(198,169,107,0.15)] flex flex-col">
                          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">{t.icon}</div>
                          <h4 className="font-space font-bold text-[#F9FAFB] text-lg mb-3">{t.title}</h4>
                          <p className="text-sm text-[#9CA3AF] mb-6 line-clamp-2 leading-relaxed">{t.desc}</p>
                          
                          <AnimatePresence>
                            {expandedTest === t.id && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }} 
                                animate={{ opacity: 1, height: 'auto' }} 
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-4 overflow-hidden"
                              >
                                <div className="p-4 bg-white/5 rounded-xl space-y-2">
                                  {t.steps.map((s, idx) => (
                                    <div key={idx} className="flex gap-2 text-xs text-[#EAD7A1]">
                                      <span className="font-bold">{idx + 1}.</span>
                                      <span>{s}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <button 
                            onClick={() => setExpandedTest(expandedTest === t.id ? null : t.id)}
                            className="mt-auto w-full py-3 rounded-xl bg-[#C6A96B]/10 text-[#C6A96B] text-sm font-bold hover:bg-[#C6A96B]/20 transition-colors"
                          >
                            {expandedTest === t.id ? 'Band Karo' : 'Guide Dekho'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {cur === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="max-w-3xl mx-auto">
                    <h3 className="font-space text-3xl font-bold text-[#F9FAFB] mb-3 text-center">Step 2 — Scanner File Download ⬇️</h3>
                    <p className="text-[#9CA3AF] mb-10 text-lg text-center">Ek hi file — Battery, RAM, Disk, CPU, GPU sab ek saath scan hoga.</p>
                    
                    <div className="bg-gradient-to-br from-[#C6A96B]/10 to-[#EAD7A1]/5 border border-[#C6A96B]/20 rounded-[2rem] p-10 text-center mb-8 relative overflow-hidden backdrop-blur-md">
                      <div className="absolute top-0 right-0 p-8 opacity-5"><HardDrive className="w-40 h-40" /></div>
                      <div className="relative z-10">
                        <div className="text-6xl mb-6">🗂️</div>
                        <div className="font-space font-bold text-3xl text-[#F9FAFB] mb-3">LaptopCheck.bat</div>
                        <div className="text-base text-[#9CA3AF] mb-8">Battery · RAM · Disk · CPU · GPU — sab ek scan mein</div>
                        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium px-5 py-2.5 rounded-xl mb-10">
                          <CheckCircle2 className="w-5 h-5" /> Save hogi: Desktop → LaptopTest.txt
                        </div>
                        <button onClick={doDownload} className={`w-full max-w-md mx-auto py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${dlDone ? 'bg-emerald-500 text-white shadow-[0_0_30px_rgba(52,211,153,0.4)]' : 'bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] text-slate-900 shadow-[0_0_30px_rgba(198,169,107,0.4)] hover:shadow-[0_0_50px_rgba(198,169,107,0.6)] hover:scale-105'}`}>
                          {dlDone ? <><Check className="w-6 h-6" /> Downloaded! Ab Run Karo</> : <><Download className="w-6 h-6" /> Download Scanner</>}
                        </button>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-[#C6A96B]/20 rounded-2xl p-6 flex items-start gap-4">
                      <Shield className="w-8 h-8 text-emerald-400 shrink-0" />
                      <div>
                        <h4 className="font-bold text-[#F9FAFB] text-base mb-1">100% Safe • No Install • Offline</h4>
                        <p className="text-sm text-[#9CA3AF] leading-relaxed">Yeh file sirf is laptop ka data padhti hai — kuch bhi internet pe nahi jaata. Windows block kare toh &quot;More Info → Run Anyway&quot; karein.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {cur === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                    <h3 className="font-space text-3xl font-bold text-[#F9FAFB] mb-3">Step 3 — Kisliye Lena Hai? 🎯</h3>
                    <p className="text-[#9CA3AF] mb-10 text-lg">Sahi suggestion ke liye apna purpose select karo.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {PURPOSES.map(p => (
                        <div key={p.id} onClick={() => { setSelPurpose(p.id); setSelUnknown(null); }} className={`group bg-white/5 border rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(198,169,107,0.15)] ${selPurpose === p.id ? 'border-[#C6A96B] bg-[#C6A96B]/10 shadow-[0_0_30px_rgba(198,169,107,0.2)]' : 'border-[#C6A96B]/10 hover:border-[#C6A96B]/30 hover:bg-white/10'}`}>
                          <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 origin-left">{p.icon}</div>
                          <h4 className="font-space font-bold text-[#F9FAFB] text-xl mb-3">{p.title}</h4>
                          <p className="text-base text-[#9CA3AF] mb-6 leading-relaxed">{p.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {p.tags.map(t => <span key={t} className={`text-xs font-medium px-3 py-1.5 rounded-full ${selPurpose === p.id ? 'bg-[#C6A96B]/20 text-[#C6A96B]' : 'bg-white/10 text-[#9CA3AF]'}`}>{t}</span>)}
                          </div>
                        </div>
                      ))}
                    </div>
                    {selPurpose === 'unknown' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-8 bg-[#C6A96B]/5 border border-[#C6A96B]/20 rounded-3xl p-8 backdrop-blur-md">
                        <h4 className="font-space font-bold text-[#C6A96B] text-lg mb-6">🤔 Abhi kya karte ho laptop pe?</h4>
                        <div className="space-y-4">
                          <div onClick={() => setSelUnknown('normal')} className={`p-5 rounded-2xl border cursor-pointer transition-all ${selUnknown === 'normal' ? 'border-[#C6A96B] bg-[#C6A96B]/10 shadow-[0_0_20px_rgba(198,169,107,0.15)]' : 'border-[#C6A96B]/10 bg-white/5 hover:bg-white/10'}`}>
                            <div className="font-bold text-[#F9FAFB] text-base">Normal kaam</div>
                            <div className="text-sm text-[#9CA3AF] mt-1">Browsing, YouTube, documents — light use</div>
                          </div>
                          <div onClick={() => setSelUnknown('heavy')} className={`p-5 rounded-2xl border cursor-pointer transition-all ${selUnknown === 'heavy' ? 'border-[#C6A96B] bg-[#C6A96B]/10 shadow-[0_0_20px_rgba(198,169,107,0.15)]' : 'border-[#C6A96B]/10 bg-white/5 hover:bg-white/10'}`}>
                            <div className="font-bold text-[#F9FAFB] text-base">Pata nahi / Future-proof chahiye</div>
                            <div className="text-sm text-[#9CA3AF] mt-1">Kaam badh sakta hai — safe side rehna chahiye</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* STEP 4 */}
                {cur === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                    <h3 className="font-space text-3xl font-bold text-[#F9FAFB] mb-3">Step 4 — Specs Fill Karo 📋</h3>
                    <p className="text-[#9CA3AF] mb-10 text-lg">LaptopTest.txt upload karo — sab auto fill ho jayega. Ya manually select karo.</p>

                    {/* Upload Zone */}
                    <div className="bg-[#C6A96B]/5 border border-[#C6A96B]/20 rounded-3xl p-8 mb-10 backdrop-blur-md">
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-bold text-[#F9FAFB] text-base flex items-center gap-2"><Upload className="w-5 h-5 text-[#C6A96B]" /> Upload Report</span>
                        <span className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider bg-white/5 px-3 py-1 rounded-full">Optional</span>
                      </div>
                      <div onClick={() => !loading && fileInputRef.current?.click()} className={`border-2 border-dashed border-[#C6A96B]/20 hover:border-[#C6A96B]/50 hover:bg-[#C6A96B]/5 rounded-2xl p-10 text-center cursor-pointer transition-all group ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          {loading ? <RefreshCw className="w-8 h-8 text-[#C6A96B] animate-spin" /> : <Upload className="w-8 h-8 text-[#9CA3AF] group-hover:text-[#C6A96B] transition-colors" />}
                        </div>
                        <p className="text-base text-[#9CA3AF]">{loading ? 'Parsing file...' : <>Click to select <strong className="text-[#F9FAFB]">LaptopTest.txt</strong></>}</p>
                      </div>
                      <input type="file" ref={fileInputRef} accept=".txt" className="hidden" onChange={onFileSelect} />
                      {upRes && (
                        <div className={`mt-6 p-5 rounded-2xl text-sm font-medium ${upRes.ok ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                          {upRes.msg}
                        </div>
                      )}
                    </div>

                    {/* Condition Slider */}
                    <div className="bg-white/5 border border-[#C6A96B]/20 rounded-3xl p-8 mb-10">
                      <h4 className="font-space font-bold text-[#F9FAFB] text-lg mb-2">📦 Physical Condition — Rate Karo (1–10)</h4>
                      <p className="text-sm text-[#9CA3AF] mb-8">Body, screen, keyboard, ports haath se check karo aur rate karo.</p>
                      <div className="flex items-center gap-8 mb-6">
                        <input type="range" min="1" max="10" step="0.5" value={cond} onChange={(e) => setCond(parseFloat(e.target.value))} className="premium-slider" />
                        <div className="font-space text-4xl font-bold w-20 text-right" style={{ color: cond >= 8 ? '#10B981' : cond >= 5 ? '#F59E0B' : '#EF4444' }}>{cond.toFixed(1)}</div>
                      </div>
                      <div className="flex justify-between text-xs text-[#9CA3AF] uppercase tracking-wider font-bold">
                        <span>1 — Kharab</span><span>5 — Average</span><span>10 — Naya</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="bg-[#0F3D2E]/20 border border-[#0F3D2E]/40 rounded-3xl p-8 mb-10 backdrop-blur-md">
                      <h4 className="font-space font-bold text-[#2DD4BF] text-lg mb-2">💸 Seller Ki Qeemat</h4>
                      <p className="text-sm text-[#9CA3AF] mb-6">Kitne mein de raha hai? Main bataunga sahi hai ya zyada.</p>
                      <div className="relative max-w-sm">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2DD4BF] font-bold text-2xl">₹</span>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="00000" className="w-full bg-white/5 border border-[#2DD4BF]/30 rounded-2xl py-4 pl-12 pr-5 text-[#F9FAFB] font-space text-2xl font-bold focus:outline-none focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 transition-all" />
                      </div>
                    </div>

                    {/* Specs Grid */}
                    <h4 className="font-space font-bold text-[#F9FAFB] text-xl mb-6">⚙️ Technical Specs</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#9CA3AF]">⚡ Processor</label>
                        <select value={specs.cpu} onChange={e => handleSpecChange('cpu', e.target.value)} className="w-full bg-white/5 border border-[#C6A96B]/20 rounded-2xl px-5 py-4 text-base text-[#F9FAFB] focus:outline-none focus:border-[#C6A96B] focus:ring-2 focus:ring-[#C6A96B]/20 appearance-none transition-all cursor-pointer">
                          <option value="" className="bg-[#020617]">-- Select Processor --</option>
                          <option value="3" className="bg-[#020617]">Intel Core i3 (Older)</option>
                          <option value="5" className="bg-[#020617]">Intel Core i5 (8th Gen+)</option>
                          <option value="7" className="bg-[#020617]">Intel Core i7</option>
                          <option value="5" className="bg-[#020617]">AMD Ryzen 5</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#9CA3AF]">🧠 RAM {autoTags.ram && <span className="text-emerald-400 ml-2 bg-emerald-500/10 px-2 py-0.5 rounded text-xs">✓ Auto</span>}</label>
                        <select value={specs.ram} onChange={e => handleSpecChange('ram', e.target.value)} className="w-full bg-white/5 border border-[#C6A96B]/20 rounded-2xl px-5 py-4 text-base text-[#F9FAFB] focus:outline-none focus:border-[#C6A96B] focus:ring-2 focus:ring-[#C6A96B]/20 appearance-none transition-all cursor-pointer">
                          <option value="" className="bg-[#020617]">-- Select --</option>
                          <option value="2" className="bg-[#020617]">4 GB</option>
                          <option value="6" className="bg-[#020617]">8 GB</option>
                          <option value="9" className="bg-[#020617]">16 GB</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#9CA3AF]">💾 Storage</label>
                        <select value={specs.storage} onChange={e => handleSpecChange('storage', e.target.value)} className="w-full bg-white/5 border border-[#C6A96B]/20 rounded-2xl px-5 py-4 text-base text-[#F9FAFB] focus:outline-none focus:border-[#C6A96B] focus:ring-2 focus:ring-[#C6A96B]/20 appearance-none transition-all cursor-pointer">
                          <option value="" className="bg-[#020617]">-- Select --</option>
                          <option value="3" className="bg-[#020617]">HDD 500GB–1TB</option>
                          <option value="5" className="bg-[#020617]">SSD 256GB</option>
                          <option value="8" className="bg-[#020617]">SSD 512GB</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#9CA3AF]">🎮 GPU {autoTags.gpu && <span className="text-emerald-400 ml-2 bg-emerald-500/10 px-2 py-0.5 rounded text-xs">✓ Auto</span>}</label>
                        <select value={specs.gpu} onChange={e => handleSpecChange('gpu', e.target.value)} className="w-full bg-white/5 border border-[#C6A96B]/20 rounded-2xl px-5 py-4 text-base text-[#F9FAFB] focus:outline-none focus:border-[#C6A96B] focus:ring-2 focus:ring-[#C6A96B]/20 appearance-none transition-all cursor-pointer">
                          <option value="" className="bg-[#020617]">-- Select GPU --</option>
                          <option value="2" className="bg-[#020617]">Integrated (Intel UHD/Iris)</option>
                          <option value="5" className="bg-[#020617]">NVIDIA GTX 1650</option>
                          <option value="7" className="bg-[#020617]">NVIDIA RTX 3050</option>
                        </select>
                        {gpuName && <div className="text-xs text-emerald-400 mt-2 font-medium">{gpuName}</div>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#9CA3AF]">🔋 Battery Health</label>
                        <select value={specs.battery} onChange={e => handleSpecChange('battery', e.target.value)} className="w-full bg-white/5 border border-[#C6A96B]/20 rounded-2xl px-5 py-4 text-base text-[#F9FAFB] focus:outline-none focus:border-[#C6A96B] focus:ring-2 focus:ring-[#C6A96B]/20 appearance-none transition-all cursor-pointer">
                          <option value="" className="bg-[#020617]">-- Select Health % --</option>
                          <option value="9" className="bg-[#020617]">85–100% (Good)</option>
                          <option value="5" className="bg-[#020617]">65–85% (Average)</option>
                          <option value="1" className="bg-[#020617]">Below 65% (Poor)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#9CA3AF]">🖥️ Screen Condition</label>
                        <select value={specs.screen} onChange={e => handleSpecChange('screen', e.target.value)} className="w-full bg-white/5 border border-[#C6A96B]/20 rounded-2xl px-5 py-4 text-base text-[#F9FAFB] focus:outline-none focus:border-[#C6A96B] focus:ring-2 focus:ring-[#C6A96B]/20 appearance-none transition-all cursor-pointer">
                          <option value="" className="bg-[#020617]">-- Select --</option>
                          <option value="10" className="bg-[#020617]">Perfect</option>
                          <option value="6" className="bg-[#020617]">Minor scratch</option>
                          <option value="2" className="bg-[#020617]">Dead pixels</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#9CA3AF]">⌨️ Keyboard & Touchpad</label>
                        <select value={specs.keyboard} onChange={e => handleSpecChange('keyboard', e.target.value)} className="w-full bg-white/5 border border-[#C6A96B]/20 rounded-2xl px-5 py-4 text-base text-[#F9FAFB] focus:outline-none focus:border-[#C6A96B] focus:ring-2 focus:ring-[#C6A96B]/20 appearance-none transition-all cursor-pointer">
                          <option value="" className="bg-[#020617]">-- Select --</option>
                          <option value="10" className="bg-[#020617]">All working</option>
                          <option value="5" className="bg-[#020617]">1-2 keys bad</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#9CA3AF]">🌡️ Heating</label>
                        <select value={specs.heat} onChange={e => handleSpecChange('heat', e.target.value)} className="w-full bg-white/5 border border-[#C6A96B]/20 rounded-2xl px-5 py-4 text-base text-[#F9FAFB] focus:outline-none focus:border-[#C6A96B] focus:ring-2 focus:ring-[#C6A96B]/20 appearance-none transition-all cursor-pointer">
                          <option value="" className="bg-[#020617]">-- Select --</option>
                          <option value="10" className="bg-[#020617]">Normal</option>
                          <option value="3" className="bg-[#020617]">Overheats</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#9CA3AF]">🔌 Body & Ports</label>
                        <select value={specs.body} onChange={e => handleSpecChange('body', e.target.value)} className="w-full bg-white/5 border border-[#C6A96B]/20 rounded-2xl px-5 py-4 text-base text-[#F9FAFB] focus:outline-none focus:border-[#C6A96B] focus:ring-2 focus:ring-[#C6A96B]/20 appearance-none transition-all cursor-pointer">
                          <option value="" className="bg-[#020617]">-- Select --</option>
                          <option value="10" className="bg-[#020617]">Clean, all ports work</option>
                          <option value="3" className="bg-[#020617]">Dents / broken ports</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5 */}
                {cur === 4 && renderResult()}
              </AnimatePresence>
            </div>

            {/* Wizard Footer */}
            {cur < 4 && (
              <div className="px-6 md:px-12 py-6 border-t border-[#C6A96B]/10 bg-white/5 flex items-center justify-between">
                <button 
                  onClick={goBack} 
                  disabled={loading}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${cur > 0 ? 'text-[#9CA3AF] hover:bg-white/10 hover:text-[#F9FAFB]' : 'opacity-0 pointer-events-none'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Back
                </button>
                <div className="text-sm text-[#9CA3AF] font-medium tracking-wide">
                  {errorMsg ? <span className="text-red-400 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {errorMsg}</span> : `Step ${cur + 1} of 5`}
                </div>
                <button 
                  onClick={goNext} 
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-[#C6A96B] to-[#EAD7A1] hover:from-[#EAD7A1] hover:to-[#C6A96B] text-slate-900 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(198,169,107,0.3)] hover:shadow-[0_0_30px_rgba(198,169,107,0.5)] hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <>Next <ChevronRight className="w-5 h-5" /></>}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Checklist */}
        <section id="checklist" className="mt-40 scroll-mt-24">
          <div className="text-center mb-16">
            <div className="text-[#C6A96B] text-xs font-bold tracking-widest uppercase mb-4 flex items-center justify-center gap-3">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C6A96B]" /> 
              Quick Check 
              <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C6A96B]" />
            </div>
            <h2 className="font-space text-3xl md:text-5xl font-bold text-[#F9FAFB] tracking-tight">Market Mein Kya Dekhna Hai</h2>
          </div>
          
          <div className="bg-white/5 border border-[#C6A96B]/20 rounded-[2rem] p-8 md:p-12 shadow-2xl backdrop-blur-md">
            <div className="flex justify-between items-end mb-6">
              <span className="text-base font-bold text-[#C6A96B]">{clSet.size} / {CL.length} complete</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full mb-10 overflow-hidden shadow-inner">
              <div className="h-full bg-gradient-to-r from-[#0F3D2E] via-[#C6A96B] to-[#EAD7A1] transition-all duration-500" style={{ width: `${(clSet.size / CL.length) * 100}%` }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CL.map((c, i) => (
                <div key={i} onClick={() => toggleCl(i)} className={`group flex items-center gap-5 p-5 rounded-2xl cursor-pointer transition-all duration-300 border select-none ${clSet.has(i) ? 'bg-[#C6A96B]/10 border-[#C6A96B]/30 shadow-[0_0_20px_rgba(198,169,107,0.1)]' : 'bg-white/5 border-[#C6A96B]/10 hover:bg-white/10 hover:border-[#C6A96B]/20'}`}>
                  <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${clSet.has(i) ? 'bg-[#C6A96B] border-[#C6A96B] text-slate-900 scale-110' : 'border-[#C6A96B]/20 group-hover:border-[#C6A96B]/40'}`}>
                    {clSet.has(i) && <Check className="w-5 h-5" />}
                  </div>
                  <span className={`text-base font-medium transition-colors ${clSet.has(i) ? 'text-[#F9FAFB]' : 'text-[#9CA3AF] group-hover:text-[#F9FAFB]'}`}>{c}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center border-t border-[#C6A96B]/10 pt-8">
              <p className="text-[#9CA3AF] mb-4">Want to learn more about inspecting used laptops?</p>
              <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-[#C6A96B]/30 text-[#F9FAFB] rounded-full font-medium transition-all">
                Read our Buying Guides <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
