import { Container } from "@components/core/Container";
import { IconButton } from "@components/core/IconButton";
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
    <Container classNames={["landing"]}>
      <IconButton
        icon="Fullscreen"
        onClick={() => toggleFullscreen()}
        variant="secondary"
      />
    </Container>
  );
}

