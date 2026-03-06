"use client";

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import type { AnalysisScores } from "@/lib/types";

interface RadarChartProps {
  scores: AnalysisScores;
  className?: string;
}

export default function RadarChart({ scores, className = "" }: RadarChartProps) {
  const data = [
    { dimension: "Defensive", value: scores.defensive, fullMark: 25 },
    { dimension: "Decentral.", value: scores.decentralization, fullMark: 25 },
    { dimension: "Democratic", value: scores.democratic, fullMark: 25 },
    { dimension: "Acceleration", value: scores.acceleration, fullMark: 25 },
  ];

  return (
    <div className={`w-full h-64 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="#1A1A2E" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: "#9999AA", fontSize: 12, fontFamily: "JetBrains Mono" }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 25]}
            tick={{ fill: "#9999AA", fontSize: 10 }}
            axisLine={false}
          />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#00FF88"
            fill="#00FF88"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
