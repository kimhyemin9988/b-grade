import { Main, Wrapper } from "../MovieF/Movie";
import LatestTopShows from "./LatestTopShows";
import Popular from "./Popular";
import TopAndAiringC from "./TopAndAiringC";

export const tvTitleObj =
{
    title: ["Tv On The Air", "Top Rated", "Tv Popular"]
};

const Tv = () => {
    const dataType = "tv"
    const top_rated_url = "top_rated"
    const on_the_air_url = "on_the_air"
    return (
        <Main>
            <Wrapper>
                <LatestTopShows dataType={dataType}></LatestTopShows>
                <TopAndAiringC dataType={dataType} url={on_the_air_url} titleObj={tvTitleObj.title[0]}></TopAndAiringC>
            </Wrapper>
            <Popular dataType={dataType} ></Popular>
            <TopAndAiringC dataType={dataType} url={top_rated_url} titleObj={tvTitleObj.title[1]}></TopAndAiringC>
        </Main>
    );

}
export default Tv;
