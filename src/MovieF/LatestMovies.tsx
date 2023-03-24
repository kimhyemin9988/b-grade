import { latestMovies } from "../api";
import { useQuery } from "react-query";
import { Box, movieData, Overview, RatingContainer, RatingSpan, Title, Wrapper } from "./Movie";
import styled from "styled-components";
import YouTube from 'react-youtube';
import LoadingC from "../miniModule/LoadingC";


export const Container = styled.section<{ bgPhoto: string | undefined }>`
    width: 100%;
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    height: 80vh;
`
const Blur = styled.div`
    background-color: rgba(255, 255, 255, 0.034);
    backdrop-filter: blur(50px);
    height: 80vh;
    display: grid;
    grid-template-areas:
    "title title title"
    "video posterbg posterbg"
    "overview overview overview";
`
const SqureBox = styled.article<{ posterbg: string | undefined }>`
    width: 200px;
    height: 300px; 
    background-image: url(${(props) => props.posterbg});
`
const OverviewContainer = styled.div`
    grid-area: overview;
    padding: 20px;
`
export const opts = {
    height: '300',
    width: '600',
};
const LatestMovies = () => {

    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<movieData[]>(["latestMovies"], latestMovies);
    return (
        <>
            {isLoading ? (
                <LoadingC></LoadingC>
            ) : (
                <Wrapper style={{ alignItems: "flex-start" }}>
                    <RatingSpan style={{ fontSize: "0.5rem", paddingLeft: "20px", marginBottom:"20px" }}>Popular Movies In Theaters</RatingSpan>
                    <Container
                        bgPhoto={`https://image.tmdb.org/t/p/original/${data?.[0].backdrop_path}`}>
                        <Blur>
                            <RatingSpan style={{ gridArea: "title", alignSelf: "center", paddingLeft: "20px" }}>{data?.[0].original_title}</RatingSpan>
                            <SqureBox style={{ gridArea: "posterbg" }} posterbg={`https://image.tmdb.org/t/p/w200/${data?.[0].poster_path}`}></SqureBox>
                            <YouTube style={{ gridArea: "video", height: "300px", paddingLeft: "20px" }} videoId={data?.[1].key} opts={opts} />{/* latestMovies 배열의 [1]이 video data */}
                            <OverviewContainer>
                                <Overview>{data?.[0].overview}</Overview>
                            </OverviewContainer>
                        </Blur>
                    </Container>
                </Wrapper>
            )
            }
        </>
    );

};

export default LatestMovies;
