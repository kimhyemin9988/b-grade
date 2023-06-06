import { useQuery } from "react-query";
import { movieData } from "../MovieF/Movie";
import { tvTopAndAiring } from "../api";
import LoadingC from "../components/LoadingC";
import { Section } from "../MovieF/UpcomingTopRated";
import MobileSliderC from "../components/MobileSliderC";
import WebSliderC from "../components/WebSliderC";
const TopAndAiringC = ({ dataType, url, titleObj }: { dataType: string, url: string, titleObj: string}) => {
  const { isLoading, data } = useQuery<movieData[]>([url], ()=>tvTopAndAiring(url, dataType));
  return (
    <>
      {isLoading ? (
        <LoadingC></LoadingC>
      ) : window.outerWidth <= 550 ? (
        <MobileSliderC
          data={data}
          titleObj={titleObj}
          dataType={dataType}
        ></MobileSliderC>
      ) : (
        <Section>
          <WebSliderC
            data={data}
            titleObj={titleObj}
            dataType={dataType}
          ></WebSliderC>
        </Section>
      )}
    </>
  );
};
export default TopAndAiringC;
