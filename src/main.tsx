import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import Header from "./components/Header.tsx";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Header />
            <App />
        </Provider>
    </React.StrictMode>
);
