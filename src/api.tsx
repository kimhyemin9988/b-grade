import { movieData } from "./MovieF/Movie";
import { LatestShowsData } from "./Tv/LatestTopShows";

/**** 배경, 포스터, 개요 없는것 삭제 ****/
const removeData = (json: any) => {
  return json.results.filter(
    (item: movieData | LatestShowsData) =>
      item.poster_path !== null &&
      item.backdrop_path !== null &&
      item.overview !== ""
  );
};
export { removeData };

/**** 오늘 날짜 불러오기 ****/
const fullDate = new Date();
const alertDayLenth = (number: number) => {
  let dayNumber = JSON.stringify(number);
  if (dayNumber.length === 1) {
    dayNumber = 0 + dayNumber;
  }
  return dayNumber;
}
const year = JSON.stringify(fullDate.getFullYear());
const month = alertDayLenth(fullDate.getMonth() + 1);
const day = alertDayLenth(fullDate.getDate());
const full_date = [year, month, day].join("-");

/**** DB 키 ****/
export const dbApiKey = process.env.REACT_APP_DB_API_KEY;


const movieList = async () => {
  let dataArray: [] = [];
  for (let page = 1; dataArray.length <= 25; page++) {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${dbApiKey}&sort_by=release_date.desc&include_adult=false&include_video=false&page=${page}&vote_average.gte=4.5&vote_average.lte=5.5&with_watch_monetization_types=flatrat&include_video=false`
    );
    const json = await response.json();
    const data: [] = await removeData(json);
    dataArray = [...dataArray, ...data];
  }
  const resultArray = dataArray.slice(0, 25);
  return resultArray;
};
export { movieList };

/******************* TV *******************/


const tvTopAndAiring = async (url: string, dataType: string) => {
  let dataArray: [] = [];
  for (let page = 1; dataArray.length < 25; page++) {
    const response = await fetch(
      `https://api.themoviedb.org/3/${dataType}/${url}?api_key=${dbApiKey}&page=${page}`
    );
    const json = await response.json();
    const data: [] = await removeData(json);
    dataArray = [...dataArray, ...data];
  }
  const resultArray = dataArray.slice(0, 25);
  return resultArray;
}
export { tvTopAndAiring };

/* upcoming, topRated는 data의 양이 많지 않아 여러 page의 정보를 받으면 반복해서 똑같은 정보가 쌓임 */

const topAndUpcomingMovies = async (url: string, dataType: string) => {
  let dataArray: [] = [];
  for (let page = 1; dataArray.length < 2; page++) {
    const response = await fetch(
      `https://api.themoviedb.org/3/${dataType}/${url}?api_key=${dbApiKey}&page=${page}`
    );
    const json = await response.json();
    const data: [] = await removeData(json);
    dataArray = [...dataArray, ...data];
  }
  return dataArray;
};
export { topAndUpcomingMovies };




const tvLatest = async () => {
  let dataArray: [] = [];
  for (let page = 1; dataArray.length === 0; page++) {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${dbApiKey}&page=${page}&first_air_date.gte=${full_date}`
    );
    const json = await response.json();
    const data: [] = await removeData(json);
    dataArray = [...dataArray, ...data];
  }
  return dataArray;
};
export { tvLatest };

/******************* movie *******************/

// 상영중인 영화중 최신의 인기있는 영화

interface videoData {
  name: string;
  key: string;
}

const latestMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${dbApiKey}&sort_by=popularity.asc&include_adult=false&page=1&release_date.lte=${full_date}&with_watch_monetization_types=flatrate`
  );
  const json = await response.json();
  const data = await removeData(json).slice(0, 1);

  const videoResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${data?.[0].id}/videos?api_key=${dbApiKey}`
  );
  const videoJson = await videoResponse.json();
  const videoObj = await videoJson.results.filter(
    (i: videoData) =>
    {
      if(i.name === "Official Trailer" || i.name === "Official Trailer 1"){
        return i.name === "Official Trailer" || i.name === "Official Trailer 1";
      }
      else{
        return videoJson.results[0]
      }
    }    
    )[0];
  
  await data.push(videoObj);
  return data;
};
export { latestMovies };



const SearchData = async (keyword: string | null, page: number) => {
  let newPage = page;
  let dataArray: [] = [];
  const response = await fetch(`
        https://api.themoviedb.org/3/search/multi?api_key=${dbApiKey}&query=${keyword}&page=${newPage}&include_adult=false`);
  const json = await response.json();
  const data: [] = await removeData(json).filter(
    (i: movieData) => Object.keys(i).includes("backdrop_path") === true
  );
  dataArray = [...dataArray, ...data];

  return dataArray;
};
export { SearchData };

/* Details */

const getDetails = async (
  distStr?: string,
  id?: string
) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${distStr}/${id}?api_key=${dbApiKey}`
  );
  const json = await response.json();
  return json;
};
export { getDetails };


const indepthDetail = async (
  distStr?: string,
  id?: string,
  sort?: string,
) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${distStr}/${id}/${sort}?api_key=${dbApiKey}`
  );
  const json = await response.json();
  return json;
}
export { indepthDetail };
