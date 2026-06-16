import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import "./Preloader.css";

interface PreloaderProps {
  onDone: () => void;
}

export function Preloader({ onDone }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      onDone();
      return;
    }

    let animationFrame = 0;
    let done = false;
    const start = performance.now();
    const minDuration = 1250;

    const finish = () => {
      if (done) return;
      done = true;
      setProgress(100);
      setLeaving(true);
      window.setTimeout(onDone, 520);
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      const percent = Math.min(96, Math.round((elapsed / minDuration) * 96));
      setProgress(percent);

      if (elapsed >= minDuration && document.readyState === "complete") {
        finish();
        return;
      }

      animationFrame = requestAnimationFrame(tick);
    };

    const portrait = new Image();
    portrait.src = profile.portraitUrl;
    portrait.decode?.().catch(() => undefined);

    const onLoad = () => {
      const remaining = Math.max(0, minDuration - (performance.now() - start));
      window.setTimeout(finish, remaining);
    };

    animationFrame = requestAnimationFrame(tick);

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("load", onLoad);
    };
  }, [onDone]);

  const firstName = profile.name.split(" ")[0];
  const lastName = profile.name.split(" ").slice(1).join(" ");

  return (
    <div className={`preloader ${leaving ? "preloader--leaving" : ""}`} role="status" aria-live="polite">
      <div className="preloader__glow" aria-hidden />
      <div className="preloader__panel">
        <div className="preloader__mark" aria-hidden>
          <span>S</span>
        </div>

        <div className="preloader__portrait" aria-hidden>
          <img src={profile.portraitUrl} alt="" width={96} height={96} />
        </div>

        <p className="preloader__eyebrow">Preparing portfolio</p>
        <h1 className="preloader__name">
          {firstName} <span>{lastName}</span>
        </h1>
        <p className="preloader__role">{profile.title}</p>

        <div className="preloader__progress" aria-label={`Loading ${progress}%`}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="preloader__percent">{progress}%</p>
      </div>
    </div>
  );
}
