"use client";

import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

// Normalized exponential for hockey-stick shape
const EXP_K = 6;
const EXP_DENOM = Math.exp(EXP_K) - 1;
function expCurve(frac: number) {
  return (Math.exp(EXP_K * frac) - 1) / EXP_DENOM;
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

    // Layout — taller graph, NOW at 30% to give future lines room
    const pad = { top: 30, bottom: 40, left: 50, right: 120 }; // extra right padding for labels
    const gW = W - pad.left - pad.right;
    const gH = H - pad.top - pad.bottom;
    const nowX = pad.left + gW * 0.3;

    function drawFrame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      // Grid lines
      ctx.strokeStyle = "rgba(153, 153, 170, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 6; i++) {
        const y = pad.top + (gH / 6) * i;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(pad.left + gW, y);
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
      ctx.lineTo(pad.left + gW, pad.top + gH);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = "#9999AA";
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      ctx.fillText("PAST", pad.left + gW * 0.12, pad.top + gH + 25);
      ctx.fillText("FUTURE", pad.left + gW * 0.75, pad.top + gH + 25);

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

      // History line — ends at 70% of graph height (lower = more room for red to climb)
      const historyPoints: [number, number][] = [];
      for (let i = 0; i <= totalPoints; i++) {
        const frac = i / totalPoints;
        const x = pad.left + (nowX - pad.left) * frac;
        const yNorm = 0.85 - 0.15 * Math.pow(frac, 1.5);
        const y = pad.top + gH * yNorm;
        historyPoints.push([x, y]);
      }

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

      // Diverging future lines
      const nowY = historyPoints[totalPoints][1];
      const futureStart = nowX;
      const futureEnd = pad.left + gW;
      const futureW = futureEnd - futureStart;

      const futureProgress = Math.max(0, (animProgress.current - 0.5) * 2);
      const futureT = easeOutCubic(Math.min(futureProgress, 1));
      const futureDraw = Math.floor(totalPoints * futureT);

      // Store endpoint positions for labels
      let redEndY = nowY;
      let greenEndY = nowY;
      let endX = futureStart;

      if (futureDraw > 1) {
        // RED line — exponential hockey stick upward
        ctx.strokeStyle = "#FF4444";
        ctx.lineWidth = 3;
        ctx.shadowColor = "#FF4444";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(futureStart, nowY);
        for (let i = 1; i <= futureDraw; i++) {
          const frac = i / totalPoints;
          const x = futureStart + futureW * frac;
          // Goes from nowY up to near top of graph
          const rise = 0.65 * expCurve(frac);
          const y = Math.max(pad.top + gH * 0.03, nowY - rise * gH);
          ctx.lineTo(x, y);
          if (i === futureDraw) { redEndY = y; endX = x; }
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // GREEN line — steady decline (less authoritarian)
        ctx.strokeStyle = "#00FF88";
        ctx.lineWidth = 3;
        ctx.shadowColor = "#00FF88";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(futureStart, nowY);
        for (let i = 1; i <= futureDraw; i++) {
          const frac = i / totalPoints;
          const x = futureStart + futureW * frac;
          const drop = 0.18 * Math.pow(frac, 1.3);
          const y = Math.min(pad.top + gH * 0.97, nowY + drop * gH);
          ctx.lineTo(x, y);
          if (i === futureDraw) { greenEndY = y; endX = x; }
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // LABELS — positioned at the right endpoint of each line
        if (futureT > 0.5) {
          const labelAlpha = Math.min(1, (futureT - 0.5) * 2);
          ctx.font = 'bold 11px "JetBrains Mono", monospace';
          ctx.textAlign = "left";

          // Red label — to the right of the line endpoint, vertically centered on it
          ctx.fillStyle = `rgba(255, 68, 68, ${labelAlpha})`;
          ctx.fillText("AI +", endX + 10, redEndY - 6);
          ctx.fillText("Surveillance", endX + 10, redEndY + 8);

          // Green label — to the right of the line endpoint
          ctx.fillStyle = `rgba(0, 255, 136, ${labelAlpha})`;
          ctx.fillText("d/acc", endX + 10, greenEndY - 6);
          ctx.fillText("Defensive Tech", endX + 10, greenEndY + 8);
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
        style={{ height: 450 }}
      />
    </div>
  );
}
