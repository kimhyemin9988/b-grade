import { Main, Wrapper } from "../MovieF/Movie";
import AiringToday from "./AiringToday";
import LatestTopShows from "./LatestTopShows";
import Popular from "./Popular";
import TopRated from "./TopRated";

export const tvTitleObj =
{
    title: ["Tv On The Air", "Top Rated", "Tv Popular"]
}
const Tv = () => {
    const dataType = "tv"
    return (
        <Main>
            <Wrapper>
                <LatestTopShows></LatestTopShows>
                <AiringToday></AiringToday>
            </Wrapper>
            <Popular dataType={dataType}></Popular>
            <TopRated></TopRated>
        </Main>
    );

}
export default Tv;
