import { tvAiring } from "../api";
import { useQuery } from "react-query";
import { movieData } from "../MovieF/Movie";
import LoadingC from "../miniModule/LoadingC";
import MobileSliderC from "../miniModule/MobileSliderC";
import { Section } from "../MovieF/TopRatedMovies";
import WebSliderC from "../miniModule/WebSliderC";
import { tvTitleObj } from "./Tv";

const AiringToday = () => {
  const { isLoading, data } = useQuery<movieData[]>(["airingToday"], tvAiring);
  const dataType = "tv";
  return (
    <>
      {isLoading ? (
        <LoadingC></LoadingC>
      ) : window.outerWidth <= 550 ? (
        <MobileSliderC
          data={data}
          titleObj={tvTitleObj.title[0]}
          dataType={dataType}
        ></MobileSliderC>
      ) : (
        <Section>
          <WebSliderC
            data={data}
            titleObj={tvTitleObj.title[0]}
            dataType={dataType}
          ></WebSliderC>
        </Section>
      )}
    </>
  );
};
export default AiringToday;