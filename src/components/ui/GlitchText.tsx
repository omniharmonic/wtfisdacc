"use client";

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlitchText({ children, className = "" }: GlitchTextProps) {
  return (
    <span className={`relative inline-block animate-glitch ${className}`}>
      {children}
    </span>
  );
}
