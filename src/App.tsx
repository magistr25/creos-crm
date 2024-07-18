import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage.tsx';
import Tasks from './pages/TasksPage.tsx';
import Navigation from "./components/Navigation.tsx";
import Header from "./components/Header.tsx";
import DesignersPage from "./pages/DesignersPage.tsx";


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
