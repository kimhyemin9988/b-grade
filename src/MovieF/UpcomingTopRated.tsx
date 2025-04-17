import { useQuery } from "react-query";
import {
  movieData,
} from "./Movie";
import { topAndUpcomingMovies } from "../api";
import styled from "styled-components";
import WebSliderC from "../components/WebSliderC";
import MobileSliderC from "../components/MobileSliderC";

export const Section = styled.section`
  flex-direction: column;
  align-items: center;
  display: flex;
  margin-top: 1rem;
  min-height:0.8rem;
`;

const UpcomingTopRated = ({ dataType, url, titleObj }: { dataType: string, url: string, titleObj: string}) => {
  //dataType, url, titleObj 전부 정적 데이터
  const { isLoading, data } = useQuery<movieData[]>(
    [url],
    ()=>topAndUpcomingMovies(url, dataType)
  );

  return (
    <>
      {window.outerWidth <= 550 ? (
        <MobileSliderC
          data={!isLoading ? data : undefined}
          titleObj={titleObj}
          dataType={dataType}
        ></MobileSliderC>
      ) : (
        <Section>
          <WebSliderC
            data={!isLoading ? data : undefined}
            titleObj={titleObj}
            dataType={dataType}
          ></WebSliderC>
        </Section>
      )}
    </>
  );
};
export default UpcomingTopRated;
