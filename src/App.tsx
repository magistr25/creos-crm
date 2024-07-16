import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './HomePage.tsx';
import Tasks from './TasksPage.tsx';
import Navigation from "./Navigation.tsx";
import Header from "./Header.tsx";
import DesignersPage from "./DesignersPage.tsx";


const App: React.FC = () => {

    return (
        <Router>
            <div>
                <Header />
                <Navigation />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/designers" element={<DesignersPage />} />
                    </Routes>
                </div>
        </Router>
    );
};

export default App;
