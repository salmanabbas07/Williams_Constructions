// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { preloadRoute } from './App.jsx';

const rootElement = document.getElementById('root');

const renderApp = () => {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

if (rootElement) {
  const hasPrerenderedContent = rootElement.children.length > 0;
  if (hasPrerenderedContent && window.location.pathname !== '/') {
    preloadRoute(window.location.pathname).finally(renderApp);
  } else {
    renderApp();
  }
}
