"use client";
import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-8 h-8" }: LogoProps) {
  return (
    <div className="relative flex items-center justify-center">
      <svg 
        className={className} 
        viewBox="0 0 36 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="36" height="36" rx="10" fill="#047857" />
        {/* Executix Core Lightning Bolt & Node Ring */}
        <path 
          d="M20 7L11 20H17L15 29L24 16H18L20 7Z" 
          fill="#FFFFFF"
          stroke="#34D399"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
