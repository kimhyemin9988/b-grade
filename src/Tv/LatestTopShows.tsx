
import { useQuery } from "react-query";
import { Banner, BigTitle, Overview, Title } from "../MovieF/Movie";
import { tvLatest } from "../api";
import LoadingC from "../miniModule/LoadingC";
export interface LatestShowsData {
    adult: boolean;
    backdrop_path: string;
    first_air_date: string;
    homepage: string;
    id: number;
    in_production: boolean;
    last_air_date: string;
    last_episode_to_air: {
        overview: string;
    };
    name: string;
    number_of_episodes: number;
    number_of_seasons: number;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}
/*인기있는 최신 tv */
const LatestTopShows = () => {
    /* 데이터 받아오기 */
     const { isLoading, data } = useQuery<LatestShowsData[]>(["tvLatest"], tvLatest);
    return (
        <>
             {isLoading ? (
                <LoadingC></LoadingC>
            ) : (
                <>
                     <Banner
                        bgPhoto={`https://image.tmdb.org/t/p/original/${data?.[0].backdrop_path}`}>
                        <Title>{data?.[0].name}</Title>
                        <Overview>{data?.[0].first_air_date}</Overview>
                        <Overview>{data?.[0].overview}</Overview>
                    </Banner>
                </>
            )} 
        </>
    );

}
export default LatestTopShows;
/*
            /* 데이터 받아오기 
            const { isLoading, data } = useQuery<movieData[]>(["movies"], movieList);
adult,backdrop_path,genre_ids,id,original_language,original_title,overview,popularity,poster_path,release_date,title,video,vote_average,vote_count


*/