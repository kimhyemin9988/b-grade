import { useRef, useState } from "react";
import {
  BigCover,
  BigTitle,
  Box,
  BoxModal,
  InnerContainer,
  MobileSlider,
  movieData,
} from "../MovieF/Movie";
import { AnimatePresence } from "framer-motion";
import BtnDetail from "./BtnDetail";
import { MoviesProps } from "./WebSliderC";
import SliderTitle from "./SliderTitle";
import OverviewComponent from "./OverviewComponent";
import OverlayC from "./OverlayC";
import ModalC from "./ModalC";

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
        <ModalC id={id} setId={setId} titleObj={titleObj} content={content} dataType={dataType}></ModalC>
      </div>
    </>
  );
};
export default MobileSliderC;
