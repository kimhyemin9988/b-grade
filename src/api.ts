import { movieData } from "./MovieF/Movie";
import { LatestShowsData } from "./Tv/LatestTopShows";
export const API_KEY = "0bc81ab4612512071ffe14dfe9bdca6b";


const movieList = async () => {
    let page = 1;
    let dataArray: [] = [];
    while (page < 3) {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=release_date.desc&include_adult=false&include_video=false&page=${page}&vote_average.gte=4.5&vote_average.lte=5.5&with_watch_monetization_types=flatrat&include_video=false`);
        const json = await response.json();
        //&sort_by=popularity.asc
        const data: [] = await json.results.filter((i: movieData) => i.poster_path !== null).filter((i: movieData) => i.backdrop_path !== null && i.overview !== "");
        page++;
        dataArray = [ ...dataArray, ...data];
    }
    return dataArray;
}
export { movieList };

/******************* TV *******************/

const tvPopular = async () => {

    let page = 1;
    let dataArray: [] = [];
    while (page < 30) {
        const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`);
        const json = await response.json();
        const data: [] = await json.results.filter((i: movieData) => i.poster_path !== null).filter((i: movieData) => i.backdrop_path !== null && i.overview !== "");
        page++;
        dataArray = [...dataArray, ...data];
        /* 각 나라별 40개가 되면 종료
        배열 original_language의 개수가 ['en','zh','ja','ko'] 각각 10개가 넘으면 반복문 종료
        */
        let boolean = ['en', 'zh', 'ja', 'ko'].map((k) => dataArray.filter((i: movieData) => i.original_language === k).length > 10);
        if (!boolean.includes(false)) {
            break;
        }
    }
    dataArray.sort((a: movieData, b: movieData) => {
        return b.popularity - a.popularity
    });
    return dataArray;
}
export { tvPopular };

const tvAiring = async () => {

    let page = 1;
    let dataArray: [] = [];
    while (page < 6) {
        const response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`);
        const json = await response.json();
        const data: [] = await json.results.filter((i: movieData) => i.poster_path !== null).filter((i: movieData) => i.backdrop_path !== null && i.overview !== "");
        page++;
        dataArray = [...dataArray, ...data];
    }
    return dataArray;
}
export { tvAiring };


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



const tvLatest = async () => {
    let page = 1;
    const dataArray: LatestShowsData[] = [];
    while (page < 6) {
        const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`);
        const json = await response.json();
        const data: LatestShowsData[] = await json.results.filter((i: LatestShowsData) => i.poster_path !== null);
        page++;
        dataArray.push(...data);
    }
    const videoResponse = await fetch(`https://api.themoviedb.org/3/tv/${dataArray?.[0].id}?api_key=${API_KEY}`);
    const videoJson = await videoResponse.json();
    dataArray.push(videoJson);
    const lastData = dataArray.filter((i: LatestShowsData) => i.id === dataArray?.[0].id);
    /* detail 받아오기
        const detailTvLatest = await fetch(`https://api.themoviedb.org/3/tv/${dataArray?.[0].id}/season/1?api_key=${API_KEY}&language=en-US`);
    const detailJson = await detailTvLatest.json();
    lastData.push(detailJson);
    */
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


const topRatedMovies = async () => {

    let page = 1;
    let dataArray: [] = [];
    while (page < 3) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&${page}`);
        const json = await response.json();
        const data: [] = await json.results.filter((i: movieData) => i.poster_path !== null).filter((i: movieData) => i.backdrop_path !== null && i.overview !== "");
        page++;
        dataArray = [...dataArray, ...data];
    }
    return dataArray;
}
export { topRatedMovies };


const upcomingMovies = async () => {

    let page = 1;
    let dataArray: [] = [];
    while (page < 3) {
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
    while (page < 3) {
        const response = await fetch(`
        https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${keyword}&page=${page}&include_adult=false`);
        const json = await response.json();
        const data: [] = await json.results.filter((i: movieData) => i.poster_path !== null).filter((i: movieData) => i.backdrop_path !== null && i.overview !== "").filter((i: movieData) => Object.keys(i).includes("backdrop_path") === true);
        page++;
        dataArray = [...dataArray, ...data];
    }
    return dataArray;
}
export { SearchData };




/* Details */

const getDetails = async (distStr: string | undefined , id: string | undefined) => {

    const response = await fetch(`https://api.themoviedb.org/3/${distStr}/${id}?api_key=${API_KEY}`);
    const json = await response.json();
    return json;
};
export { getDetails };


const getCredits = async (distStr: string | undefined, id: string | undefined) => {
    const response = await fetch(`https://api.themoviedb.org/3/${distStr}/${id}/credits?api_key=${API_KEY}`);
    const json = await response.json();
    return json;
};
export { getCredits };

const getImages = async (distStr: string | undefined, id: string | undefined) => {
    const response = await fetch(`https://api.themoviedb.org/3/${distStr}/${id}/images?api_key=${API_KEY}`);
    const json = await response.json();
    return json;
};
export { getImages }; 

const getVideos = async (distStr: string | undefined, id: string | undefined) => {
    const response = await fetch(`https://api.themoviedb.org/3/${distStr}/${id}/videos?api_key=${API_KEY}`);
    const json = await response.json();
    return json;
};
export { getVideos }; 