import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { SnackbarProvider } from './context/SnackbarContext.jsx';
import App from './App.jsx';
import './i18n.js';
import './index.css';
import { ScrollProvider } from './context/ScrollContext.jsx';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SnackbarProvider>
      <ScrollProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </ScrollProvider>
    </SnackbarProvider>
  </React.StrictMode>,
);
