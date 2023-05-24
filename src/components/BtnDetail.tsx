import { Link } from "react-router-dom";
import SmallArrowBtn from "./SmallArrowBtn";

const BtnDetail = ({ dataType, contentId }: { dataType: string | undefined, contentId: number | undefined }) => {
  return (
    <Link to={dataType === "movie"
      ? `${dataType}/${contentId}/details`
      : `${contentId}/details`}>
      <SmallArrowBtn></SmallArrowBtn>
    </Link >
  );
};
export default BtnDetail;
