import { Main, Wrapper } from "./Home";
import AiringToday from "./Tv/AiringToday";
import LatestShows from "./Tv/LatestShows";
import Popular from "./Tv/Popular";
import TopRated from "./Tv/TopRated";

const Tv = () => {
    return (
        <>
            <LatestShows></LatestShows>
            <AiringToday></AiringToday>
            <Popular></Popular>
            <TopRated></TopRated>
        </>
    );

}
export default Tv;
/*Tv id page 추가 */