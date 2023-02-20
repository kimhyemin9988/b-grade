import { movieData } from "./Home";
import { useState } from "react";

export const API_KEY = "0bc81ab4612512071ffe14dfe9bdca6b";

const movieList = async () => {

    let page = 1;
    let dataArray : [] = [];
    while(page<6)
    {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.asc&include_adult=false&include_video=false&page=${page}&vote_average.gte=4.0&vote_average.lte=6.0&with_watch_monetization_types=flatrat&region=kr`);
        const json = await response.json();
        const data : [] = await json.results.filter((i:movieData) => i.poster_path !== null).filter((i:movieData)=>i.backdrop_path !== null && i.overview !== "");
        page++;
        dataArray = [...dataArray, ...data];
    }
    return dataArray;
}
export default movieList;


/*
데이터 3page까지 가져오기
https://image.tmdb.org/t/p/original/d8Nt1NKzAoa26HRrE4LuMKkIbZ9.jpg

한국영화
인기 높은순
성인 x
비디오 x
page 1
별점 4.0~6.0
*/