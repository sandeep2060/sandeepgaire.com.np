import { profile } from "../data/profile";
import "./PortraitFrame.css";

interface PortraitFrameProps {
  reveal?: boolean;
}

export function PortraitFrame({ reveal = true }: PortraitFrameProps) {
  return (
    <div className="portrait">
      <div className={`portrait__blob ${reveal ? "portrait__blob--ready" : ""}`}>
        <div className="portrait__inner">
          <img
            src={profile.portraitUrl}
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
        Available for hire
      </div>
    </div>
  );
}
