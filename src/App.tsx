import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Tasks from './Tasks';
import Navigation from "./Navigation.tsx";
import Header from "./Header.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Header />
                <Navigation />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/tasks" element={<Tasks />} />
                    </Routes>
                </div>
        </Router>
    );
};

export default App;
