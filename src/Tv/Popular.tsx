import { useQuery } from "react-query";
import { tvPopular } from "../api";
import { Loader } from "../Home";
import { tvData } from "./AiringToday";
const Popular = () =>{
/* 데이터 받아오기 */
const { isLoading, data } = useQuery<tvData[]>(["tvPopular"], tvPopular);

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
export default Popular;

/*
            /* 데이터 받아오기 
            const { isLoading, data } = useQuery<movieData[]>(["movies"], movieList);
*/