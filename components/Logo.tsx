"use client";
import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-6 h-6" }: LogoProps) {
  return (
    <div className="flex items-center justify-center shrink-0">
      <svg 
        width="24"
        height="24"
        className={className} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="6" fill="#0F172A" />
        <path 
          d="M13 5L7 14H12L11 19L17 10H12L13 5Z" 
          fill="#FFFFFF" 
        />
      </svg>
    </div>
  );
}
