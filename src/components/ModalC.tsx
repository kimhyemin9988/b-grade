import { AnimatePresence, motion } from "framer-motion";
import OverlayC from "./OverlayC";
import { movieData } from "../MovieF/Movie";
import { MoviesProps } from "./WebSliderC";
import InsideModal from "./InsideModal";
import styled from "styled-components";

/* 모달창 */
export const BoxModal = styled(motion.div)`
  width: 12rem;
  height: 10rem;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: ${(props) => props.theme.bodyBgColor};
  z-index: 20;
  position: fixed;
  top: 1rem;
  @media screen and (max-width: 550px) {
    width: 8rem;
    height: 11rem;
  }
`;

const ModalC = ({ id, setId, titleObj, content, dataType }: { id: string | null, setId: (value: React.SetStateAction<string | null>) => void, titleObj: MoviesProps["titleObj"], content?: movieData, dataType?: string }) => {
    return (
        <AnimatePresence>
            {id ? (
                <>
                    <OverlayC setId={setId}></OverlayC>
                    {
                        window.outerWidth <= 550 ?
                            <BoxModal initial={{ y: "200%" }}
                                animate={{ y: id && 0 }}
                                transition={{
                                    type: "linear",
                                    duration: 0.1,
                                }}
                                exit={{ y: "200%" }}>
                                <InsideModal content={content} dataType={dataType}></InsideModal>
                            </BoxModal> :
                            <BoxModal layoutId={id + titleObj}>
                                <InsideModal content={content} dataType={dataType}></InsideModal>
                            </BoxModal>

                    }
                </>
            ) : null
            }
        </AnimatePresence >
    );
};
export default ModalC;
