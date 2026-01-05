import { useEffect, useState } from "react";
import { Verses } from "@pages/verses";

export function Landing() {
  const [ready, setReady] = useState<boolean>(false);
  
  useEffect(() => {
    if (!ready) return;
    document.documentElement
      .requestFullscreen?.()
      .catch(() => {});
  }, [ready]);

  if (ready) return <Verses />;
  return (
    <div className="landing">
      <button onClick={() => setReady(true)}>
        Start
      </button>
    </div>
  );
}

