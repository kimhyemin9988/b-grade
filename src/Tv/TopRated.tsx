import { useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import { BigCover, BigOverview, BigTitle, Box, BoxModal, boxVariants, Info, infoVariants, movieData, MovingSlider, overlay, Overlay, RatingContainer, RatingSpan, RatingStar, Row, rowVariants, Slider, SliderContainer } from "../MovieF/Movie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tvTopRated } from "../api";
import LoadingC from "../miniModule/LoadingC";
import { Section } from "../MovieF/TopRatedMovies";
import SmallArrowBtn from "../miniModule/SmallArrowBtn";
import MobileSliderC from "../miniModule/MobileSliderC";
import WebSliderC from "../miniModule/WebSliderC";
import { tvTitleObj } from "./Tv";
const TopRated = () => {
    const { isLoading, data } = useQuery<movieData[]>(["tvTopRated"], tvTopRated);
    const dataType = "tv";
    return (
        <>
            {isLoading ? (
                <LoadingC></LoadingC>
            ) : (
                window.outerWidth <= 550 ?
                    <MobileSliderC data={data} titleObj={tvTitleObj.title[1]} dataType={dataType}></MobileSliderC> :
                    <Section>
                        <WebSliderC data={data} titleObj={tvTitleObj.title[1]} dataType={dataType}></WebSliderC>
                    </Section>
            )}
        </>
    );

}
export default TopRated;

