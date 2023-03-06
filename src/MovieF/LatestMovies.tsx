import { latestMovies } from "../api";
import { useQuery } from "react-query";
import { Banner, Loader, movieData, Overview, Title } from "./Movie";
import styled from "styled-components";
export const Container = styled.div`
    width: 100%;
    background-color: ${(props)=>props.theme.hoverColor2};
`

const LatestMovies = () => {

    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<movieData>(["latestMovies"], latestMovies);
    return (
        <>
            {isLoading ? (
                <Loader> Loading...</Loader >
            ) : (
                <Container>
                    <h1>Latest Movie</h1>
                    <Title>{data?.original_title}</Title>
                </Container>
            )}
        </>
    );

}
export default LatestMovies;
