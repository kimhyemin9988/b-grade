import { AnimatePresence } from "framer-motion";
import OverlayC from "./OverlayC";
import { BigCover, BigTitle, BoxModal, movieData } from "../MovieF/Movie";
import BtnDetail from "./BtnDetail";
import OverviewComponent from "./OverviewComponent";
import { MoviesProps } from "./WebSliderC";
import InsideModal from "./InsideModal";

const ModalC = ({ id, setId, titleObj, content, dataType }: { id: null | string, setId: (value: React.SetStateAction<string | null>) => void, titleObj: MoviesProps["titleObj"], content?: movieData, dataType?: string }) => {
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
