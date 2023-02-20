import { latestMovies } from "../api";
import { useQuery } from "react-query";
import { Banner, Loader, movieData, Overview, Title } from "../Home";
import styled from "styled-components";
const Container = styled.div`
    width: 100%;
    background-color: ${(props)=>props.theme.hoverColor2};
`

const LatestMovies = () => {

    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<movieData>(["latestMovies"], latestMovies);
    console.log(data);
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
