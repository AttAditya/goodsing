import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";

import { Landing } from "@pages/landing";

declare global {
  interface Window {
    routerMode?: 'Browser' | 'Hash';
    scrolledHeight?: number;
  }
}

export function App() {
  const Router = {
    Browser: BrowserRouter,
    Hash: HashRouter
  }[window.routerMode || 'Browser'];

  return (
    <Router>
      <Routes>
        <Route index element={<Landing />} />
      </Routes>
    </Router>
  );
}