
import { useQuery } from "react-query";
import { Banner, BigTitle, Loader, Overview, Title } from "../Home";
import { tvLatest } from "../api";

interface LatestShowsData {
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

const LatestShows = () => {
    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<LatestShowsData>(["tvLatest"], tvLatest);
    return (
        <>
            {isLoading ? (
                <Loader> Loading...</Loader >
            ) : (
                <>
                    <Banner bgPhoto="null" style={{height:"50vh"}}>
                        <h1 style={{marginTop:"1rem"}}>Latest Show</h1>
                        <BigTitle>title : {data?.name}</BigTitle>
                        <Overview>overview : {data?.overview}</Overview>
                        <h1>{data?.last_air_date}</h1>
                    </Banner>
                </>
            )}
        </>
    );

}
export default LatestShows;
/*
            /* 데이터 받아오기 
            const { isLoading, data } = useQuery<movieData[]>(["movies"], movieList);
adult,backdrop_path,genre_ids,id,original_language,original_title,overview,popularity,poster_path,release_date,title,video,vote_average,vote_count


*/