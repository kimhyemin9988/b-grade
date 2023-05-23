import { motion } from "framer-motion";
import styled from "styled-components";

export const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 15;
`;
export const overlay = {
    hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
    visible: { backgroundColor: "#3b3636c5" },
    exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};
const OverlayC = ({ setId }: { setId: (value: React.SetStateAction<string | null>) => void }) => {
    return (
        <Overlay
            variants={overlay}
            onClick={() => {
                setId(null);
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
        ></Overlay>
    )
};

export default OverlayC;