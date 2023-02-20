import React from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';
import App from './App';
import Home, { BoxModal, Overlay } from './Home';
import Movie from './Movie';
import Search from './Search';
import Tv from './Tv';

const RouterApp = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {

                path: "",
                element: <Home />,
                children:[
                    {
                        path:"movie/:movieId"
                    }
                ]
            },
            {
                path: "movie",
                element: <Movie></Movie>,
            },
            {
                path: "search",
                element: <Search></Search>,
            },
            {
                path:"tv",
                element:<Tv></Tv>,
            }

        ],
        errorElement: <NotFound></NotFound>,
    }], { basename: "/b-grade/" });
export default RouterApp;