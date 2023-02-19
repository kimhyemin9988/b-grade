export const API_KEY = "0bc81ab4612512071ffe14dfe9bdca6b";

const movieList = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.asc&include_adult=false&include_video=false&page=2&vote_average.gte=6.0&vote_average.lte=8.0&with_watch_monetization_types=flatrat&region=kr`)
    const json = await response.json();
    return json.results;
}
export default movieList;


/*

https://image.tmdb.org/t/p/original/d8Nt1NKzAoa26HRrE4LuMKkIbZ9.jpg

한국영화
인기 높은순
성인 x
비디오 x
page 1
별점 4.0~6.0
*/