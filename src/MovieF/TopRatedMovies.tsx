import { useQuery } from "react-query";
import { topRatedMovies } from "../api";
import { Loader, movieData } from "../Home";


const TopRatedMovies = () =>{

    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<movieData[]>(["topRatedMovies"], topRatedMovies);
    return (
        <>
            { isLoading ? (
                    <Loader> Loading...</Loader >
                ) : (
                    <>
                        <h1>로딩완료</h1>
                    </>
                )}
        </>
    );

}
export default TopRatedMovies;
/*


*/