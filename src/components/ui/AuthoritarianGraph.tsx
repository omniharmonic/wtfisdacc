"use client";

import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function AuthoritarianGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const animProgress = useRef(0);
  const animId = useRef<number>(0);

  // Intersection Observer to trigger animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !visible) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    // Layout constants
    const pad = { top: 30, bottom: 40, left: 50, right: 30 };
    const gW = W - pad.left - pad.right;
    const gH = H - pad.top - pad.bottom;
    const nowX = pad.left + gW * 0.45; // "NOW" inflection point

    function drawFrame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      // Grid lines
      ctx.strokeStyle = "rgba(153, 153, 170, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = pad.top + (gH / 5) * i;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(W - pad.right, y);
        ctx.stroke();
      }
      for (let i = 0; i <= 8; i++) {
        const x = pad.left + (gW / 8) * i;
        ctx.beginPath();
        ctx.moveTo(x, pad.top);
        ctx.lineTo(x, pad.top + gH);
        ctx.stroke();
      }

      // Axes
      ctx.strokeStyle = "rgba(153, 153, 170, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad.left, pad.top);
      ctx.lineTo(pad.left, pad.top + gH);
      ctx.lineTo(W - pad.right, pad.top + gH);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = "#9999AA";
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      ctx.fillText("PAST", pad.left + gW * 0.15, pad.top + gH + 25);
      ctx.fillText("FUTURE", pad.left + gW * 0.85, pad.top + gH + 25);

      ctx.save();
      ctx.translate(15, pad.top + gH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center";
      ctx.fillText("AUTHORITARIAN CONTROL", 0, 0);
      ctx.restore();

      // "NOW" marker
      ctx.strokeStyle = "rgba(153, 153, 170, 0.25)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(nowX, pad.top);
      ctx.lineTo(nowX, pad.top + gH);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#E0E0E0";
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      ctx.fillText("NOW", nowX, pad.top + gH + 25);

      // Animated progress
      const t = easeOutCubic(Math.min(animProgress.current, 1));
      const totalPoints = 100;
      const drawPoints = Math.floor(totalPoints * t);

      // Historical line (shared, left of NOW) — gradual upward
      const historyPoints: [number, number][] = [];
      for (let i = 0; i <= totalPoints; i++) {
        const frac = i / totalPoints;
        const x = pad.left + (nowX - pad.left) * frac;
        // Gentle exponential rise for the past
        const yNorm = 0.8 - 0.3 * Math.pow(frac, 1.5);
        const y = pad.top + gH * yNorm;
        historyPoints.push([x, y]);
      }

      // Draw history (always fully drawn once animation starts)
      const histDraw = Math.min(drawPoints, totalPoints);
      if (histDraw > 1) {
        ctx.strokeStyle = "rgba(224, 224, 224, 0.5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(historyPoints[0][0], historyPoints[0][1]);
        for (let i = 1; i <= histDraw; i++) {
          ctx.lineTo(historyPoints[i][0], historyPoints[i][1]);
        }
        ctx.stroke();
      }

      // Diverging future lines (right of NOW)
      const nowY = historyPoints[totalPoints][1];
      const futureStart = nowX;
      const futureEnd = W - pad.right;
      const futureW = futureEnd - futureStart;

      // Red line: exponential up (status quo → more control)
      const futureProgress = Math.max(0, (animProgress.current - 0.5) * 2);
      const futureT = easeOutCubic(Math.min(futureProgress, 1));
      const futureDraw = Math.floor(totalPoints * futureT);

      if (futureDraw > 1) {
        // Red line
        ctx.strokeStyle = "#FF4444";
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#FF4444";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(futureStart, nowY);
        for (let i = 1; i <= futureDraw; i++) {
          const frac = i / totalPoints;
          const x = futureStart + futureW * frac;
          const yNorm = (nowY - pad.top) / gH - 0.5 * Math.pow(frac, 2);
          const y = pad.top + gH * Math.max(0.05, yNorm);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Green line: downward (d/acc → less control)
        ctx.strokeStyle = "#00FF88";
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#00FF88";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(futureStart, nowY);
        for (let i = 1; i <= futureDraw; i++) {
          const frac = i / totalPoints;
          const x = futureStart + futureW * frac;
          const yNorm = (nowY - pad.top) / gH + 0.35 * Math.pow(frac, 1.3);
          const y = pad.top + gH * Math.min(0.95, yNorm);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Labels on curves (only when mostly drawn)
        if (futureT > 0.6) {
          const labelAlpha = Math.min(1, (futureT - 0.6) * 2.5);
          ctx.font = 'bold 10px "JetBrains Mono", monospace';

          ctx.fillStyle = `rgba(255, 68, 68, ${labelAlpha})`;
          ctx.textAlign = "left";
          const redLabelX = futureStart + futureW * 0.55;
          const redLabelFrac = 0.55;
          const redLabelYNorm = (nowY - pad.top) / gH - 0.5 * Math.pow(redLabelFrac, 2);
          ctx.fillText("AI + Surveillance", redLabelX + 5, pad.top + gH * Math.max(0.05, redLabelYNorm) - 10);

          ctx.fillStyle = `rgba(0, 255, 136, ${labelAlpha})`;
          const greenLabelX = futureStart + futureW * 0.55;
          const greenLabelFrac = 0.55;
          const greenLabelYNorm = (nowY - pad.top) / gH + 0.35 * Math.pow(greenLabelFrac, 1.3);
          ctx.fillText("d/acc Defensive Tech", greenLabelX + 5, pad.top + gH * Math.min(0.95, greenLabelYNorm) + 18);
        }
      }
    }

    function animate() {
      animProgress.current += 0.008;
      drawFrame();
      if (animProgress.current < 1.5) {
        animId.current = requestAnimationFrame(animate);
      }
    }

    animProgress.current = 0;
    animate();

    return () => cancelAnimationFrame(animId.current);
  }, [visible]);

  return (
    <div ref={containerRef} className="mt-12 border border-dacc-green/20 bg-dacc-surface/50 p-2">
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: 280 }}
      />
    </div>
  );
}
