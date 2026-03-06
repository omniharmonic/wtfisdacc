"use client";

import { useEffect, useRef } from "react";

const TERMS = [
  "ZK", "PRIVACY", "DEFENSE", "COORDINATION", "SOVEREIGN",
  "PLURAL", "RESILIENT", "DECENTRALIZE", "ACCELERATE", "VERIFY",
  "ATTEST", "ENCRYPT", "PERMISSIONLESS", "d/acc", "TRUSTLESS",
  "OPEN", "SECURE", "DEFEND", "BUILD", "SHIP",
];

interface MatrixRainProps {
  className?: string;
}

export default function MatrixRain({ className = "" }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let frameCount = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const fontSize = 14;
    const columns = Math.floor(canvas.offsetWidth / (fontSize * 1.5));
    const drops: number[] = Array(columns).fill(0).map(() => Math.random() * -50);
    const speeds: number[] = Array(columns).fill(0).map(() => 0.3 + Math.random() * 0.7);

    const isMobile = window.innerWidth < 640;

    const draw = () => {
      frameCount++;
      // 30fps on mobile (skip every other frame)
      if (isMobile && frameCount % 2 !== 0) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = "rgba(15, 15, 35, 0.08)";
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < columns; i++) {
        const term = TERMS[Math.floor(Math.random() * TERMS.length)];
        const char = term[Math.floor(Math.random() * term.length)];

        const y = drops[i] * fontSize;
        const alpha = Math.max(0, 1 - (y / canvas.offsetHeight) * 0.5);

        // Lead character is brighter
        if (Math.random() > 0.95) {
          ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(0, 255, 136, ${alpha * 0.4})`;
        }

        ctx.fillText(char, i * fontSize * 1.5, y);

        drops[i] += speeds[i];

        if (y > canvas.offsetHeight && Math.random() > 0.98) {
          drops[i] = 0;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ opacity: 0.6 }}
    />
  );
}
