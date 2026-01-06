import { Navbar } from "@components/commons/Navbar";
import { Route } from "@components/commons/Route";
import { Router } from "@components/commons/Router";
import { Container } from "@components/core/Container";

import { Landing } from "@pages/landing";
import { Verses } from "@pages/verses";

declare global {
  interface Window {
    scrolledHeight?: number;
  }
}

export function App() {
  return (
    <Container>
      <Navbar />
      
      <Router>
        <Route path=""><Landing /></Route>
        <Route path="throne"><Landing /></Route>
        <Route path="karaoke"><Verses /></Route>
      </Router>
    </Container>
  );
}

