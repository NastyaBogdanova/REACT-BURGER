import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const Router = process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter;

const root = ReactDOM.createRoot(
    document.getElementById('root')!
);
root.render(
    <Router>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
