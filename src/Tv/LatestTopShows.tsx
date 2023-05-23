import { useQuery } from "react-query";
import {
  ArrowSvg,
  Banner,
  BigTitle,
  DetailBtn,
  Overview,
  Title,
} from "../MovieF/Movie";
import { tvLatest } from "../api";
import LoadingC from "../components/LoadingC";
import { Link } from "react-router-dom";
import SmallArrowBtn from "../components/SmallArrowBtn";
export interface LatestShowsData {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
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
  const { isLoading, data } = useQuery<LatestShowsData[]>(
    ["tvLatest"],
    tvLatest
  );
  return (
    <>
      {isLoading ? (
        <LoadingC></LoadingC>
      ) : (
        <>
          <Banner
            bgPhoto={`https://image.tmdb.org/t/p/original/${data?.[0].backdrop_path}`}
          >
            <Title>{data?.[0].name}</Title>
            <Overview>
              {data?.[0].overview.slice(
                0,
                data?.[0].overview.indexOf(" ", 250)
              )}
              {data?.[0] && data?.[0].overview.length > 250 ? "..." : "."}
            </Overview>
            <Link to={`${data?.[0].id}/details`}>
              <SmallArrowBtn></SmallArrowBtn>
            </Link>
          </Banner>
        </>
      )}
    </>
  );
};
export default LatestTopShows;
