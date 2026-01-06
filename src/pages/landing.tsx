import { useCallback } from "react";

export function Landing() {
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .catch(() => {});
    } else {
      document.exitFullscreen()
        .catch(() => {});
    }
  }, []);

  return (
    <div className="landing">
      <button onClick={() => toggleFullscreen()}>
        Toggle Fullscreen
      </button>
    </div>
  );
}

