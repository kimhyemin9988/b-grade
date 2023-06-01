import { tvPopular } from "../api";
import { useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import {
  Box,
  boxVariants,
  Info,
  infoVariants,
  InnerContainer,
  MobileSlider,
  movieData,
  MovingSlider,
  Row,
  rowVariants,
  Slider,
  SliderContainer,
} from "../MovieF/Movie";
import { useState, useRef } from "react";
import LoadingC from "../components/LoadingC";
import { Section } from "../MovieF/TopRatedMovies";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { HandleValue } from "../Atoms";
import { tvTitleObj } from "./Tv";
import SliderTitle from "../components/SliderTitle";
import ModalC from "../components/ModalC";
import PopularSelect from "../components/PopularSelect";

export const PopularBox = styled.div`
  background-color: ${(props) => props.theme.bodyFtColor};
  color: ${(props) => props.theme.bodyBgColor};
  font-size: 0.5rem;
  width: 0.7rem;
  margin: 0.1rem;
  text-align: center;
  border-radius: 10px;
  font-weight: 600;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.2);
`;

export const MiniP = styled.p`
  font-size: 0.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.bodyFtColor};
`;

const Popular = ({ dataType }: { dataType: string }) => {
  const titleObj = tvTitleObj.title[2];

  const { isLoading, data } = useQuery<movieData[]>(["tvPopular"], tvPopular);


/*   const [handleValue, setHandleValue] = useState<movieData[]>(); */
  const handleValue = useRecoilValue(HandleValue);
  /* 데이터 받아오기 */
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const [id, setId] = useState<null | string>(null);

  const [content, setContent] = useState<movieData>();


  const [sliderDirection, setSliderDirection] = useState(0);

  /* 나라별 인기 top 10 */
  const incraseIndex = (indexN: number) => {
    if (data) {
      if (leaving) return;
      else {
        setSliderDirection(indexN);
        setLeaving(true);
        setIndex((prev) => {
          if (indexN === 1) {
            // 1이면 오른쪽 이동
            prev = index === 0 ? 1 : 0;
          } else {
            // -1이면 왼쪽 이동
            prev = index === 1 ? 0 : 1;
          }
          return prev;
        });
      }
    }
  };

  const constraintsRef = useRef(null);
  return (
    <>
      {isLoading ? (
        <LoadingC></LoadingC>
      ) : window.outerWidth <= 550 ? (
        <>
          <MobileSlider ref={constraintsRef}>
            <SliderTitle titleObj={tvTitleObj.title[2]}></SliderTitle>
            <PopularSelect data={handleValue}></PopularSelect>
            <InnerContainer drag="x" dragConstraints={constraintsRef}>
              {handleValue?.slice(0, 10).map((i) => (
                <Box
                  key={handleValue?.indexOf(i)}
                  posterbg={`https://image.tmdb.org/t/p/w400/${i.poster_path}`}
                  onClick={() => {
                    setId(`${i.id}`);
                    setContent(i);
                  }}
                  layoutId={`${i.id}${titleObj}`}
                >
                  <PopularBox>
                    <p>{handleValue?.indexOf(i) + 1}</p>
                  </PopularBox>
                  <Info variants={infoVariants} key={i.id}>
                    <p>{i.name}</p>
                  </Info>
                </Box>
              ))}
            </InnerContainer>
          </MobileSlider>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ModalC id={id} setId={setId} titleObj={titleObj} content={content} dataType={dataType}></ModalC>
          </div>
        </>
      ) : (
        <Section>
          {/* <WebSliderC data={handleValue} titleObj={tvTitleObj.title[2]} dataType={dataType}></WebSliderC> */}
          <SliderContainer>
            <SliderTitle titleObj={tvTitleObj.title[2]}></SliderTitle>
            <PopularSelect data={data}></PopularSelect>
            <MovingSlider onClick={() => incraseIndex(-1)}>{`<`}</MovingSlider>
            <MovingSlider
              style={{ right: "0" }}
              onClick={() => incraseIndex(1)}
            >{`>`}</MovingSlider>
            <Slider titleObj={titleObj}>
              <AnimatePresence
                custom={sliderDirection}
                initial={false}
                onExitComplete={() => {
                  setLeaving((prev) => !prev);
                }}
              >
                <Row
                  variants={rowVariants}
                  custom={sliderDirection}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.5 }}
                  key={index}
                >
                  {handleValue?.slice(5 * index, 5 * (index + 1)).map((i) => (
                    <Box
                      key={i.id}
                      posterbg={`https://image.tmdb.org/t/p/w400/${i.poster_path}`}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      transition={{ type: "tween" }}
                      onClick={() => {
                        setId(`${i.id}`);
                        setContent(i);
                      }}
                      layoutId={`${i.id}${titleObj}`}
                    >
                      <PopularBox>
                        <p>{handleValue?.indexOf(i) + 1}</p>
                      </PopularBox>
                      <Info variants={infoVariants} key={i.id}>
                        <p>{i.title === undefined ?
                          i.name : i.title}</p>
                      </Info>
                    </Box>
                  ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderContainer>
          <ModalC id={id} setId={setId} titleObj={titleObj} content={content} dataType={dataType}></ModalC>
        </Section>
      )}
    </>
  );
};
export default Popular;
