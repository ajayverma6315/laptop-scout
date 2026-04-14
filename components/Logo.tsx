import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', showText = true, showTagline = false, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', tagline: 'text-[10px]' },
    md: { icon: 'w-10 h-10', text: 'text-2xl', tagline: 'text-xs' },
    lg: { icon: 'w-16 h-16', text: 'text-4xl', tagline: 'text-sm' },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative ${currentSize.icon} shrink-0`}>
        {/* Shield Outline */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        {/* Green Checkmark */}
        <div className="absolute inset-0 flex items-center justify-center translate-y-[-1px]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4ade80"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-1/2 h-1/2 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-space font-bold tracking-tight text-white leading-none ${currentSize.text}`}>
            Laptop<span className="text-[#C6A96B]">Scout</span>
          </span>
          {showTagline && (
            <span className={`text-[#9CA3AF] font-medium mt-1 ${currentSize.tagline}`}>
              India&apos;s Used Laptop Buying Assistant
            </span>
          )}
        </div>
      )}
    </div>
  );
}
