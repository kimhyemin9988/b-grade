
import { upcomingMovies } from "../api";
import { useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import { BigCover, BigOverview, BigTitle, Box, BoxModal, boxVariants, Info, infoVariants, movieData, MovingSlider, overlay, Overlay, RatingContainer, RatingSpan, RatingStar, Row, rowVariants, Slider, SliderContainer, titleObj } from "./Movie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingC from "../miniModule/LoadingC";
import { Section } from "./TopRatedMovies";
import SmallArrowBtn from "../miniModule/SmallArrowBtn";
import MobileSliderC from "../miniModule/MobileSliderC";
import WebSliderC from "../miniModule/WebSliderC";

const Upcoming = () => {

    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<movieData[]>(["upcomingMovies"], upcomingMovies);
    return (
        <>
            {isLoading ? (
                <LoadingC></LoadingC>
            ) : (
                window.outerWidth <= 550 ? 
                <MobileSliderC data={data} titleObj={titleObj.title[2]}></MobileSliderC> :
                    <Section>
                        <WebSliderC data={data} titleObj={titleObj.title[2]}></WebSliderC>
                    </Section>

            )}
        </>
    );

}
export default Upcoming;
