import { useRef, useState } from "react";
import {
  Box,
  movieData,
} from "../MovieF/Movie";
import { MoviesProps } from "./WebSliderC";
import SliderTitle from "./SliderTitle";
import ModalC from "./ModalC";
import PopularSelect from "./PopularSelect";
import { PopularBox } from "../Tv/Popular";
import styled from "styled-components";
import { motion } from "framer-motion";


export const MobileSlider = styled(motion.div)`
  width: 100%;
  height: 300px;
  display: flex;
  overflow-x: hidden;
  touch-action: pan-y;
  align-items: center;
  position: relative;
  @media screen and (max-width: 550px) {
    height: 6.5rem;
  }
`;

export const InnerContainer = styled(motion.div)`
  width: fit-content;
  display: flex;
`;

const MobileSliderC = ({ data, titleObj, dataType, totalData }: MoviesProps) => {
  const [id, setId] = useState<null | string>(null);
  const [content, setContent] = useState<movieData>();
  const constraintsRef = useRef(null);

  return (
    <>
      <MobileSlider ref={constraintsRef}>
        <SliderTitle titleObj={titleObj}></SliderTitle>
        {titleObj === "Tv Popular" &&
          <PopularSelect data={totalData}></PopularSelect>
        }
        <InnerContainer drag="x" dragConstraints={constraintsRef}>
          {
          data?.map((i) => (
            <Box
              key={data?.indexOf(i)}
              posterbg={`https://image.tmdb.org/t/p/w400/${i.poster_path}`}
              onClick={() => {
                setId(`${i.id}`);
                setContent(i);
              }}
            >
              {titleObj === "Tv Popular" &&
                <PopularBox>
                  <p>{data?.indexOf(i) + 1}</p>
                </PopularBox>
              }
            </Box>
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
