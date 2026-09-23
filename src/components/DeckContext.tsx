import { createContext, useContext } from "react";

export interface LightboxImage {
  src: string;
  alt: string;
  caption: string;
}

export interface DeckState {
  active: number;
  audit: boolean;
  go: (index: number) => void;
  openLightbox: (image: LightboxImage, trigger: HTMLElement) => void;
  /** The 1600 by 900 stage element and its current scale, for positioning overlays. */
  stageEl: () => HTMLElement | null;
  scale: number;
  /** Unique assumptions per slide and in the whole deck, for the audit counter. */
  claimsPerSlide: number[];
  claimsInDeck: number;
}

export const DeckContext = createContext<DeckState | null>(null);

export function useDeck(): DeckState {
  const ctx = useContext(DeckContext);
  if (!ctx) throw new Error("useDeck outside DeckContext");
  return ctx;
}
