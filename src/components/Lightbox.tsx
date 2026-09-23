import { useEffect, useRef } from "react";
import { ui } from "../content/slides";
import type { LightboxImage } from "./DeckContext";

interface Props {
  image: LightboxImage | null;
  onClose: () => void;
}

/** Full-size image viewer. Escape closes it and focus returns to the trigger. */
export function Lightbox({ image, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (image && !dialog.open) dialog.showModal();
    if (!image && dialog.open) dialog.close();
  }, [image]);

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={image?.caption}
      onClose={onClose}
      onClick={(e) => {
        // A click on the backdrop (the dialog element itself) closes it.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {image && (
        <figure className="lightbox__panel">
          <img className="lightbox__img" src={image.src} alt={image.alt} />
          <figcaption className="lightbox__caption">
            <span>{image.caption}</span>
            <button type="button" className="button" onClick={onClose} autoFocus>
              {ui.close}
            </button>
          </figcaption>
        </figure>
      )}
    </dialog>
  );
}
