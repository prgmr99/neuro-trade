import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Defer @vercel/analytics off the critical path. The Suspense fallback is
// `null` because the component itself renders nothing visible — it just wires
// up beacon/page-view tracking after hydration.
const Analytics = lazy(() =>
  import('@vercel/analytics/react').then((mod) => ({ default: mod.Analytics })),
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Suspense fallback={null}>
      <Analytics />
    </Suspense>
  </React.StrictMode>,
);
