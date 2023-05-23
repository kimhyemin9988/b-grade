import { tvPopular } from "../api";
import { useQuery } from "react-query";
import { AnimatePresence } from "framer-motion";
import {
  BigCover,
  BigOverview,
  BigTitle,
  Box,
  BoxModal,
  boxVariants,
  Info,
  infoVariants,
  InnerContainer,
  MobileSlider,
  movieData,
  MovingSlider,
  overlay,
  Overlay,
  RatingContainer,
  RatingSpan,
  RatingStar,
  Row,
  rowVariants,
  Slider,
  SliderContainer,
} from "../MovieF/Movie";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LoadingC from "../components/LoadingC";
import { Section } from "../MovieF/TopRatedMovies";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { IPopularLanguage, PopularLanguage } from "../Atoms";
import Select, { SingleValue } from "react-select";
import SmallArrowBtn from "../components/SmallArrowBtn";
import { tvTitleObj } from "./Tv";
import SliderTitle from "../components/SliderTitle";
import OverviewComponent from "../components/OverviewComponent";

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
const SelectBox = styled.div`
  width: 4rem;
  font-size: 0.2rem;
  font-weight: 600;
  z-index: 4;
  right: 0;
  margin-left: 1rem;
  color: ${(props) => props.theme.bodyBgColor};
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
  @media screen and (max-width: 550px) {
    margin: 5px;
  }
`;
export const MiniP = styled.p`
  font-size: 0.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.bodyFtColor};
`;
const customStyles = {
  control: (base: any) => ({
    ...base,
    height: 25,
    minHeight: 25,
    alignContent: "center",
  }),
  valueContainer: (base: any) => ({
    ...base,
    alignItems: "center",
  }),
  menuList: (base: any) => ({
    ...base,
    color: "black",
  }),
};

// const dataType = "tv" Popular내부에서 정의 시 비교가 의미없음
const Popular = ({ dataType }: { dataType: string }) => {
  const titleObj = tvTitleObj.title[2];
  const { isLoading, data } = useQuery<movieData[]>(["tvPopular"], tvPopular);
  /* 언어별 차트 */
  useEffect(() => {
    setHandleValue(
      data?.filter((i: movieData) => i.original_language === "en")
    );
  }, [data]);
  const [handleValue, setHandleValue] = useState<movieData[]>();
  const handleChange = (e: SingleValue<IPopularLanguage>) => {
    const value = e?.value;
    setHandleValue(
      data?.filter((i: movieData) => i.original_language === value) || []
    );
  };

  /* 데이터 받아오기 */
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const [id, setId] = useState<null | string>(null);

  const [content, setContent] = useState<movieData>();
  const [sliderDirection, setSliderDirection] = useState(0);

  const popularLanguage = useRecoilValue(PopularLanguage);

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
            <SliderTitle titleObj={titleObj}></SliderTitle>
            <SelectBox>
              <Select
                defaultValue={popularLanguage[0]}
                options={popularLanguage}
                onChange={handleChange}
                styles={customStyles}
              />
            </SelectBox>
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
            <AnimatePresence>
              {id ? (
                <>
                  <Overlay
                    variants={overlay}
                    onClick={() => {
                      setId(null);
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  ></Overlay>
                  <BoxModal
                    initial={{ y: "150%" }}
                    animate={{ y: 0 }}
                    transition={{
                      type: "linear",
                      duration: 0.1,
                    }}
                    exit={{ y: "150%" }}
                  >
                    <BigCover
                      bgPhoto={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`}
                    />
                    <BigTitle>
                      {content?.title ? content?.title : content?.name}
                    </BigTitle>
                    <Link to={`${content?.id}/details`}>
                      <SmallArrowBtn></SmallArrowBtn>
                    </Link>
                    <OverviewComponent content={content} sliceLength={300}></OverviewComponent>
                  </BoxModal>
                </>
              ) : null}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <Section>
          <SliderContainer>
            <SliderTitle titleObj={tvTitleObj.title[2]}></SliderTitle>
            <SelectBox>
              <Select
                defaultValue={popularLanguage[0]}
                options={popularLanguage}
                onChange={handleChange} // 선택한 obj return
              />
            </SelectBox>
            <MovingSlider onClick={() => incraseIndex(-1)}>{`<`}</MovingSlider>
            <MovingSlider
              style={{ right: "0" }}
              onClick={() => incraseIndex(1)}
            >{`>`}</MovingSlider>
            <Slider style={{ top: "0" }}>
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
                        <p>{i.name}</p>
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
                    setId(null);
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                ></Overlay>
                <BoxModal layoutId={id + titleObj}>
                  <BigCover
                    bgPhoto={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`}
                  />
                  <BigTitle>{content?.name}</BigTitle>
                  <Link
                    to={
                      dataType === "movie"
                        ? `movie/${content?.id}/details`
                        : `${content?.id}/details`
                    }
                  >
                    <SmallArrowBtn></SmallArrowBtn>
                  </Link>
                  <OverviewComponent content={content} sliceLength={300}></OverviewComponent>
                </BoxModal>
              </>
            ) : null}
          </AnimatePresence>
        </Section>
      )}
    </>
  );
};
export default Popular;
