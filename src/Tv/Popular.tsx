import { fetchTvPopular } from "../fetchTvPopular";
import { useQuery } from "react-query";
import {
  movieData,
} from "../MovieF/Movie";
import LoadingC from "../components/LoadingC";
import { Section } from "../MovieF/UpcomingTopRated";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { HandleValue } from "../Atoms";
import WebSliderC from "../components/WebSliderC";
import MobileSliderC from "../components/MobileSliderC";

export const PopularBox = styled.div`
  background-color: ${(props) => props.theme.bodyFtColor};
  color: ${(props) => props.theme.bodyBgColor};
  font-size: 0.5rem;
  width: 0.7rem;
  margin: 0.1rem;
  text-align: center;
  border-radius: 10px;
  font-weight: 600;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.2);
`;

export const MiniP = styled.p`
  font-size: 0.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.bodyFtColor};
`;

const Popular = ({ dataType, titleObj }: { dataType: string, titleObj: string }) => {
  const { isLoading, data } = useQuery<movieData[]>(["tvPopular"], fetchTvPopular);

  const handleValue = useRecoilValue(HandleValue);

  return (
    <>
      {isLoading ? (
        <LoadingC></LoadingC>
      ) : window.outerWidth <= 550 ? (
        <MobileSliderC data={handleValue} titleObj={titleObj} dataType={dataType} totalData={data}></MobileSliderC>
      ) : (
        <Section>
          <WebSliderC data={handleValue} titleObj={titleObj} dataType={dataType} totalData={data}></WebSliderC>
        </Section>
      )}
    </>
  );
};
export default Popular;
