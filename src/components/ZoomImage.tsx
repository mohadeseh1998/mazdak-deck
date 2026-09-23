import { useDeck } from "./DeckContext";
import { ui } from "../content/slides";

interface Props {
  src: string;
  alt: string;
  caption: string;
  className?: string;
}

/** A slide image that opens the lightbox at full size. */
export function ZoomImage({ src, alt, caption, className }: Props) {
  const { openLightbox } = useDeck();
  return (
    <button
      type="button"
      className={`zoom ${className ?? ""}`}
      aria-label={ui.openImage(caption)}
      onClick={(e) => openLightbox({ src, alt, caption }, e.currentTarget)}
    >
      <img src={src} alt={alt} draggable={false} />
    </button>
  );
}
