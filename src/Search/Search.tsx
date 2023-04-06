import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router";
import { SearchData } from "../api";
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { BigCover, BigOverview, BigTitle, Box, BoxModal, boxVariants, Info, infoVariants, Main, movieData, MovingSlider, overlay, Overlay, RatingContainer, RatingSpan, Row, rowVariants, Slider, SliderContainer, Wrapper } from "../MovieF/Movie";
import { useEffect, useState } from "react";
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
    const [page, setPage] = useState(1);
    const { isLoading, data } = useQuery<movieData[]>(["Search", `${keyword}=${page}`], () => SearchData(keyword, page),{ keepPreviousData: true });

    const [id, setId] = useState<null | string>(null);
    const [content, setContent] = useState<movieData>();
    const navigate = useNavigate();

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest + window.innerHeight === document.documentElement.offsetHeight) {
            setPage((prev)=> prev = prev + 1);
        }
    })
    //console.log(document.documentElement.scrollTop); // 1600 x
    //console.log(window.innerHeight);
    //console.log(document.documentElement.offsetHeight); // 1300 o

    /* infinite scroll
        const [isFetching, setIsFetching] = useState(false);
    const handleScroll = () => {
        console.log();
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
     */
      
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
                            <Main>
                                <Wrapper style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                    <RatingContainer>
                                        <RatingSpan>Search Results : {data?.length}</RatingSpan>
                                    </RatingContainer>
                                    {data?.map((i) => (
                                        <Box key={i.id}
                                            posterbg={`https://image.tmdb.org/t/p/w400/${i.poster_path}`}
                                            whileHover="hover"
                                            initial="normal"
                                            variants={boxVariants}
                                            transition={{ type: "tween" }}
                                            onClick={() => {
                                                setId(`${i.id}`);
                                                setContent(i);
                                            }} layoutId={`${i.id}`}
                                        >
                                            <Info variants={infoVariants} key={i.id}>
                                                <p>{Object.keys(i).includes("title") === true ? i.title : i.name}</p>
                                            </Info>
                                        </Box>
                                    ))}
                                </Wrapper>
                                <div style={{ display: "flex", justifyContent: "center" }}>
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
                                                    <BigTitle>{content?.title ? content?.title : content?.name}</BigTitle>
                                                    <Link to={`../${content?.media_type}/${content?.id}/details`}>
                                                        <SmallArrowBtn></SmallArrowBtn>
                                                    </Link>
                                                    <BigOverview>{content?.overview}</BigOverview>
                                                </BoxModal>
                                            </>
                                        ) : null}
                                    </AnimatePresence>
                                </div>
                            </Main>
                        )}
                </>
            )}
        </>
    );
}
export default Search;