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
                <LatestTopShows dataType={dataType}></LatestTopShows>
                <AiringToday dataType={dataType}></AiringToday>
            </Wrapper>
            <Popular dataType={dataType}></Popular>
            <TopRated dataType={dataType}></TopRated>
        </Main>
    );

}
export default Tv;
