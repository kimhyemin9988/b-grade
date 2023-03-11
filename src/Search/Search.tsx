import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { SearchData } from "../api";
import { AnimatePresence } from "framer-motion";
import { BigCover, BigOverview, BigTitle, Box, BoxModal, boxVariants, movieData, MovingSlider, overlay, Overlay, Row, rowVariants, Slider, SliderContainer } from "../MovieF/Movie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingC from "../miniModule/LoadingC";
import { ErrorMain } from "../NotFound";
interface SearchI {
    success: string,
    status_message: string,
}
const Search = () => {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<movieData[]>(["Search", `${keyword}`], () => SearchData(keyword));

    const [index, setIndex] = useState(0); //슬라이더 인덱스
    const [leaving, setLeaving] = useState(false);
    //슬라이더 박스 하나가 떠나고 다음것이 들어오는것 boolean
    /* 모달창 */
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
                                <SliderContainer style={{ top: "0" }}>
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
                                                transition={{ type: "tween", duration: 1 }}
                                                key={index}
                                            >
                                                {data?.slice(5 * index, (5 * (index + 1))).map((i) => (
                                                    /* 유령컴포넌트로 Box위를 묶었더니 unique key값 필요하다고 오류남 */
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
                                                    </Box>
                                                ))}
                                            </Row>
                                        </AnimatePresence>
                                    </Slider>
                                </SliderContainer>
                                <AnimatePresence>
                                    {id ? (
                                        <Overlay
                                            variants={overlay}
                                            onClick={() => {
                                                setId(null)
                                                navigate(`?keyword=${keyword}`);
                                            }}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <BoxModal layoutId={id}>
                                                <BigCover bgPhoto={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`} />
                                                <BigTitle>{content?.title}</BigTitle>
                                                <BigOverview>{content?.overview}</BigOverview>
                                            </BoxModal>
                                        </Overlay>
                                    ) : null}
                                </AnimatePresence>
                            </>
                        )}
                </>
            )}
        </>
    );;
}
export default Search;