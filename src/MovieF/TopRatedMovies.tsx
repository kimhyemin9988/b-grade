import { useQuery } from "react-query";
import {
  movieData,
  titleObj,
} from "./Movie";
import { topRatedMovies } from "../api";
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

const TopRatedMovies = ({ dataType }: { dataType: string }) => {
  const { isLoading, data } = useQuery<movieData[]>(
    ["topRatedMovies"],
    topRatedMovies
  );

  return (
    <>
      {isLoading ? (
        <LoadingC></LoadingC>
      ) : window.outerWidth <= 550 ? (
        <MobileSliderC
          data={data}
          titleObj={titleObj.title[1]}
          dataType={dataType}
        ></MobileSliderC>
      ) : (
        <Section>
          <WebSliderC
            data={data}
            titleObj={titleObj.title[1]}
            dataType={dataType}
          ></WebSliderC>
        </Section>
      )}
    </>
  );
};
export default TopRatedMovies;
