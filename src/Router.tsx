import React from 'react';
import { HashRouter as Router, Routes, Route, createBrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';
import App from './App';
import Home from './Home';

const RouterApp = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
        ],
        errorElement: <NotFound></NotFound>,
    }], { basename: "/b-grade/" });
export default RouterApp;