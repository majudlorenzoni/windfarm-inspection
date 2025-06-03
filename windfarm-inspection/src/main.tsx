// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { WindDataProvider } from './components/windDataContext';
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <WindDataProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WindDataProvider>
    </React.StrictMode>
  );
} else {
  console.error("Elemento #root não encontrado no DOM.");
}
