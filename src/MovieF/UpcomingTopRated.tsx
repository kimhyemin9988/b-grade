import { useQuery } from "react-query";
import {
  movieData,
} from "./Movie";
import { topAndUpcomingMovies } from "../api";
import LoadingC from "../components/LoadingC";
import styled from "styled-components";
import WebSliderC from "../components/WebSliderC";
import MobileSliderC from "../components/MobileSliderC";

export const Section = styled.section`
  flex-direction: column;
  align-items: center;
  display: flex;
  margin-top: 1rem;
`;

const UpcomingTopRated = ({ dataType, url, titleObj }: { dataType: string, url: string, titleObj: string}) => {
  const { isLoading, data } = useQuery<movieData[]>(
    [url],
    ()=>topAndUpcomingMovies(url)
  );

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
export default UpcomingTopRated;
