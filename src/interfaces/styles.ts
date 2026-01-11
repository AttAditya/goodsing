import { CSSProperties } from "react";

export interface Variables {
  color?: {
    a1?: string;
    a2?: string;
    a3?: string;
    a4?: string;
    
    b1?: string;
    b2?: string;
    b3?: string;
    b4?: string;

    c1?: string;
    c2?: string;
    c3?: string;
    c4?: string;
  },
  font?: {
    n?: string,
    m?: string,
  }
}

export type Styles = CSSProperties;

export interface StylesContextData {
  variables: Variables;
  addStyle: (styleName: string, styleSheet: Styles) => void;
  getStyle: (styleName: string) => Styles;
  units: (amount: number) => number;
}

