import { useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import { BigCover, BigOverview, BigTitle, Box, BoxModal, boxVariants, Info, infoVariants, movieData, MovingSlider, overlay, Overlay, RatingContainer, RatingSpan, RatingStar, Row, rowVariants, Slider, SliderContainer, titleObj, Wrapper } from "./Movie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { topRatedMovies } from "../api";
import LoadingC from "../miniModule/LoadingC";
import styled from "styled-components";
import SmallArrowBtn from "../miniModule/SmallArrowBtn";
import WebSliderC from "../miniModule/WebSliderC";
import MobileSliderC from "../miniModule/MobileSliderC";
import { useRecoilValue } from "recoil";

export const Section = styled.section`
    flex-direction: column;
    align-items: center;
    display: flex;
    margin-top: 1rem;
`

const TopRatedMovies = () => {
    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<movieData[]>(["topRatedMovies"], topRatedMovies);
    const dataType = "movie";

    return (
        <>
            {isLoading ? (
                <LoadingC></LoadingC>
            ) : (
                window.outerWidth <= 550 ?
                <MobileSliderC data={data} titleObj={titleObj.title[1]} dataType={dataType}></MobileSliderC> :
                    <Section>
                        <WebSliderC data={data} titleObj={titleObj.title[1]} dataType={dataType}></WebSliderC>
                    </Section>
            )}
        </>
    );

}
export default TopRatedMovies;
/*


*/