import { useQuery } from "react-query";
import { tvAiring } from "../api";
import { Loader, movieData } from "../Home";


export interface tvData extends movieData {
    first_air_date : string;
    origin_country : string;
  }

const AiringToday = () => {
    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<tvData[]>(["airingToday"], tvAiring);

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

};
export default AiringToday;

/*



*/