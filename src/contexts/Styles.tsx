import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
} from "react";

import { Styles, StylesContextData, Variables } from "@interfaces/styles";

const StylesContext = createContext<StylesContextData>({
  variables: {},
  addStyle: () => {},
  getStyle: () => ({}),
  units: (amount: number) => amount,
});

export function useStyles() {
  return useContext(StylesContext);
}

export function StylesProvider({ children }: {
  children: ReactNode;
}) {
  const styles = useRef<{ [key: string]: Styles }>({});
  const variables = useRef<Variables>({}).current;

  const units = useCallback((amount: number) => {
    return amount * 16;
  }, []);

  const addStyle = useCallback((
    styleName: string,
    styleSheet: Styles,
  ) => {
    styles.current[styleName] = {
      ...(styles.current[styleName] || {}),
      ...styleSheet,
    };
  }, []);

  const getStyle = useCallback((styleName: string) => {
    return styles.current[styleName] || {};
  }, []);

  const values: StylesContextData = {
    variables,
    addStyle,
    getStyle,
    units,
  };

  return (
    <StylesContext.Provider value={values}>
      {children}
    </StylesContext.Provider>
  );
}

