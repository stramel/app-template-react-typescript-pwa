import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import type { ReportHandler } from 'web-vitals';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import './index.css';

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const axe = await import('react-axe');
    axe.default(React, ReactDOM, 1000);
  }

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
}

start();

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

function sendToAnalytics(metric: ReportHandler) {
  const body = JSON.stringify(metric);
  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/analytics', body)
  } else {
    fetch('/analytics', {body, method: 'POST', keepalive: true});
  }
}

reportWebVitals(console.log);
