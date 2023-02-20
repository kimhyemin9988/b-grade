import { useQuery } from "react-query";
import { tvTopRated } from "../api";
import { Loader } from "../Home";
import { tvData } from "./AiringToday";
const TopRated = () =>{
/* 데이터 받아오기 */
const { isLoading, data } = useQuery<tvData[]>(["tvTopRated"], tvTopRated);

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
export default TopRated;


/*
            /* 데이터 받아오기 
            const { isLoading, data } = useQuery<movieData[]>(["movies"], movieList);
*/