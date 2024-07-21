import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import Header from "./components/Header.tsx";
import {BrowserRouter} from "react-router-dom";
import '../i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Header />
                <App />
            </Provider>
        </BrowserRouter>

    </React.StrictMode>
);
