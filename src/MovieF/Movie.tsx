import styled from "styled-components";
import { Helmet } from "react-helmet";
import { movieList } from "../api";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import {
  motion,
} from "framer-motion";
import LatestMovies from "./LatestMovies";
import TopRatedMovies from "./TopRatedMovies";
import Upcoming from "./Upcoming";
import LoadingC from "../components/LoadingC";
import MobileSliderC from "../components/MobileSliderC";
import WebSliderC from "../components/WebSliderC";
import BannerOverview from "../components/BannerOverview";

export const Main = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const ToggleThemeBtn = styled.button`
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  border-radius: 0.2rem;
  font-weight: 900;
  text-align: center;
  cursor: pointer;
  border: 1px solid black;
  &:hover {
    background-color: #ffffffbc;
  }
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 10;
  padding: 0.1rem;
`;
export interface movieData {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  key: string;
  media_type: string;
  first_air_date?: string;
  origin_country?: string;
}

export const Wrapper = styled.div`
  color: ${(props) => props.theme.bodyFtColor};
  flex-direction: column;
  align-items: center;
  display: flex;
  min-height: 30vh;
`;

export const Title = styled.p`
  margin-bottom: 5%;
  font-size: 1rem;
  @media screen and (max-width: 550px) {
    font-size: 0.5rem;
  }
`;

export const Overview = styled.p`
  color: ${(props) => props.theme.bodyFtColor};
  font-size: 0.3rem;
  width: 100%;
`;

export const Box = styled(motion.article) <{ posterbg?: string | undefined }>`
  width: 200px;
  height: 300px;
  font-size: 100%;
  background-color: ${(props) => props.theme.bodyFtColor};
  background-image: url(${(props) => props.posterbg});
  background-size: 100% 100%;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  position: relative;
  margin: 10px;
  @media screen and (max-width: 550px) {
    width: 80px;
    height: 120px;
  }
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;


export const BigCover = styled.div<{ bgPhoto: string | undefined }>`
  width: 100%;
  background-position: center center;
  background-image: url(${(props) => props.bgPhoto});
  height: 55%;
  border-radius: 10px 10px 0 0;
  background-size: 100% 100%;
  @media screen and (max-width: 550px) {
    height: 50%;
  }
`;

export const titleObj = {
  title: ["Rating 4.5 ~ 5.5/10", "Top Rating", "Upcoming releases"],
};


const Home = () => {
  /* 데이터 받아오기 */
  const { isLoading, data } = useQuery<movieData[]>(["movies"], movieList);
  /* 테마 버튼 */
  const [themeText, setThemeText] = useState("라이트 모드로 보기");
  const [setIsDark] =
    useOutletContext<React.Dispatch<React.SetStateAction<boolean>>[]>();

  const toggleTheme = () => {
    setIsDark((element) => !element);
    themeText === "다크 모드로 보기"
      ? setThemeText("라이트 모드로 보기")
      : setThemeText("다크 모드로 보기");
  };

  const dataType = "movie";

  return (
    <>
      <Helmet>
        <title>B-Grade</title>
      </Helmet>
      <Main>
        <ToggleThemeBtn onClick={toggleTheme}>{themeText}</ToggleThemeBtn>
        <Wrapper>
          {isLoading ? (
            <LoadingC></LoadingC>
          ) : (
            <>
              <BannerOverview content={data?.[0]} sliceLength={350} dataType={dataType}></BannerOverview>
              {window.outerWidth <= 550 ? (
                <MobileSliderC
                  data={data}
                  titleObj={titleObj.title[0]}
                  dataType={dataType}
                ></MobileSliderC>
              ) : (
                <WebSliderC
                  data={data}
                  titleObj={titleObj.title[0]}
                  dataType={dataType}
                ></WebSliderC>
              )}
            </>
          )}
        </Wrapper>
        <LatestMovies dataType={dataType}></LatestMovies>
        <TopRatedMovies dataType={dataType}></TopRatedMovies>
        <Upcoming dataType={dataType}></Upcoming>
      </Main>
    </>
  );
};
export default Home;
