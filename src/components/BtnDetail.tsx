import { Link } from "react-router-dom";
import { DetailBtnSmall } from "./SmallArrowBtn";

const BtnDetail = ({ dataType, contentId }: { dataType: string | undefined, contentId: number | undefined }) => {
  return (
    <Link to={dataType === "movie"
      ? `${dataType}/${contentId}/details`
      : `${contentId}/details`}>
        <DetailBtnSmall></DetailBtnSmall>
    </Link >
  );
};
export default BtnDetail;
