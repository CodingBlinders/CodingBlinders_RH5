import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './App.css';

import Navbar from './layout/navbar';
import Home from './pages/home';
import Overview from './pages/overview';
import Heatmap from './pages/heatmap';
import NotFound from './pages/not-found'

function App() {
    return (
        <div className="app">
            <Routes>
                <Route
                    element={
                        <React.Fragment>
                            <Navbar />
                            <Outlet />
                        </React.Fragment>
                    }>
                    <Route path="/" element={<Home />} />
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/heatmap" element={<Heatmap />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>

            <NotificationContainer />
        </div>
    );
}

export default App;
