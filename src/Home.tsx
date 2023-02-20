import styled from "styled-components";
import { Helmet } from "react-helmet";
import movieList from "./api";
import { useState } from 'react';
import { Link, Outlet, useLocation, useMatch, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";

export const Main = styled.div`
    width: 100%;
    height: 100vh;
`

export const ToggleThemeBtn = styled.button`
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    border-radius: 0.3rem;
    font-weight: 900;
    text-align: center;
    cursor: pointer;
    transition: ease background-color 250ms;
    border: 1px solid black;
    &:hover{
        background-color: white;
        color: black;
    }
    position: fixed;
    bottom: 1rem;
    right: 1rem;
`
export interface movieData {
    adult: boolean;
    backdrop_path: string;
    id: number;
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
};


const Wrapper = styled.div`
    color: ${(props) => props.theme.bodyFtColor};
    overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string | undefined }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10%;
  background-image: linear-gradient(rgba(0,0,0,0) 20%, ${(props) => props.theme.bodyBgColor}), url(${(props) => props.bgPhoto});
  background-size: cover;
  height: 100vh;
`;



const Title = styled.p`
  margin-bottom: 5%;
  font-size: 80%;
`;

const Overview = styled.p`
  font-size: 10%;
  width: 100%;
`;

const Slider = styled.div`
  top: -100px;
  height: 100vh;
  position: relative;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  @media screen and (max-width: 550px){
        grid-template-columns: repeat(2,1fr);
    }
    grid-template-columns: repeat(6, 1fr);
    width: 100%;
    margin-top: 10px;
    position: absolute;

`;

const Box = styled(motion.article) <{ posterbg: string | undefined }>`
  height: 40vh;
  font-size: 100%;
  background-image: url(${(props) => props.posterbg});
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.2,
        y: -80,
        transition: {
            delay: 0.3,
            duaration: 0.3,
            type: "tween",
        },
    },
};

const rowVariants = {
    hidden: {
        x: window.outerWidth + 10,
    },
    visible: {
        x: 0,
    },
    exit: {
        x: -window.outerWidth - 10,
    },
};

const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.hoverNavItem};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  p {
    text-align: center;
    font-size: 0.3rem;
  }
`;

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.3,
            duaration: 0.3,
            type: "tween",
        },
    },
};
/* 모달창 */
export const BoxModal = styled(motion.div)`
  width: 10rem;
  height:  8rem;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: ${(props)=>props.theme.bodyBgColor};
`;


const overlay = {
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
`;


const BigCover = styled.div<{ bgPhoto: string | undefined }>`
  width: 100%;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bgPhoto});
  height: 70%;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.bodyFtColor};
  font-size: 0.4rem;
  position: relative;
  padding: 5px;
`;

const BigOverview = styled.p`
  font-size: 0.2rem;
  position: relative;
  color: ${(props) => props.theme.bodyFtColor};
  padding: 5px;
`;

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
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [content, setContent] = useState<movieData>();
    const incraseIndex = () => {
        if (leaving) return;
        else {
            setLeaving(true);
            setIndex((prev) => index > 1 ? 0 : prev + 1);
        }
    }
    /* onExitComplete :  끝났을 때 실행
    애니메이션이 끝나기 전에 다음 boxs가 생기면 겹친다
    눌렀을때 아직 박스가 없어지지 않았다면 클릭해도 함수가 실행되지 않도록 하며
    박스가 없어졌다면 다음 박스를 추가한다
    onExitComplete을 이용하여 애니메이션이 끝나면 박스가 떠난것을 확인하는것을 다시 false로 돌린다
    */
    /* 모달창 */
    //const pricematch = useMatch("movie/:movieId");
    const [id, setId] = useState<null | string>(null);
    const navigate = useNavigate();
    const bigMovieMatch = useMatch("/movies/:movieId");
    console.log(data);
    return (
        <>
            <Helmet>
                <title>B-Grade</title>
            </Helmet>
            <Main>
                <ToggleThemeBtn onClick={toggleTheme}>{themeText}</ToggleThemeBtn>
                <Wrapper>
                    {isLoading ? (
                        <Loader>Loading...</Loader>
                    ) : (
                        <>
                            <Banner
                                onClick={incraseIndex}
                                bgPhoto={`https://image.tmdb.org/t/p/original/${data?.[0].backdrop_path}`}>
                                <Title>{data?.[0].original_title}</Title>
                                <Overview>{data?.[0].overview}</Overview>
                            </Banner>
                            <Slider>
                                <AnimatePresence initial={false} onExitComplete={() => {
                                    setLeaving((prev) => !prev);
                                }}>
                                    <Row
                                        variants={rowVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ type: "tween", duration: 1 }}
                                        key={index}
                                    >
                                        {data?.slice(1).slice(6 * index, (6 * (index + 1))).map((i) => (
                                            <>
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
                                                    }} layoutId={`${i.id}`}
                                                >
                                                    <Info variants={infoVariants}>
                                                        <p>{i.title}</p>
                                                    </Info>
                                                </Box>
                                            </>
                                        ))}
                                    </Row>
                                </AnimatePresence>
                            </Slider>
                            <AnimatePresence>
                                {id ? (
                                    <Overlay
                                        variants={overlay}
                                        onClick={() => setId(null)}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        <BoxModal layoutId={id}>
                                            {id &&
                                                (
                                                    <>
                                                        <BigCover bgPhoto={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`} />
                                                        <BigTitle>{content?.title}</BigTitle>
                                                        <BigOverview>{content?.overview}</BigOverview>
                                                    </>
                                                )
                                            }
                                        </BoxModal>
                                    </Overlay>
                                ) : null}
                            </AnimatePresence>
                        </>
                    )}
                </Wrapper>
            </Main>
        </>
    );
};
export default Home;
/*                                 onClick={incraseIndex}
                                bgPhoto={data?.poster_path}


                                <AnimatePresence  onClick={incraseIndex}
                                bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")} >                                </AnimatePresence>

                            https://image.tmdb.org/t/p/original/2lVjRgp5g6iMwF1cs9r5flPi011.jpg"

                            https://image.tmdb.org/t/p/original/gjzpFDcyIrw0nZ36BR0WNHF3oDj.jpg
                                */
//https://image.tmdb.org/t/p/original/backdrop-img(큰이미지)


