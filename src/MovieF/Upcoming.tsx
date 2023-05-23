import { upcomingMovies } from "../api";
import { useQuery } from "react-query";
import {
  movieData,
  titleObj,
} from "./Movie";
import LoadingC from "../components/LoadingC";
import { Section } from "./TopRatedMovies";
import MobileSliderC from "../components/MobileSliderC";
import WebSliderC from "../components/WebSliderC";

const Upcoming = () => {
  /* 데이터 받아오기 */
  const { isLoading, data } = useQuery<movieData[]>(
    ["upcomingMovies"],
    upcomingMovies
  );
  const dataType = "movie";
  return (
    <>
      {isLoading ? (
        <LoadingC></LoadingC>
      ) : window.outerWidth <= 550 ? (
        <MobileSliderC
          data={data}
          titleObj={titleObj.title[2]}
          dataType={dataType}
        ></MobileSliderC>
      ) : (
        <Section>
          <WebSliderC
            data={data}
            titleObj={titleObj.title[2]}
            dataType={dataType}
          ></WebSliderC>
        </Section>
      )}
    </>
  );
};
export default Upcoming;
