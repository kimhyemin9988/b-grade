import { BrowserRouter as Router, Routes, Route, createBrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';
import App from './App';
import Movie from './MovieF/Movie';
import Search from './Search/Search';
import Tv from './Tv/Tv';

const RouterApp = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {

                path:"",
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

/*
   React Router에서 특정 URL 접속 시 페이지를 찾을 수 없는 문제 원인 및 해결 방법
   GitHub Pages server receives the new request
   ex) example.tid/?/...
   ignores the query string
   and returns the index.html
   script that checks for a redirect in the query string
   before SPA is loaded
   https://www.youtube.com/watch?v=fuGu-Ponjf8
*/