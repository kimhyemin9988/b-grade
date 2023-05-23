import { useRef, useState } from "react";
import {
  BigCover,
  BigOverview,
  BigTitle,
  Box,
  BoxModal,
  InnerContainer,
  MobileSlider,
  movieData,
} from "../MovieF/Movie";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SmallArrowBtn from "./SmallArrowBtn";
import { MoviesProps } from "./WebSliderC";
import SliderTitle from "./SliderTitle";
import OverviewComponent from "./OverviewComponent";
import OverlayC from "./OverlayC";

const MobileSliderC = ({ data, titleObj, dataType }: MoviesProps) => {
  const [id, setId] = useState<null | string>(null);
  const [content, setContent] = useState<movieData>();
  const constraintsRef = useRef(null);

  return (
    <>
      <MobileSlider ref={constraintsRef}>
        <SliderTitle titleObj={titleObj}></SliderTitle>
        <InnerContainer drag="x" dragConstraints={constraintsRef}>
          {data?.slice(1).map((i) => (
            <Box
              key={data?.indexOf(i)}
              posterbg={`https://image.tmdb.org/t/p/w400/${i.poster_path}`}
              onClick={() => {
                setId(`${i.id}`);
                setContent(i);
              }}
            ></Box>
          ))}
        </InnerContainer>
      </MobileSlider>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AnimatePresence>
          {id ? (
            <>
              <OverlayC setId={setId}></OverlayC>
              <BoxModal
                initial={{ y: "200%" }}
                animate={{ y: id && 0 }}
                transition={{
                  type: "linear",
                  duration: 0.1,
                }}
                exit={{ y: "200%" }}
              >
                <BigCover
                  bgPhoto={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`}
                />
                <BigTitle>
                  {content?.title ? content?.title : content?.name}
                </BigTitle>
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
      </div>
    </>
  );
};
export default MobileSliderC;
