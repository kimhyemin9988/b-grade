import { movieData } from "./MovieF/Movie";
import { LatestShowsData } from "./Tv/LatestShows";
export const API_KEY = "0bc81ab4612512071ffe14dfe9bdca6b";


const movieList = async () => {
    let page = 1;
    let dataArray: [] = [];
    while (page < 10) {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.asc&include_adult=false&include_video=false&page=${page}&vote_average.gte=4.5&vote_average.lte=5.5&with_watch_monetization_types=flatrat&include_video=false`);
        const json = await response.json();
        const data: [] = await json.results.filter((i: movieData) => i.poster_path !== null).filter((i: movieData) => i.backdrop_path !== null && i.overview !== "");
        page++;
        dataArray = [...dataArray, ...data];
    }
    return dataArray;
}
export { movieList };

/******************* TV *******************/

//https://api.themoviedb.org/3/tv/popular?api_key=0bc81ab4612512071ffe14dfe9bdca6b&language=en-US&${page} =>/tv/popular

const tvPopular = async () => {

    let page = 1;
    let dataArray: [] = [];
    while (page < 6) {
        const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
        const json = await response.json();
        const data: [] = await json.results.filter((i: movieData) => i.poster_path !== null).filter((i: movieData) => i.backdrop_path !== null && i.overview !== "");
        page++;
        dataArray = [...dataArray, ...data];
    }
    return dataArray;
}
export { tvPopular };


//https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}b&language=en-US&page=${page} =>/tv/airing_today

const tvAiring = async () => {

    let page = 1;
    let dataArray: [] = [];
    while (page < 6) {
        const response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${page}`);
        const json = await response.json();
        const data: [] = await json.results.filter((i: movieData) => i.poster_path !== null).filter((i: movieData) => i.backdrop_path !== null && i.overview !== "");
        page++;
        dataArray = [...dataArray, ...data];
    }
    return dataArray;
}
export { tvAiring };



//https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&${page} =>/tv/top_rated

const tvTopRated = async () => {

    let page = 1;
    let dataArray: [] = [];
    while (page < 6) {
        const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`);
        const json = await response.json();
        const data: [] = await json.results.filter((i: movieData) => i.poster_path !== null).filter((i: movieData) => i.backdrop_path !== null && i.overview !== "");
        page++;
        dataArray = [...dataArray, ...data];
    }
    return dataArray;
}
export { tvTopRated };

//https://api.themoviedb.org/3/tv/latest?api_key=0bc81ab4612512071ffe14dfe9bdca6b&language=en-US =>/tv/latest

const tvLatest = async () => {
    let page = 1;
    const dataArray : LatestShowsData[] = [];
    while (page < 6) {
        const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`);
        const json = await response.json();
        const data: LatestShowsData[] = await json.results.filter((i: LatestShowsData) => i.poster_path !== null).filter((i: LatestShowsData) => i.original_language == "ko");
        page++;
        dataArray.push(...data);
    }
    const videoResponse = await fetch(`https://api.themoviedb.org/3/tv/${dataArray?.[0].id}?api_key=${API_KEY}`);
    const videoJson = await videoResponse.json();

    dataArray.push(videoJson);
    const lastData = dataArray.filter((i: LatestShowsData) => i.id === dataArray?.[0].id);
    return lastData;

}
export { tvLatest };


/******************* movie *******************/

// 상영중인 영화중 최신의 인기있는 영화

const fullDate = new Date();

const year = JSON.stringify(fullDate.getFullYear());
const month = JSON.stringify(fullDate.getMonth() + 1);
const dateArray = [year, month];
const date = dateArray.join('-');

interface videoData {
    name: string;
    key: string;
};

const latestMovies = async () => {

    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&sort_by=popularity.asc&include_adult=false&page=1&release_date.lte=${date}&with_watch_monetization_types=flatrate`);
    const json = await response.json();
    const data = await json.results.filter((i: movieData) => i.poster_path !== null).filter((i: movieData) => i.backdrop_path !== null && i.overview !== "").slice(2, 3);

    const videoResponse = await fetch(`https://api.themoviedb.org/3/movie/${data?.[0].id}/videos?api_key=${API_KEY}`);
    const videoJson = await videoResponse.json();
    const videoObj = await videoJson.results.filter((i: videoData) => i.name == 'Official Trailer')[0];
    await data.push(videoObj);
    return data;
}
export { latestMovies };
/* 
const videoid = "315162";

const playVideo = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${videoid}/videos?api_key=${API_KEY}`);
    const json = await response.json();
    const data = await json.results.filter((i : videoData)=>i.name == 'Official Trailer');
    return data;
}

export { playVideo }; */

//Top Rated Movies https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&${page}


const topRatedMovies = async () => {

    let page = 1;
    let dataArray: [] = [];
    while (page < 6) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&${page}`);
        const json = await response.json();
        const data: [] = await json.results.filter((i: movieData) => i.poster_path !== null).filter((i: movieData) => i.backdrop_path !== null && i.overview !== "");
        page++;
        dataArray = [...dataArray, ...data];
    }
    return dataArray;
}
export { topRatedMovies };


//upcomingMovies https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&${page}


const upcomingMovies = async () => {

    let page = 1;
    let dataArray: [] = [];
    while (page < 6) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&${page}`);
        const json = await response.json();
        const data: [] = await json.results.filter((i: movieData) => i.poster_path !== null).filter((i: movieData) => i.backdrop_path !== null && i.overview !== "");
        page++;
        dataArray = [...dataArray, ...data];
    }
    return dataArray;
}
export { upcomingMovies };



const SearchData = async (keyword: string | null) => {
    let page = 1;
    let dataArray: [] = [];
    while (page < 6) {
        const response = await fetch(`
        https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${keyword}&page=${page}&include_adult=false`);
        const json = await response.json();
        const data: [] = await json.results.filter((i: movieData) => i.poster_path !== null).filter((i: movieData) => i.backdrop_path !== null && i.overview !== "");
        page++;
        dataArray = [...dataArray, ...data];
    }
    return dataArray;
}
export { SearchData };

/*
https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.asc&include_adult=false&include_video=false&page=1&with_keywords=${keyword}&with_watch_monetization_types=flatrate

데이터 3page까지 가져오기
https://image.tmdb.org/t/p/original/d8Nt1NKzAoa26HRrE4LuMKkIbZ9.jpg

한국영화
인기 높은순
성인 x
비디오 x
page 1
별점 4.0~6.0
*/