import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NuqsAdapter>
      <App />
    </NuqsAdapter>
    <Analytics />
  </React.StrictMode>,
);
