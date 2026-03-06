"use client";

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function TerminalWindow({
  title = "d/acc diagnostic",
  children,
  className = "",
}: TerminalWindowProps) {
  return (
    <div
      className={`border border-dacc-green/20 bg-dacc-bg overflow-hidden ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-dacc-surface border-b border-dacc-green/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-dacc-red/80" />
          <div className="w-3 h-3 rounded-full bg-dacc-yellow/80" />
          <div className="w-3 h-3 rounded-full bg-dacc-green/80" />
        </div>
        <span className="ml-2 text-xs font-mono text-dacc-muted">
          {title}
        </span>
      </div>
      {/* Content */}
      <div className="p-4 font-mono text-sm">{children}</div>
    </div>
  );
}
