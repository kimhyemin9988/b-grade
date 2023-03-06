import { Main, Wrapper } from "../MovieF/Movie";
import AiringToday from "./AiringToday";
import LatestShows from "./LatestShows";
import Popular from "./Popular";
import TopRated from "./TopRated";

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