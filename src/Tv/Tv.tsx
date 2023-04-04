import LoadingC from "../miniModule/LoadingC";
import { Main, Wrapper, movieData } from "../MovieF/Movie";
import AiringToday from "./AiringToday";
import LatestTopShows from "./LatestTopShows";
import Popular from "./Popular";
import TopRated from "./TopRated";

export const tvTitleObj =
{
    title: ["Tv On The Air", "Top Rated", "Tv Popular"]
}
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
