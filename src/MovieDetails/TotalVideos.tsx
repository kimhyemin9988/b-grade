import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import styled from "styled-components";
import { getVideos } from "../api";
import LoadingC from "../miniModule/LoadingC";
import { opts } from "../MovieF/LatestMovies";
import { Main, Title, Wrapper } from "../MovieF/Movie";
import { Videos } from "./MovieDetails";
export const largeVideo = {
    height: '207',
    width: '368',
};
export const smallVideo = {
    height: '153',
    width: '272',
};
export const MainVideo = styled(Main)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: fit-content;
`
const TotalVideos = () => {
    const { state, pathname } = useLocation();
    const distStr = pathname.split('/')[1]; // movie of tv
    const { isLoading: VideosLoading, data: VideosData } = useQuery<Videos>(["Videos", `${state}`], () => getVideos(distStr, state));
    return (
        <Main style={{ paddingTop: "13vh" }}>
            <Title style={{ paddingLeft: "20px" }}>Video</Title>
            <MainVideo>
                {VideosLoading ? <LoadingC></LoadingC> :
                    (
                        VideosData?.results.slice(3).map((i) => {
                            return (
                                <Wrapper key={i.id}>
                                    <YouTube style={{ paddingLeft: window.outerWidth <= 550 ? "0" : "20px" }} videoId={i.key} opts={window.outerWidth <= 550 ? smallVideo : largeVideo} />
                                </Wrapper>
                            );
                        })
                    )}
            </MainVideo>
        </Main>

    );
};
export default TotalVideos;