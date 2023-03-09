import { useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import { BigCover, BigOverview, BigTitle, Box, BoxModal, boxVariants, Info, infoVariants, Loader, movieData, MovingSlider, overlay, Overlay, Row, rowVariants, Slider, SliderContainer } from "../MovieF/Movie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tvTopRated } from "../api";
import { tvData } from "./AiringToday";
import LoadingC from "../miniModule/LoadingC";
const TopRated = () => {
    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<tvData[]>(["tvTopRated"], tvTopRated);

    const [index, setIndex] = useState(0); //슬라이더 인덱스
    const [leaving, setLeaving] = useState(false);
    //슬라이더 박스 하나가 떠나고 다음것이 들어오는것 boolean
    /* 모달창 */
    const [id, setId] = useState<null | string>(null);
    /*박스 클릭시 해당하는 tv프로그램의 데이터를 저장 */
    const [content, setContent] = useState<tvData>();
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
    }
    return (
        <>
            {isLoading ? (
                <Loader>
                    <LoadingC></LoadingC>
                </Loader>
            ) : (
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
                                    transition={{ type: "tween", duration: 0.5 }}
                                    key={index}
                                >
                                    {/* Row가 index가 0이 될때까지  반복, random한 수로 하면 오류남*/}
                                    {data?.slice(5 * index, (5 * (index + 1))).map((i) => (
                                        /* 유령컴포넌트로 Box위를 묶었더니 unique key값 필요하다고 오류남 */
                                        <Box key={i.id}
                                            posterbg={`https://image.tmdb.org/t/p/w200/${i.poster_path}`}
                                            whileHover="hover"
                                            initial="normal"
                                            variants={boxVariants}
                                            transition={{ type: "tween" }}
                                            onClick={() => {
                                                setId(`${i.id}`);
                                                setContent(i);
                                                navigate(`${i.id}`);
                                            }} layoutId={`${i.id}`}
                                        >
                                            <Info key={i.id} variants={infoVariants}>
                                                <p>{content?.name}</p>
                                            </Info>
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
                                    navigate("");
                                }}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <BoxModal layoutId={id}>
                                    <BigCover bgPhoto={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`} />
                                    <BigTitle>{content?.name}</BigTitle>
                                    <BigOverview>{content?.overview}</BigOverview>
                                </BoxModal>
                            </Overlay>
                        ) : null}
                    </AnimatePresence>
                </>
            )}
        </>
    );

}
export default TopRated;


/*
            /* 데이터 받아오기 
            const { isLoading, data } = useQuery<movieData[]>(["movies"], movieList);
*/