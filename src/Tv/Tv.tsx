import LoadingC from "../miniModule/LoadingC";
import { Main, Wrapper } from "../MovieF/Movie";
import AiringToday from "./AiringToday";
import LatestTopShows from "./LatestTopShows";
import Popular from "./Popular";
import TopRated from "./TopRated";

const Tv = () => {
    return (
        <Main>
            <Wrapper>
                <LatestTopShows></LatestTopShows>
                <AiringToday></AiringToday>
            </Wrapper>
            <Popular></Popular>
            <TopRated></TopRated>
        </Main>
    );

}
export default Tv;
/*Tv id page 추가 */