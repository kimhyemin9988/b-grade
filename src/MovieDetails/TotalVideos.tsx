import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import styled from "styled-components";
import { getVideos } from "../api";
import LoadingC from "../miniModule/LoadingC";
import { opts } from "../MovieF/LatestMovies";
import { Main, Title, Wrapper } from "../MovieF/Movie";
import { Videos } from "./MovieDetails";
export const optsMin = {
    height: '207',
    width: '368',
};
export const MainVideo = styled(Main)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
                                    <YouTube style={{ paddingLeft: "20px" }} videoId={i.key} opts={optsMin} />
                                </Wrapper>
                            );
                        })
                    )}
            </MainVideo>
        </Main>

    );
};
export default TotalVideos;