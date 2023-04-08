import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import styled from "styled-components";
import { getVideos } from "../api";
import LoadingC from "../miniModule/LoadingC";
import { Main, Title, Wrapper, largeVideo, smallVideo } from "../MovieF/Movie";
import { TitleDiv, Videos } from "./MovieDetails";
import { MainImage } from "./TotalImages";

const TotalVideos = () => {
    const { state, pathname } = useLocation();
    const distStr = pathname.split('/')[1]; // movie of tv
    const { isLoading: VideosLoading, data: VideosData } = useQuery<Videos>(["Videos", `${state}`], () => getVideos(distStr, state));
    return (
        <Main style={{ paddingTop: "13vh", width: "100%" }}>
            <TitleDiv>Videos</TitleDiv>
            <MainImage>
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
            </MainImage>
        </Main>

    );
};
export default TotalVideos;