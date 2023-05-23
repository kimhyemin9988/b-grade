import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import NotFound from "./NotFound";
import App from "./App";
import Movie from "./MovieF/Movie";
import Search from "./Search/Search";
import Tv from "./Tv/Tv";
import TotalImages from "./MovieTvDetails/TotalImages";
import TotalCasts from "./MovieTvDetails/TotalCasts";
import TotalVideos from "./MovieTvDetails/TotalVideos";
import MovieDetails from "./MovieTvDetails/MovieDetails";
import DetailOutlet from "./MovieTvDetails/DetailOutlet";
import TvDetails from "./MovieTvDetails/TvDetails";

const RouterApp = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <Movie />,
        },
        {
          path: "search",
          element: <Search></Search>,
        },
        {
          path: "tv",
          element: <Tv></Tv>,
        },
        {
          path: "movie/:movieId",
          element: <DetailOutlet />,
          children: [
            {
              path: "details",
              element: <MovieDetails />,
            },
            {
              path: "images",
              element: <TotalImages />,
            },
            {
              path: "casts",
              element: <TotalCasts />,
            },
            {
              path: "videos",
              element: <TotalVideos />,
            },
          ],
        },
        {
          path: "tv/:tvId",
          element: <DetailOutlet />,
          children: [
            {
              path: "details",
              element: <TvDetails />,
            },
            {
              path: "images",
              element: <TotalImages />,
            },
            {
              path: "casts",
              element: <TotalCasts />,
            },
            {
              path: "videos",
              element: <TotalVideos />,
            },
          ],
        },
      ],

      errorElement: <NotFound></NotFound>,
    },
  ],
  { basename: "/b-grade" }
);
export default RouterApp;

