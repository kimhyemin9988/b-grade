import { useQuery } from "react-query";
import { movieData } from "../MovieF/Movie";
import { tvTopRated } from "../api";
import LoadingC from "../miniModule/LoadingC";
import { Section } from "../MovieF/TopRatedMovies";
import MobileSliderC from "../miniModule/MobileSliderC";
import WebSliderC from "../miniModule/WebSliderC";
import { tvTitleObj } from "./Tv";
const TopRated = () => {
  const { isLoading, data } = useQuery<movieData[]>(["tvTopRated"], tvTopRated);
  const dataType = "tv";
  return (
    <>
      {isLoading ? (
        <LoadingC></LoadingC>
      ) : window.outerWidth <= 550 ? (
        <MobileSliderC
          data={data}
          titleObj={tvTitleObj.title[1]}
          dataType={dataType}
        ></MobileSliderC>
      ) : (
        <Section>
          <WebSliderC
            data={data}
            titleObj={tvTitleObj.title[1]}
            dataType={dataType}
          ></WebSliderC>
        </Section>
      )}
    </>
  );
};
export default TopRated;
