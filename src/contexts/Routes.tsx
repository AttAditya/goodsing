import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { RoutesContextData } from "@interfaces/routes";

const RoutesContext = createContext<RoutesContextData>({
  activeRoute: "",
  activeNode: null,
  navigate: () => {},
  registerRoute: () => {},
});

export function useRoutes() {
  return useContext(RoutesContext);
}

export function RoutesProvider({ children }: {
  children: ReactNode;
}) {
  const routes = useRef<{ [key: string]: ReactNode }>({});

  const [activeRoute, setActiveRoute] = useState<string>("");
  const [activeNode, setActiveNode] = useState<ReactNode>(null);
  const [nodeCount, setNodeCount] = useState<number>(0);
  
  const navigate = useCallback((route: string) => {
    setActiveRoute(route);
    setActiveNode(routes.current[route] || null);
  }, []);

  const registerRoute = useCallback((
    route: string,
    component: ReactNode
  ) => {
    routes.current[route] = component;
    setNodeCount((count) => count + 1);
  }, []);

  useEffect(() => {
    navigate("");
  }, [nodeCount]);

  const values: RoutesContextData = {
    activeRoute,
    activeNode,
    navigate,
    registerRoute,
  };

  return (
    <RoutesContext.Provider value={values}>
      {children}
    </RoutesContext.Provider>
  );
}

