import { useRoutes } from "@contexts/Routes";
import { ReactNode, useEffect } from "react";

export function Route({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  const { registerRoute } = useRoutes();
  useEffect(() => {
    registerRoute(path, children);
  }, []);
  
  return null;
}

