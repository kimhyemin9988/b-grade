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
const MainVideo = styled(Main)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
const TotalVideos = () => {
    const { state: movieId } = useLocation();
    const { isLoading: VideosLoading, data: VideosData } = useQuery<Videos>(["Videos", `${movieId}`], () => getVideos(movieId));
    return (
        <Main style={{ paddingTop: "13vh" }}>
            <Title style={{ paddingLeft: "20px" }}>Video</Title>
            <MainVideo>
                {VideosLoading ? <LoadingC></LoadingC> :
                    (
                        VideosData?.results.map((i) => {
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