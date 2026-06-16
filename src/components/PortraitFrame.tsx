import { useRef, useState, type PointerEvent } from "react";
import { profile } from "../data/profile";
import "./PortraitFrame.css";

interface PortraitFrameProps {
  reveal?: boolean;
}

const portraitImages = [profile.portraitUrl, "/images/sandeep.jpeg"];

export function PortraitFrame({ reveal = true }: PortraitFrameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const deltaX = event.clientX - pointerStartX.current;

    if (Math.abs(deltaX) > 40) {
      setCurrentIndex((current) => {
        const nextIndex = deltaX < 0 ? current + 1 : current - 1;
        return (nextIndex + portraitImages.length) % portraitImages.length;
      });
    }

    pointerStartX.current = null;
  };

  const handlePointerLeave = () => {
    pointerStartX.current = null;
  };

  const currentImage = portraitImages[currentIndex];

  return (
    <div
      className="portrait"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      <div className={`portrait__blob ${reveal ? "portrait__blob--ready" : ""}`}>
        <div className="portrait__inner">
          <img
            src={currentImage}
            alt={profile.name}
            width={400}
            height={480}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>

      <div className="portrait__badge">
        <span className="portrait__badge-dot" />
        An IT aspiration..
      </div>

      <div className="portrait__swipe-indicator">
        <span>Swipe</span>
        <div className="portrait__dots">
          {portraitImages.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`portrait__dot ${index === currentIndex ? "portrait__dot--active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
