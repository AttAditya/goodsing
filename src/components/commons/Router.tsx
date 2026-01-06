import { useRoutes } from "@contexts/Routes";
import { ReactNode } from "react";

export function Router({ children }: {
  children: ReactNode;
}) {
  const { activeNode } = useRoutes();
  return (
    <>
      {children}
      {activeNode}
    </>
  );
}

