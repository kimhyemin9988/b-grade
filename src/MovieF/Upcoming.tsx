import { useQuery } from "react-query";
import { upcomingMovies } from "../api";
import { Loader, movieData } from "../Home";


const Upcoming = () =>{

    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<movieData[]>(["upcomingMovies"], upcomingMovies);

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
export default Upcoming;

/*
adult,backdrop_path,genre_ids,id,original_language,original_title,overview,popularity,poster_path,release_date,title,video,vote_average,vote_count

boolean,string,object,number,string,string,string,number,string,string,string,boolean,number,number

*/