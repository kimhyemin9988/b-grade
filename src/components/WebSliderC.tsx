import { useCallback, useState } from "react";
import {
  Box,
  movieData,
} from "../MovieF/Movie";
import { AnimatePresence, motion } from "framer-motion";
import SliderTitle from "./SliderTitle";
import ModalC from "./ModalC";
import PopularSelect from "./PopularSelect";
import { PopularBox } from "../Tv/Popular";
import styled from "styled-components";

export interface MoviesProps {
  data?: movieData[];
  titleObj?: string;
  dataType?: string;
  totalData?: movieData[];
}

const rowVariants = {
  hidden: (sliderDirection: number) => {
    return {
      x: sliderDirection > 0 ? 1200 : -1200,
    };
  },
  visible: {
    x: 0,
    zIndex: 1,
  },
  exit: (sliderDirection: number) => {
    return {
      x: sliderDirection < 0 ? 1200 : -1200,
    };
  },
};

export const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    y: -40,
    transition: {
      delay: 0.3,
      duaration: 0.3,
    },
  },
};

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.1,
    },
  },
};

export const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.bodyBgColor};
  position: absolute;
  width: 100%;
  bottom: 0;
  opacity: 0;
  border-end-end-radius: 10px;
  border-end-start-radius: 10px;
  padding: 5px;
  p {
    text-align: center;
    font-size: 0.3rem;
  }
`;


export const SliderContainer = styled.div`
  top: -150px;
  width: 1200px;
  height: 460px;
  border-radius: 20px;
  align-items: center;
  display: flex;
  position: relative;
  overflow-x: hidden;
  border: 1px solid ${(props) => props.theme.bodyFtColor};
  overflow-y: hidden;
`;


const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  @media screen and (max-width: 550px) {
    display: flex;
    position: static;
  }
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  margin: 10px;
  padding: 10px;
  position: absolute;
  align-items: center;
`;

const MovingSlider = styled.button`
  z-index: 5;
  position: absolute;
  background-color: #ffffff;
  border-radius: 0.3rem;
  font-weight: 900;
  text-align: center;
  cursor: pointer;
  border: 1px solid white;
  height: 0.8rem;
  width: 0.8rem;
  margin: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.2);
`;

export const Slider = styled.div<{ titleObj: string | undefined }>`
  position: relative;
  height: 40vh;
  top: ${(props)=> props.titleObj === "Tv Popular" && 0};
`;

const WebSliderC = ({ data, titleObj, dataType, totalData }: MoviesProps) => {

  const [id, setId] = useState<null | string>(null);
  const [content, setContent] = useState<movieData>();

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  /* slideIndex Count */
  const [sliderDirection, setSliderDirection] = useState(0);
  //const dataLength = data ? Math.floor(data.length / 5) : 0;

  const incraseIndex = useCallback((indexN: number) => {
    if (data) {
      if (leaving) return;
      else {
        setSliderDirection(indexN);
        setLeaving(true);
        const dataLength = Math.floor(data?.length / 5);
        if (indexN === 1) {
          setIndex((prev) => prev = titleObj === "Tv Popular" ? (index === 0 ? 1 : 0) : (dataLength - 1 > index ? prev + 1 : 0));
        } else if (indexN === -1) {
          setIndex((prev) => prev = titleObj === "Tv Popular" ? (index === 1 ? 0 : 1) : (index > 0 ? prev - 1 : dataLength - 2));
        }
      }
    }
  },[data, leaving, index, titleObj]);
  /* onExitComplete :  끝났을 때 실행
    애니메이션이 끝나기 전에 다음 boxs가 생기면 겹친다
    눌렀을때 아직 박스가 없어지지 않았다면 클릭해도 함수가 실행되지 않도록 하며
    박스가 없어졌다면 다음 박스를 추가한다
    onExitComplete을 이용하여 애니메이션이 끝나면 박스가 떠난것을 확인하는것을 다시 false로 돌린다
    */
  return (
    <>
      <SliderContainer>
        <SliderTitle titleObj={titleObj}></SliderTitle>
        {titleObj === "Tv Popular" &&
          <PopularSelect data={totalData}></PopularSelect>
        }
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
              {/*Row가 index가 0이 될때까지  반복, random한 수로 하면 오류*/}
              {data?.slice(5 * index, 5 * (index + 1))
                .map(
                  (i) => (
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
                      {/* number->string layoutId을 id로만 하면 다른 컴포넌트에 같은 tv show가 있을 시 오류남 -> 문자추가*/}
                      {titleObj === "Tv Popular" &&
                        <PopularBox>
                          <p>{data?.indexOf(i) + 1}</p>
                        </PopularBox>
                      }
                      <Info variants={infoVariants} key={i.id}>
                        <p>{i.title === undefined ?
                          i.name : i.title}</p>
                      </Info>
                    </Box>
                  )
                )}
            </Row>
          </AnimatePresence>
        </Slider>
      </SliderContainer>
      <ModalC id={id} setId={setId} titleObj={titleObj} content={content} dataType={dataType}></ModalC>
    </>
  );
};
export default WebSliderC;
