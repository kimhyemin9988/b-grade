import SmallArrowBtn from "./SmallArrowBtn";
import { LinkStyle } from "../App";
import { Link } from "react-router-dom";

const BtnDetail = ({ dataType, contentId }: { dataType?: string, contentId?: number }) => {
  return (
    <div style={{ display: "flex"}}>
      <LinkStyle to={dataType === "movie"
        ? `${dataType}/${contentId}/details`
        : `${contentId}/details`}>
        <SmallArrowBtn></SmallArrowBtn>
      </LinkStyle >
    </div>
  );
};
export default BtnDetail;
