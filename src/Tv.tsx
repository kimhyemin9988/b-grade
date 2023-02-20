import { Wrapper } from "./Home";
import AiringToday from "./Tv/AiringToday";
import LatestShows from "./Tv/LatestShows";
import Popular from "./Tv/Popular";
import TopRated from "./Tv/TopRated";

const Tv = () => {
    return (
        <Wrapper>
            <AiringToday></AiringToday>
            <LatestShows></LatestShows>
            <Popular></Popular>
            <TopRated></TopRated>
        </Wrapper>
    );

}
export default Tv;
/*Tv id page 추가 */