import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NuqsAdapter } from 'nuqs/adapters/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NuqsAdapter>
      <App />
    </NuqsAdapter>
  </React.StrictMode>,
);
