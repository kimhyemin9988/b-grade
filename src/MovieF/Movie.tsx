import styled from "styled-components";
import { Helmet } from "react-helmet";
import { movieList } from "../api";
import { useState } from 'react';
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { AnimatePresence, delay, motion } from "framer-motion";
import LatestMovies from "./LatestMovies";
import TopRatedMovies from "./TopRatedMovies";
import Upcoming from "./Upcoming";
import LoadingC from "../miniModule/LoadingC";
import SmallArrowBtn from "../miniModule/SmallArrowBtn";




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
  padding: 10%;
  background-image: linear-gradient(rgba(0,0,0,0) 20%, ${(props) => props.theme.bodyBgColor}), url(${(props) => props.bgPhoto});
  background-size: cover;
  height: 100vh;
  font-weight: 600;
`;



export const Title = styled.p`
  margin-bottom: 5%;
  font-size: 80%;
`;

export const Overview = styled.p`
  font-size: 0.3rem;
  width: 100%;
  @media screen and (max-width: 550px){
    font-size: 10%;
    }
`;

export const Slider = styled.div`
    position: relative;
    height: 40vh;
  @media screen and (max-width: 550px){
        height: 125vh;
    }

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
        grid-template-columns: repeat(2,1fr);
    }
    grid-template-columns: repeat(6, 1fr);
    width: 100%;
    margin: 10px;
    padding:10px;
    position: absolute;
    align-items: center;
`;

export const Box = styled(motion.article) <{ posterbg: string | undefined }>`
  width: 200px;
  height: 300px;
  font-size: 100%;
  background-color: ${(props) => props.theme.bodyFtColor};
  background-image: url(${(props) => props.posterbg});
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
    position: relative;
  margin:10px;
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
  width: 10rem;
  height:  8rem;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: ${(props) => props.theme.bodyBgColor};
  z-index: 20;
  position: fixed;
  top:1rem;
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
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bgPhoto});
  height: 70%;
`;

export const BigTitle = styled.h3`
  font-size: 0.4rem;
`;

export const BigOverview = styled.p`
  font-size: 0.2rem;
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
`
export const RatingSpan = styled.p`
    font-size:0.5rem;
    font-weight: 600;
`
export const RatingContainer = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    padding:20px;
`

export const DetailBtn = styled.button`
    width: 3rem;
    height: 0.7rem;
    margin: 0.1rem;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    border-radius: 0.1rem;
    font-weight: 900;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s  ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
        background-color: #ffffff96;
        color: black;
    }
`


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
    /* slideIndex Count */
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);

    const [content, setContent] = useState<movieData>();

    const [sliderDirection, setSliderDirection] = useState(0);
    const incraseIndex = (indexN: number) => {
        if (data) {
            if (leaving) return;
            else {
                setSliderDirection(indexN);
                setLeaving(true);
                const dataLength = Math.floor(data?.length / 5);
                if (indexN === 1) {
                    setIndex((prev) => dataLength - 1 > index ? prev + 1 : 0);
                }
                else if (indexN === -1) {
                    setIndex((prev) => index > 0 ? prev - 1 : dataLength - 2);
                }
            }
        }
    }
    /* onExitComplete :  끝났을 때 실행
    애니메이션이 끝나기 전에 다음 boxs가 생기면 겹친다
    눌렀을때 아직 박스가 없어지지 않았다면 클릭해도 함수가 실행되지 않도록 하며
    박스가 없어졌다면 다음 박스를 추가한다
    onExitComplete을 이용하여 애니메이션이 끝나면 박스가 떠난것을 확인하는것을 다시 false로 돌린다
    */

    const [id, setId] = useState<null | string>(null);
    const navigate = useNavigate();
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
                                <Overview>{data?.[0].overview}</Overview>
                                <Link to={`${data?.[0].id}/details`}>
                                    <DetailBtn>
                                        <BigTitle style={{ color: "black" }}>Details</BigTitle>
                                        <ArrowSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">{/*! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.*/}<path d="M0 55.2V426c0 12.2 9.9 22 22 22c6.3 0 12.4-2.7 16.6-7.5L121.2 346l58.1 116.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9L179.8 320H297.9c12.2 0 22.1-9.9 22.1-22.1c0-6.3-2.7-12.3-7.4-16.5L38.6 37.9C34.3 34.1 28.9 32 23.2 32C10.4 32 0 42.4 0 55.2z" /></ArrowSvg>
                                    </DetailBtn>
                                </Link>
                            </Banner>
                            <SliderContainer>
                                <RatingContainer>
                                    <RatingStar xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" fill="#ffb804" /></ RatingStar>
                                    {/*! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.*/}
                                    <RatingSpan>Rating 4.5 ~ 5.5</RatingSpan>
                                    <RatingSpan style={{ color: "gray" }}>/10</RatingSpan>
                                </RatingContainer>
                                <MovingSlider onClick={() => incraseIndex(-1)}>{`<`}</MovingSlider>
                                <MovingSlider style={{ right: "0" }} onClick={() => incraseIndex(1)}>{`>`}</MovingSlider>
                                <Slider>
                                    <AnimatePresence
                                        custom={sliderDirection}
                                        initial={false} onExitComplete={() => {
                                            setLeaving((prev) => !prev);
                                        }}>{/* AnimatePresence나 Slider에 key값 주면 오류남*/}
                                        <Row
                                            variants={rowVariants}
                                            custom={sliderDirection}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ type: "tween", duration: 0.5 }}
                                            key={index}
                                        >
                                            {/*Row가 index가 0이 될때까지  반복, random한 수로 하면 오류*/}
                                            {data?.slice(1).slice(5 * index, (5 * (index + 1))).map((i) => (//유령컴포넌트로 Box위를 묶었더니 key값 필요하다고 오류남 
                                                <Box key={i.id}
                                                    posterbg={`https://image.tmdb.org/t/p/w200/${i.poster_path}`}
                                                    whileHover="hover"
                                                    initial="normal"
                                                    variants={boxVariants}
                                                    transition={{ type: "tween" }}
                                                    onClick={() => {
                                                        setId(`${i.id}`);
                                                        setContent(i);
                                                        navigate(`movie/${i.id}`);
                                                    }} layoutId={`${i.id}a`}
                                                >
                                                    {/* number->string layoutId을 id로만 하면 다른 컴포넌트에 같은 tv show가 있을 시 오류남 -> 문자추가*/}
                                                    <Info variants={infoVariants} key={i.id}>
                                                        <p>{i.title}</p>
                                                    </Info>
                                                </Box>
                                            ))}
                                        </Row>
                                    </AnimatePresence>
                                </Slider>
                            </SliderContainer>
                            <AnimatePresence>
                                {id ? (
                                    <>
                                        <Overlay
                                            variants={overlay}
                                            onClick={(event) => {
                                                setId(null)
                                                navigate("");
                                            }}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        ></Overlay>
                                        <BoxModal layoutId={id + `a`}>
                                            <BigCover bgPhoto={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`} />
                                            <BigTitle>{content?.title}</BigTitle>
                                            <Link to={`${content?.id}/details`}>
                                                <SmallArrowBtn></SmallArrowBtn>
                                            </Link>
                                            <BigOverview>
                                                {content?.overview.slice(0, content?.overview.indexOf(' ', 350))}
                                                {content && content?.overview.length > 350 ? "..." : "."}
                                                {/* overview 긴것 자름 */}
                                            </BigOverview>
                                        </BoxModal>
                                    </>
                                ) : null}
                            </AnimatePresence>
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


