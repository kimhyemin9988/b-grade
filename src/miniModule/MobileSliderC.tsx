import styled from "styled-components";
import { useRef, useState } from 'react';
import { BigCover, BigOverview, BigTitle, Box, BoxModal, InnerContainer, MobileSlider, Overlay, RatingContainer, RatingSpan, RatingStar, movieData, overlay } from "../MovieF/Movie";
import { AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SmallArrowBtn from "./SmallArrowBtn";
import { MoviesProps } from "./WebSliderC";



const MobileSliderC = ({ data, titleObj, dataType}: MoviesProps) => {

    const navigate = useNavigate();
    const [id, setId] = useState<null | string>(null);
    const [content, setContent] = useState<movieData>();
    const constraintsRef = useRef(null);

    return (
        <>
            <MobileSlider ref={constraintsRef}>
                <RatingContainer>
                    <RatingStar xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" fill="#ffb804" /></ RatingStar>
                    {/*! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.*/}
                    <RatingSpan>{titleObj}</RatingSpan>
                </RatingContainer>
                <InnerContainer
                    drag="x" dragConstraints={constraintsRef}>
                    {data?.slice(1).map((i) => (
                        <Box key={data?.indexOf(i)}
                            posterbg={`https://image.tmdb.org/t/p/w400/${i.poster_path}`}
                            onClick={() => {
                                setId(`${i.id}`);
                                setContent(i);
                                dataType === "movie" ? navigate(`movie/${i.id}`) : navigate(`${i.id}`);
                            }}
                            layoutId={`${i.id}${titleObj}`}
                        ></Box>
                    ))}
                </InnerContainer>
            </MobileSlider>
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
export default MobileSliderC;
