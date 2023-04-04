
import { useQuery } from "react-query";
import { ArrowSvg, Banner, BigTitle, DetailBtn, Overview, Title } from "../MovieF/Movie";
import { tvLatest } from "../api";
import LoadingC from "../miniModule/LoadingC";
import { Link } from "react-router-dom";
export interface LatestShowsData {
    adult: boolean;
    backdrop_path: string;
    first_air_date: string;
    genres: [{
        id: number;
        name: string;
    }]
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
                        <Overview>
                            {data?.[0].overview.slice(0, data?.[0].overview.indexOf(' ', 250))}
                            {data?.[0] && data?.[0].overview.length > 350 ? "..." : "."}
                        </Overview>
                        <Link to={`${data?.[0].id}/details`}>
                            <DetailBtn>
                                <BigTitle style={{ color: "black" }}>Details</BigTitle>
                                <ArrowSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">{/*! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.*/}<path d="M0 55.2V426c0 12.2 9.9 22 22 22c6.3 0 12.4-2.7 16.6-7.5L121.2 346l58.1 116.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9L179.8 320H297.9c12.2 0 22.1-9.9 22.1-22.1c0-6.3-2.7-12.3-7.4-16.5L38.6 37.9C34.3 34.1 28.9 32 23.2 32C10.4 32 0 42.4 0 55.2z" /></ArrowSvg>
                            </DetailBtn>
                        </Link>
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