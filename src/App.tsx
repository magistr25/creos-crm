import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/HomePage.tsx';
import Tasks from './pages/TasksPage.tsx';
import Navigation from "./components/Navigation.tsx";
import DesignersTable from "./pages/DesignersPage.tsx";
import Header from "./components/Header.tsx";


const App: React.FC = () => {

    return (

        <div>
            <Header />
            <Navigation/>
            <Routes>
                <Route path="/" element={<Navigate to="/creos-crm/" />} />
                <Route path="/creos-crm/" element={<Home/>}/>
                <Route path="/creos-crm/tasks" element={<Tasks/>}/>
                <Route path="/creos-crm/designers" element={<DesignersTable/>}/>
            </Routes>
        </div>

    );
};

export default App;
