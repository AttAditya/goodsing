import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";

import { Landing } from "@pages/landing";

export function App() {
  const Router = {
    Browser: BrowserRouter,
    Hash: HashRouter
  }[window.routerMode];

  return (<>
    <Router>
      <Routes>
        <Route index element={<Landing />} />
      </Routes>
    </Router>
  </>);
}

