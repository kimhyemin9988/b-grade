import { useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import { BigCover, BigOverview, BigTitle, Box, BoxModal, boxVariants, Info, infoVariants, movieData, MovingSlider, overlay, Overlay, RatingContainer, RatingSpan, RatingStar, Row, rowVariants, Slider, SliderContainer, Wrapper } from "./Movie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { topRatedMovies } from "../api";
import LoadingC from "../miniModule/LoadingC";
import styled from "styled-components";
import SmallArrowBtn from "../miniModule/SmallArrowBtn";

export const Section = styled.section`
    flex-direction: column;
    align-items: center;
    display: flex;
    margin-top: 1rem;
`

const TopRatedMovies = () => {

    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<movieData[]>(["topRatedMovies"], topRatedMovies);

    const [index, setIndex] = useState(0); //슬라이더 인덱스
    const [leaving, setLeaving] = useState(false);

    const [id, setId] = useState<null | string>(null);

    /*박스 클릭시 해당하는 tv프로그램의 데이터를 저장 */
    const [content, setContent] = useState<movieData>();
    const navigate = useNavigate();

    const [sliderDirection, setSliderDirection] = useState(0);

    const incraseIndex = (indexN: number) => {
        if (data) {
            if (leaving) return;
            else {
                setSliderDirection(indexN);
                const dataLength = Math.floor(data?.length / 5); // 5
                setLeaving(true);
                if (indexN === 1) {
                    setIndex((prev) => dataLength - 1 > index ? prev + 1 : 0);
                }
                else if (indexN === -1) {
                    setIndex((prev) => index > 0 ? prev - 1 : dataLength - 2);
                }
            }
        }
    }
    return (
        <>
            {isLoading ? (
                <LoadingC></LoadingC>
            ) : (
                <>
                    <Section>
                        <SliderContainer style={{ top: "0" }}>
                            <RatingContainer>
                                <RatingStar xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" fill="#ffb804" /></ RatingStar>
                                <RatingSpan>Top Rating</RatingSpan>
                            </RatingContainer>
                            <MovingSlider onClick={() => incraseIndex(-1)}>{`<`}</MovingSlider>
                            <MovingSlider style={{ right: "0" }} onClick={() => incraseIndex(1)}>{`>`}</MovingSlider>
                            <Slider style={{ top: "0" }}>
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
                                        {data?.slice(5 * index, (5 * (index + 1))).map((i) => (
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
                                                }} layoutId={`${i.id}b`}
                                            >
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
                                        onClick={() => {
                                            setId(null)
                                            navigate("");
                                        }}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    ></Overlay>
                                    <BoxModal layoutId={id + `b`}>
                                        <BigCover bgPhoto={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`} />
                                        <BigTitle>{content?.title}</BigTitle>
                                        <Link to={`${content?.id}/details`}>
                                            <SmallArrowBtn></SmallArrowBtn>
                                        </Link>
                                        <BigOverview>
                                            {content?.overview.slice(0, content?.overview.indexOf(' ', 350))}
                                            {content && content?.overview.length > 350 ? "..." : "."}
                                        </BigOverview>
                                    </BoxModal>
                                </>
                            ) : null}
                        </AnimatePresence>
                    </Section>
                </>
            )}
        </>
    );

}
export default TopRatedMovies;
/*


*/