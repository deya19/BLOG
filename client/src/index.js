import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { HelmetProvider } from 'react-helmet-async';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <HelmetProvider>
    <App />
    </HelmetProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();