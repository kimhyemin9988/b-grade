
import { upcomingMovies } from "../api";

import { useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import { BigCover, BigOverview, BigTitle, Box, BoxModal, boxVariants, Info, infoVariants, Loader, movieData, overlay, Overlay, Row, rowVariants, Slider } from "../Home";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Upcoming = () => {

    /* 데이터 받아오기 */
    const { isLoading, data } = useQuery<movieData[]>(["upcomingMovies"], upcomingMovies);

    const [index, setIndex] = useState(0); //슬라이더 인덱스
    const [leaving, setLeaving] = useState(false);
    //슬라이더 박스 하나가 떠나고 다음것이 들어오는것 boolean
    /* 모달창 */
    const [id, setId] = useState<null | string>(null);
    /*박스 클릭시 해당하는 tv프로그램의 데이터를 저장 */
    const [content, setContent] = useState<movieData>();
    const navigate = useNavigate();
    const incraseIndex = () => {
        if (data) {
            if (leaving) return;
            else {
                const dataLength = Math.floor(data?.length / 6); // 5
                setLeaving(true);
                setIndex((prev) => dataLength - 1 > index ? prev + 1 : 0);
            }
        }
    }
    return (
        <>
            {isLoading ? (
                <Loader> Loading...</Loader >
            ) : (
                <>                    <button onClick={incraseIndex} style={{ width: "12em" }}>Next</button>
                    <Slider  style={{ top : "0"}}>
                        <AnimatePresence
                            initial={false} onExitComplete={() => {
                                setLeaving((prev) => !prev);
                            }}>{/* AnimatePresence나 Slider에 key값 주면 오류남*/}
                            <Row
                                variants={rowVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ type: "tween", duration: 1 }}
                                key={index}
                            >
                                {/* Row가 index가 0이 될때까지  반복, random한 수로 하면 오류남*/}
                                {data?.slice(1).slice(6 * index, (6 * (index + 1))).map((i) => (
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
                                            navigate(`movie/${i.id}`);
                                        }} layoutId={`${i.id}`}
                                    >
                                        <Info key={i.id} variants={infoVariants}>
                                            <p>{i.title}</p>
                                        </Info>
                                    </Box>
                                ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
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
                                    <BigTitle>{content?.title}</BigTitle>
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
export default Upcoming;

/*
adult,backdrop_path,genre_ids,id,original_language,original_title,overview,popularity,poster_path,release_date,title,video,vote_average,vote_count

boolean,string,object,number,string,string,string,number,string,string,string,boolean,number,number

*/