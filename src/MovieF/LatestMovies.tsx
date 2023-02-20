import { useQuery } from "react-query";
import { latestMovies } from "../api";
import { Loader, movieData } from "../Home";

const LatestMovies = () =>{

    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<movieData[]>(["latestMovies"], latestMovies);

    return (
        <>
            { isLoading ? (
                    <Loader> Loading...</Loader >
                ) : (
                    <>
                        <h1>가장 최신의 영화</h1>
                    </>
                )}
        </>
    );

}
export default LatestMovies;
