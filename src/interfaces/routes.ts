import { ReactNode } from "react";

export interface RoutesContextData {
  activeRoute: string;
  activeNode: ReactNode;
  navigate: (route: string) => void;
  registerRoute: (
    route: string,
    component: ReactNode,
  ) => void;
}

