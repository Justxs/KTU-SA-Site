import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "./context/SnackbarContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './i18n.js';
import "./index.css";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SnackbarProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>
);
