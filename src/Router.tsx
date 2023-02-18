import React from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';
import App from './App';
import Home from './Home';
import Movie from './Movie';
import Search from './Search';

const RouterApp = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {

                path: "",
                element: <Home />,
            },
            {
                path: "movie",
                element: <Movie></Movie>,
            },
            {
                path: "search",
                element: <Search></Search>,
            }
        ],
        errorElement: <NotFound></NotFound>,
    }], { basename: "/b-grade/" });
export default RouterApp;