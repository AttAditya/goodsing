import { ReactNode } from "react";
import { Container } from "@components/core/Container";

export function Sweeper({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <Container classNames={["sweeper"]}>
      <Container classNames={["sweeper-content"]}>
        {children}
      </Container>

      <Container classNames={["sweeper-content"]}>
        {children}
      </Container>
    </Container>
  );
}

