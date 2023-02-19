import styled from "styled-components";
import { Helmet } from "react-helmet";
import movieList from "./api";
import { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";
import { AnimatePresence, motion } from "framer-motion";

export const Main = styled.div`
    width: 100%;
    height: 100vh;
`
export const Box1 = styled.div`
    height: 30px;
    border-radius: 50px;
    padding: 2%;
    margin: 1%;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ToggleThemeBtn = styled.button`
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    border-radius: 0.3rem;
    font-weight: 900;
    text-align: center;
    cursor: pointer;
    transition: ease background-color 250ms;
    padding: 0 1.5rem;
    border: 1px solid black;
    position: absolute;
    &:hover{
        background-color: white;
        color: black;
    }
`
interface movieData {
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
  background-image: url(${(props)=>props.bgPhoto});
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
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
`;

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
const Home = () => {
    /* 테마 버튼 */
    const [themeText, setThemeText] = useState("라이트 모드로 보기");
    const [setIsDark] = useOutletContext<React.Dispatch<React.SetStateAction<boolean>>[]>();
    const toggleTheme = () => {
        setIsDark((element) => (!element));
        themeText === "다크 모드로 보기" ? setThemeText("라이트 모드로 보기") : setThemeText("다크 모드로 보기")
    };

    const { isLoading, data } = useQuery<movieData[]>(["movies"], movieList);
    return (
        <>
            <Helmet>
                <title>B-Grade</title>
            </Helmet>
            <Main>
                <Wrapper>
                    {isLoading ? (
                        <Loader>Loading...</Loader>
                    ) : (
                        <>
                        <Banner bgPhoto={data && `https://image.tmdb.org/t/p/original/${data[4].backdrop_path}`}>
                            <Title>{data && data[4].original_title}</Title>
                            <Overview>{data && data[4].overview}</Overview>
                        </Banner>
                            <Slider>
                                <Row
                                    variants={rowVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={{ type: "tween", duration: 1 }}
                                >
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <Box key={i}>{i}</Box>
                                    ))}
                                </Row>
                            </Slider>
                        </>
                    )}
                </Wrapper>
            </Main>
            <ToggleThemeBtn onClick={toggleTheme}>{themeText}</ToggleThemeBtn>
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