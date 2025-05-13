import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './assets/flag.css';
import './assets/index.css';

import 'primereact/resources/themes/lara-light-cyan/theme.css';

import { PrimeReactProvider } from 'primereact/api';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </StrictMode>
);
