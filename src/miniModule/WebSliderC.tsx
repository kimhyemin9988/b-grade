import { useResetRecoilState } from "recoil";
import styled from "styled-components";
import { useRef, useState } from 'react';
import { BigCover, BigOverview, BigTitle, Box, BoxModal, Info, InnerContainer, MobileSlider, MovingSlider, Overlay, RatingContainer, RatingSpan, RatingStar, Row, Slider, SliderContainer, movieData, overlay } from "../MovieF/Movie";
import { AnimatePresence } from "framer-motion";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import SmallArrowBtn from "./SmallArrowBtn";

export interface MoviesProps {
    data: movieData[] | undefined;
    titleObj? : string;
    dataType? : string;
}


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

export const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.1,
        },
    },
};

const WebSliderC = ({ data, titleObj, dataType }: MoviesProps) => {

    // navigate(`${i.id}`) => tv navigate
    const navigate = useNavigate();
    const [id, setId] = useState<null | string>(null);
    const [content, setContent] = useState<movieData>();

    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    /* slideIndex Count */
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
    return (
        <>
            <SliderContainer>
                <RatingContainer>
                    <RatingStar xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" fill="#ffb804" /></ RatingStar>
                    {/*! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.*/}
                    <RatingSpan>{titleObj}</RatingSpan>
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
                                    posterbg={`https://image.tmdb.org/t/p/w400/${i.poster_path}`}
                                    whileHover="hover"
                                    initial="normal"
                                    variants={boxVariants}
                                    transition={{ type: "tween" }}
                                    onClick={() => {
                                        setId(`${i.id}`);
                                        setContent(i);
                                        dataType === "movie" ? navigate(`movie/${i.id}`) : navigate(`${i.id}`);
                                    }} layoutId={`${i.id}${titleObj}`}
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
                            onClick={() => {
                                setId(null)
                                navigate("");
                            }}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        ></Overlay>
                        <BoxModal layoutId={id + titleObj}>
                            <BigCover bgPhoto={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`} />
                            <BigTitle>{content?.title}</BigTitle>
                            <Link to={`movie/${content?.id}/details`}>
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
    );
};
export default WebSliderC;
