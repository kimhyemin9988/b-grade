import { useQuery } from "react-query";
import { tvLatest } from "../api";
import { Loader } from "../Home";

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
    const { isLoading, data } = useQuery(["tvLatest"], tvLatest);

    return (
        <>
            {isLoading ? (
                <Loader> Loading...</Loader >
            ) : (
                <>
                    <h1>로딩완료</h1>
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


            adult
            backdrop_path
            created_by
            episode_run_time
            first_air_date
            genres
            homepage
            id
            in_production
            languages
            last_air_date
            last_episode_to_air
            name
            next_episode_to_air
            networks
            number_of_episodes
            number_of_seasons
            origin_country
            original_language
            original_name
            overview
            popularity
            poster_path
            production_companies
            production_countries
            seasons
            spoken_languages
            status
            tagline
            type
            vote_average
            vote_count

            boolean
            string
            object
            object
            string
            object
            string
            number
            boolean
            object
            string
            object
            string
            object
            object
            number
            number
            object
            string
            string
            string
            number
            string
            object
            object
            object
            object
            string
            string
            string
            number
            number
*/