import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage.tsx';
import Tasks from './pages/TasksPage.tsx';
import Navigation from "./components/Navigation.tsx";
import {DesignersTable} from "./pages/DesignersPage.tsx";




const App: React.FC = () => {

    return (

            <div>
                <Navigation />
                    <Routes>
                        <Route path="/" element={ <Home />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/designers" element={<DesignersTable />} />
                    </Routes>
                </div>

    );
};

export default App;
