import { Verses } from "@pages/verses";
import { useEffect, useState } from "react";

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
    <button onClick={() => setReady(true)}>
      Start
    </button>
  );
}

