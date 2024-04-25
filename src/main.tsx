import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'src/App.tsx';
import { ThemeProvider } from 'contexts';
import 'src/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
