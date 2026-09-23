import { useCallback, useEffect, useRef, useState } from "react";
import { assets } from "../content/assets";
import type { SolutionSlide } from "../content/slides";

type Mode = "poster" | "loading" | "playing" | "unavailable";

const LOAD_TIMEOUT_MS = 4000;

interface Props {
  video: SolutionSlide["video"];
  active: boolean;
}

/** Resolves true if an image from the YouTube hosts loads within the timeout. */
function probe(url: string, timeout: number): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    const timer = window.setTimeout(() => resolve(false), timeout);
    img.onload = () => {
      window.clearTimeout(timer);
      resolve(true);
    };
    img.onerror = () => {
      window.clearTimeout(timer);
      resolve(false);
    };
    img.src = url;
  });
}

/**
 * Slide 4 video (brief Section 7.3). Preference order: a local assets/demo.mp4,
 * then the YouTube embed, then the poster with a visible link.
 */
export function VideoPanel({ video, active }: Props) {
  const local = assets.demoVideo;
  const thumbUrl = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
  const [mode, setMode] = useState<Mode>("poster");
  const [thumbOk, setThumbOk] = useState<boolean | null>(null);
  const [focusWithin, setFocusWithin] = useState(false);
  const [iframeFocused, setIframeFocused] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timer = useRef<number>();

  const posterSrc = thumbOk === false || thumbOk === null ? assets.product : thumbUrl;

  // Leaving the slide stops playback and returns to the poster, so audio never
  // runs behind another slide and YouTube is not contacted on every change.
  useEffect(() => {
    if (active) return;
    window.clearTimeout(timer.current);
    setMode((m) => (m === "unavailable" ? m : "poster"));
    videoRef.current?.pause();
  }, [active]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // A cross-origin iframe swallows every keystroke; the window only sees a blur.
  useEffect(() => {
    const onBlur = () => {
      window.setTimeout(() => {
        const el = document.activeElement;
        setIframeFocused(!!el && el.tagName === "IFRAME" && !!panelRef.current?.contains(el));
      }, 0);
    };
    const onFocus = () => setIframeFocused(false);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const play = useCallback(async () => {
    if (!navigator.onLine) {
      setMode("unavailable");
      return;
    }
    setMode("loading");
    // A browser shows its own error page inside an iframe that cannot connect,
    // and still fires `load`, so check the YouTube hosts are reachable first.
    const reachable =
      thumbOk === true || (await probe(`https://www.youtube-nocookie.com/favicon.ico?${Date.now()}`, LOAD_TIMEOUT_MS));
    if (!reachable) {
      setMode("unavailable");
      return;
    }
    setMode("playing");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMode("unavailable"), LOAD_TIMEOUT_MS);
  }, [thumbOk]);

  const onIframeLoad = () => window.clearTimeout(timer.current);

  const showHint = focusWithin || iframeFocused;

  return (
    <div className="video">
      <div
        ref={panelRef}
        className="video__frame"
        data-keytrap
        onFocus={() => setFocusWithin(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
        }}
      >
        {local ? (
          <video
            ref={videoRef}
            className="video__native"
            src={local}
            poster={assets.product}
            controls
            playsInline
            preload="metadata"
            aria-label={video.iframeTitle}
          />
        ) : mode === "playing" ? (
          <iframe
            className="video__iframe"
            src={`${video.embedUrl}&autoplay=1`}
            title={video.iframeTitle}
            allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={onIframeLoad}
          />
        ) : (
          <div className="video__poster">
            {posterSrc && <img className="video__poster-img" src={posterSrc} alt={video.posterAlt} />}
            {/* Probe the thumbnail quietly; product.jpg stays up if it never arrives. */}
            {thumbOk === null && (
              <img
                className="visually-hidden"
                src={thumbUrl}
                alt=""
                onLoad={(e) => setThumbOk((e.currentTarget as HTMLImageElement).naturalWidth > 120)}
                onError={() => setThumbOk(false)}
              />
            )}
            <div className="video__scrim" aria-hidden="true" />
            {mode === "unavailable" ? (
              <div className="video__unavailable">
                <p>{video.fallback}</p>
                <a href={video.watchUrl} target="_blank" rel="noreferrer">
                  {video.fallbackLink}
                </a>
              </div>
            ) : (
              <button
                type="button"
                className="video__play"
                onClick={play}
                aria-label={video.playLabel}
                aria-busy={mode === "loading"}
              >
                <svg width="36" height="40" viewBox="0 0 36 40" aria-hidden="true">
                  <path d="M2 2 L34 20 L2 38 Z" />
                </svg>
              </button>
            )}
          </div>
        )}
        {showHint && (
          <p className="video__hint" role="status">
            {iframeFocused ? video.iframeHint : video.escapeHint}
          </p>
        )}
      </div>

      <p className="video__caption">{video.caption}</p>
      <p className="video__alt">
        <a href={video.sharepointUrl} target="_blank" rel="noreferrer">
          {video.sharepointLabel}
        </a>
      </p>
      {/* Print replaces the player with the poster and the address as text. */}
      {assets.product && <img className="video__print-poster" src={assets.product} alt={video.posterAlt} />}
      <p className="video__print-url">{video.watchUrl}</p>
    </div>
  );
}
