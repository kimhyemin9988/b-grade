import { tvAiring } from "../api";
import { useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import { BigCover, BigOverview, BigTitle, Box, BoxModal, boxVariants, Info, infoVariants, movieData, MovingSlider, overlay, Overlay, RatingContainer, RatingSpan, RatingStar, Row, rowVariants, Slider, SliderContainer } from "../MovieF/Movie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingC from "../miniModule/LoadingC";
import SmallArrowBtn from "../miniModule/SmallArrowBtn";
import MobileSliderC from "../miniModule/MobileSliderC";
import { Section } from "../MovieF/TopRatedMovies";
import WebSliderC from "../miniModule/WebSliderC";
import { tvTitleObj } from "./Tv";

const AiringToday = () => {
    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<movieData[]>(["airingToday"], tvAiring);
    const dataType = "tv";
    return (
        <>
            {isLoading ? (
                <LoadingC></LoadingC>
            ) : (
                window.outerWidth <= 550 ?
                    <MobileSliderC data={data} titleObj={tvTitleObj.title[0]} dataType={dataType}></MobileSliderC> :
                    <Section>
                        <WebSliderC data={data} titleObj={tvTitleObj.title[0]} dataType={dataType}></WebSliderC>
                    </Section>
            )}
        </>
    );

};
export default AiringToday;

/*



*/