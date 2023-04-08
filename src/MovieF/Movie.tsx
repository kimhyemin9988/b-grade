import styled from "styled-components";
import { Helmet } from "react-helmet";
import { movieList } from "../api";
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { AnimatePresence, delay, motion, motionValue, transform } from "framer-motion";
import LatestMovies from "./LatestMovies";
import TopRatedMovies from "./TopRatedMovies";
import Upcoming from "./Upcoming";
import LoadingC from "../miniModule/LoadingC";
import MobileSliderC from "../miniModule/MobileSliderC";
import WebSliderC from "../miniModule/WebSliderC";


export const Main = styled.div`
    width: 100%;
    //    height: 100vh;
    margin-bottom: 1rem;
`

export const ToggleThemeBtn = styled.button`
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    border-radius: 0.2rem;
    font-weight: 900;
    text-align: center;
    cursor: pointer;
    border: 1px solid black;
    &:hover{
        background-color: #ffffffbc;
    }
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 10;
    padding: 0.1rem;
`
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
};


export const Wrapper = styled.div`
    color: ${(props) => props.theme.bodyFtColor};
    flex-direction: column;
    align-items: center;
    display: flex;
`;


export const Banner = styled.div<{ bgPhoto: string | undefined }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8%;
  background-image: linear-gradient(rgba(0,0,0,0) 20%, ${(props) => props.theme.bodyBgColor}), url(${(props) => props.bgPhoto});
  background-size: 100% 100%;
  height: 75vh;
  margin-top:13vh;
  font-weight: 600;
        @media screen and (max-width: 550px){
            margin-top:8vh;
        height: 33vh;
    }
`;



export const Title = styled.p`
  margin-bottom: 5%;
  font-size: 1rem;
  @media screen and (max-width: 550px){
    font-size: 0.5rem;
    }
`;

export const Overview = styled.p`
    color: ${(props) => props.theme.bodyFtColor};
  font-size: 0.3rem;
  width: 100%;
`;

export const Slider = styled.div`
    position: relative;
    height: 40vh;

`;
export const MovingSlider = styled.button`
    z-index: 5;
    position: absolute;
    background-color: #ffffff;
    border-radius: 0.3rem;
    font-weight: 900;
    text-align: center;
    cursor: pointer;
    border: 1px solid white;
    height: 0.8rem;
    width: 0.8rem;
    margin: 20px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.2);
`

export const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
    @media screen and (max-width: 550px){
        display:flex;
        position: static;
    }
    grid-template-columns: repeat(6, 1fr);
    width: 100%;
    margin: 10px;
    padding:10px;
    position: absolute;
    align-items: center;
`;


export const Box = styled(motion.article)<{ posterbg?: string | undefined}>` // 
  width: 200px;
  height: 300px;
  font-size: 100%;
  background-color: ${(props) => props.theme.bodyFtColor};
  background-image: url(${(props) => props.posterbg});
    background-size: 100% 100%;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
    position: relative;
  margin:10px;
      @media screen and (max-width: 550px){
        width: 80px;
        height: 120px
    }
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;


export const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.1,
        y: -40,
        transition: {
            delay: 0.3,
            duaration: 0.3,
        },
    },
};

export const rowVariants = {
    hidden: (sliderDirection: number) => {
        return {
            x: sliderDirection > 0 ? 1200 : -1200
        };
    },
    visible: {
        x: 0,
        zIndex: 1,
    },
    exit: (sliderDirection: number) => {
        return {
            x: sliderDirection < 0 ? 1200 : -1200
        };
    },
};

export const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.bodyBgColor};
  position: absolute;
  width: 100%;
    bottom: 0;
    opacity: 0;
    border-end-end-radius: 10px;
    border-end-start-radius: 10px;
    padding: 5px;
  p {
    text-align: center;
    font-size: 0.3rem;
  }
`;

export const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.1,
        },
    },
};

/* 모달창 */
export const BoxModal = styled(motion.div)`
  width: 12rem;
  height:  10rem;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: ${(props) => props.theme.bodyBgColor};
  z-index: 20;
  position: fixed;
  top:1rem;
   @media screen and (max-width: 550px){
        width: 8rem;
        height: 11rem;
    }
`;


export const overlay = {
    hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
    visible: { backgroundColor: "#3b3636c5" },
    exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

export const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 15;
`;


export const BigCover = styled.div<{ bgPhoto: string | undefined }>`
  width: 100%;
  background-position: center center;
  background-image: url(${(props) => props.bgPhoto});
  height: 55%;
  border-radius: 10px 10px 0 0;
  background-size: 100% 100%;
     @media screen and (max-width: 550px){
        height: 50%;
    }
`;

export const BigTitle = styled.p`
  font-size: 0.4rem;
    padding: 5px;
    font-weight:700;
`;

export const BigOverview = styled.p`
  font-size: 0.3rem;
  position: relative;
  color: ${(props) => props.theme.bodyFtColor};
  padding: 5px;
`;

export const SliderContainer = styled.div`
    top: -150px;
    width: 1200px;
    height: 460px;
    border-radius: 20px;
    align-items: center;
    display: flex;
    position : relative;
    overflow-x: hidden;
    border: 1px solid ${(props) => props.theme.bodyFtColor};
    overflow-y: hidden;
`
export const RatingStar = styled.svg`
    height:0.7rem;
    width: 0.7rem;
    margin-right: 0.3em;
`
export const ArrowSvg = styled.svg`
    height:0.5rem;
    width: 0.5rem;
    @media screen and (max-width: 550px){
        height:0.3rem;
        width: 0.3rem;
    }
`
export const RatingSpan = styled.p`
    font-size:0.5rem;
    font-weight: 600;
    display:flex;
`
export const RatingContainer = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    padding:20px;
    @media screen and (max-width: 550px){
        padding:0;
        margin-left:0.2rem;
    }
`

export const DetailBtn = styled.button`
    width: 2.2rem;
    height: 0.6rem;
    margin-top: 0.1rem;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    border-radius: 0.1rem;
    border: 0;
    font-weight: 900;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s  ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:0.25rem;
    &:hover{
        background-color: #ffffff96;
        color: black;
    }
    p{
            font-weight: 600;
        }

    
`

export const MobileSlider = styled(motion.div)`
    width: 100%;
    height: 300px;
    display: flex;
    overflow-x: hidden;
    touch-action: pan-y;
    align-items: center;
    position:relative;
    @media screen and (max-width: 550px){
        height: 6.5rem;
    }

`;
export const InnerContainer = styled(motion.div)`
    width:fit-content;
    display:flex;
`

export const titleObj =
{
    title: ["Rating 4.5 ~ 5.5/10", "Top Rating", "Upcoming releases"]
}

export const largeVideo = {
    height: '207',
    width: '368',
};
export const smallVideo = {
    height: '153',
    width: '272',
};

const Home = () => {
    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<movieData[]>(["movies"], movieList);
    /* 테마 버튼 */
    const [themeText, setThemeText] = useState("라이트 모드로 보기");
    const [setIsDark] = useOutletContext<React.Dispatch<React.SetStateAction<boolean>>[]>();
    const toggleTheme = () => {
        setIsDark((element) => (!element));
        themeText === "다크 모드로 보기" ? setThemeText("라이트 모드로 보기") : setThemeText("다크 모드로 보기")
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
                            <Banner
                                bgPhoto={`https://image.tmdb.org/t/p/original/${data?.[0].backdrop_path}`}>
                                <Title>{data?.[0].title}</Title>
                                {window.outerWidth <= 550 ?
                                    <Overview>
                                        {data?.[0].overview.slice(0, data?.[0].overview.indexOf(' ', 350))}
                                        {data?.[0] && data?.[0].overview.length > 350 ? "..." : "."}
                                    </Overview> :
                                    <Overview>
                                        {data?.[0].overview}
                                    </Overview>}
                                <Link to={`movie/${data?.[0].id}/details`}>
                                    <DetailBtn>
                                        <BigTitle style={{ color: "black" }}>Details</BigTitle>
                                        <ArrowSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">{/*! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.*/}<path d="M0 55.2V426c0 12.2 9.9 22 22 22c6.3 0 12.4-2.7 16.6-7.5L121.2 346l58.1 116.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9L179.8 320H297.9c12.2 0 22.1-9.9 22.1-22.1c0-6.3-2.7-12.3-7.4-16.5L38.6 37.9C34.3 34.1 28.9 32 23.2 32C10.4 32 0 42.4 0 55.2z" /></ArrowSvg>
                                    </DetailBtn>
                                </Link>
                            </Banner>
                            {window.outerWidth <= 550 ? (
                                <MobileSliderC data={data} titleObj={titleObj.title[0]} dataType={dataType}></MobileSliderC>
                            ) : (
                                <WebSliderC data={data} titleObj={titleObj.title[0]} dataType={dataType}></WebSliderC>
                            )}
                        </>
                    )}
                </Wrapper>
                <LatestMovies></LatestMovies>
                <TopRatedMovies></TopRatedMovies>
                <Upcoming></Upcoming>
            </Main>
        </>
    );
};
export default Home;


