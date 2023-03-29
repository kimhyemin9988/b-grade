import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router";
import { SearchData } from "../api";
import { AnimatePresence } from "framer-motion";
import { BigCover, BigOverview, BigTitle, Box, BoxModal, boxVariants, Info, infoVariants, Main, movieData, MovingSlider, overlay, Overlay, RatingContainer, RatingSpan, Row, rowVariants, Slider, SliderContainer, Wrapper } from "../MovieF/Movie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingC from "../miniModule/LoadingC";
import { ErrorMain } from "../NotFound";
import SmallArrowBtn from "../miniModule/SmallArrowBtn";
interface SearchI {
    success: string,
    status_message: string,
}
const Search = () => {

    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");

    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<movieData[]>(["Search", `${keyword}`], () => SearchData(keyword));

    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const [id, setId] = useState<null | string>(null);
    const [content, setContent] = useState<movieData>();
    const navigate = useNavigate();
    const [sliderDirection, setSliderDirection] = useState(0);
    const incraseIndex = (indexN: number) => {
        if (data) {
            if (leaving) return;
            else {
                setSliderDirection(indexN);
                if (indexN === 1) {
                    const dataLength = Math.floor(data?.length / 5); // 5
                    setLeaving(true);
                    setIndex((prev) => dataLength - 1 > index ? prev + 1 : 0);
                }
                else if (indexN === -1) {
                    const dataLength = Math.floor(data?.length / 5);
                    setLeaving(true);
                    setIndex((prev) => index > 0 ? prev - 1 : dataLength - 2);
                }
            }
        }
    };
    return (
        <>
            {isLoading ? (
                <LoadingC></LoadingC>
            ) : (
                <>
                    {data?.length === 0 ?
                        <ErrorMain>
                            <span>검색 결과가 없습니다.</span><br />
                            <span>다른 용어로 검색해주세요.</span>
                        </ErrorMain> : (
                            <>
                                <Main>
                                    <Wrapper>
                                        <SliderContainer style={{ top: "0", marginTop: "1.5rem" }}>
                                            <RatingContainer>
                                                <RatingSpan>Search Results : {data?.length}</RatingSpan>
                                            </RatingContainer>
                                            <MovingSlider style={{ width: "2rem", right: 0, top: 0 }}>Page : {index + 1}</MovingSlider>
                                            <MovingSlider onClick={() => incraseIndex(-1)}>{`<`}</MovingSlider>
                                            <MovingSlider style={{ right: "0" }} onClick={() => incraseIndex(1)}>{`>`}</MovingSlider>
                                            <Slider style={{ top: "0" }}>
                                                <AnimatePresence
                                                    custom={sliderDirection}
                                                    initial={false} onExitComplete={() => {
                                                        setLeaving((prev) => !prev);
                                                    }}>
                                                    <Row
                                                        variants={rowVariants}
                                                        custom={sliderDirection}
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit="exit"
                                                        transition={{ type: "tween", duration: 1 }}
                                                        key={index}
                                                    >
                                                        {data?.slice(5 * index, (5 * (index + 1))).map((i) => (
                                                            <Box key={i.id}
                                                                posterbg={`https://image.tmdb.org/t/p/w200/${i.poster_path}`}
                                                                whileHover="hover"
                                                                initial="normal"
                                                                variants={boxVariants}
                                                                transition={{ type: "tween" }}
                                                                onClick={async () => {
                                                                    setId(`${i.id}`);
                                                                    setContent(i);
                                                                    
                                                                }} layoutId={`${i.id}`}
                                                            >
                                                                <Info variants={infoVariants} key={i.id}>
                                                                    <p>{Object.keys(i).includes("title") === true ? i.title : i.name}</p>
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
                                                            navigate(`?keyword=${keyword}`);
                                                        }}
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit="exit"
                                                    ></Overlay>
                                                    <BoxModal layoutId={id}>
                                                        <BigCover bgPhoto={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`} />
                                                        <BigTitle>{content?.title}</BigTitle>
                                                        <Link to={`../${content?.media_type}/${content?.id}/details`}>
                                                            <SmallArrowBtn></SmallArrowBtn>
                                                        </Link>{/*http://localhost:3000/b-grade/tv/100088/details */}
                                                        {/*http://localhost:3000/b-grade/search/91768/details */}
                                                        <BigOverview>{content?.overview}</BigOverview>
                                                    </BoxModal>
                                                </>
                                            ) : null}
                                        </AnimatePresence>
                                    </Wrapper>
                                </Main>
                            </>
                        )}
                </>
            )}
        </>
    );;
}
export default Search;