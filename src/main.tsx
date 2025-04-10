import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ThemeProvider as NextThemesProvider } from "next-themes";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextThemesProvider defaultTheme="system" storageKey="vite-ui-theme">
        <App />
      </NextThemesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
