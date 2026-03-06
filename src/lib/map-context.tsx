"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Quadrant, AnalysisScores } from "./types";

export interface PendingMapProject {
  name: string;
  oneLiner: string;
  quadrant: Quadrant;
  sector: string;
  logoUrl?: string;
  websiteUrl?: string;
  scores: AnalysisScores;
}

interface MapContextValue {
  pendingMapProject: PendingMapProject | null;
  setPendingMapProject: (project: PendingMapProject) => void;
  clearPendingMapProject: () => void;
}

const MapContext = createContext<MapContextValue>({
  pendingMapProject: null,
  setPendingMapProject: () => {},
  clearPendingMapProject: () => {},
});

export function MapProvider({ children }: { children: ReactNode }) {
  const [pendingMapProject, setPending] = useState<PendingMapProject | null>(null);

  return (
    <MapContext.Provider
      value={{
        pendingMapProject,
        setPendingMapProject: setPending,
        clearPendingMapProject: () => setPending(null),
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  return useContext(MapContext);
}
