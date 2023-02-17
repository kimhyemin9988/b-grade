export const API_KEY = "0bc81ab4612512071ffe14dfe9bdca6b";

const movieList = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&region=kr&sort_by=popularity.asc&include_adult=false&include_video=false&page=1&vote_average.gte=4.0&vote_average.lte=6.0&with_watch_monetization_types=flatrat`)
    const json = await response.json();
    console.log(json);
}
export default movieList;


/*

https://api.themoviedb.org/3/discover/movie?api_key=0bc81ab4612512071ffe14dfe9bdca6b&region=kr&sort_by=popularity.asc&include_adult=false&include_video=false&page=1&vote_average.gte=4.0&vote_average.lte=6.0&with_watch_monetization_types=flatrate

한국영화
인기 높은순
성인 x
비디오 x
page 1
별점 4.0~6.0
*/