import React from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';
import App from './App';
import Movie from './MovieF/Movie';
import Search from './Search/Search';
import Tv from './Tv/Tv';

const RouterApp = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {

                path: "",
                element: <Movie />,
                children:[
                    {
                        path:"movie/:movieId"
                    }
                ],
            },
            {
                path: "search",
                element: <Search></Search>,
            },
            {
                path:"tv",
                element:<Tv></Tv>,
                children:[
                    {
                        path:":tvId"
                    }
                ],
            },
        ],
        errorElement: <NotFound></NotFound>,
    }], { basename: "/b-grade/" });
export default RouterApp;