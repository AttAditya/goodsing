import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RootProvider } from '@contexts/RootProvider';

import { App } from './App';

import '@styles/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <RootProvider>
      <App />
    </RootProvider>
  </StrictMode>
);