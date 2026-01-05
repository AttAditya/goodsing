import { ReactNode } from "react";
import { Container } from "@components/core/Container";

export function Sweeper({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <Container className="sweeper">
      <Container className="sweeper-content">
        {children}
      </Container>

      <Container className="sweeper-content">
        {children}
      </Container>
    </Container>
  );
}

