import { useQuery } from "react-query";
import { tvLatest } from "../api";
import LoadingC from "../components/LoadingC";
import BannerOverview from "../components/BannerOverview";
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
const LatestTopShows = ({ dataType }: { dataType: string }) => {

  const { isLoading, data } = useQuery<LatestShowsData[]>(
    ["tvLatest"], tvLatest );
  return (
    <>
      {
        isLoading ? (
          <LoadingC></LoadingC >
        ) : (
          <BannerOverview content={data?.[0]} sliceLength={350} dataType={dataType}></BannerOverview>
        )}
    </>
  );
};
export default LatestTopShows;
