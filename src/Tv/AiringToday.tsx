import { tvAiring } from "../api";
import { useQuery } from "react-query";
import { movieData } from "../MovieF/Movie";
import LoadingC from "../components/LoadingC";
import MobileSliderC from "../components/MobileSliderC";
import { Section } from "../MovieF/TopRatedMovies";
import WebSliderC from "../components/WebSliderC";
import { tvTitleObj } from "./Tv";

const AiringToday = ({ dataType }: { dataType: string }) => {
  const { isLoading, data } = useQuery<movieData[]>(["airingToday"], tvAiring);
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