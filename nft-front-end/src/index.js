import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStateProvider } from './GlobalState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalStateProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </GlobalStateProvider>
);