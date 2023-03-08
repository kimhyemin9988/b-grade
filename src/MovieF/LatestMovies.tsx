import { latestMovies } from "../api";
import { useQuery } from "react-query";
import { Banner, Box, Loader, movieData, Overview, Title, Wrapper } from "./Movie";
import styled from "styled-components";
export const Container = styled.div<{ bgPhoto: string | undefined }>`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10%;
    background-image: linear-gradient(rgba(0,0,0,0) 20%, ${(props) => props.theme.bodyBgColor}), url(${(props) => props.bgPhoto});
    background-size: cover;
    height: 40vh;
`

const LatestMovies = () => {

    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<movieData[]>(["latestMovies"], latestMovies);
    return (
        <>
            {isLoading ? (
                <Loader> Loading...</Loader >
            ) : (
                <Wrapper>
                    <Title>Popular movies in theaters</Title>
                    <Container
                        bgPhoto={`https://image.tmdb.org/t/p/original/${data?.[11].backdrop_path}`}>
                        <Title>{data?.[11].original_title}</Title>
                        <Overview>{data?.[11].overview}</Overview>
                    </Container>
                </Wrapper>
            )}
        </>
    );

}
export default LatestMovies;
