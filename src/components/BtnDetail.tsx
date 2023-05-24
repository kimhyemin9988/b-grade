import SmallArrowBtn from "./SmallArrowBtn";
import { LinkStyle } from "../App";

const BtnDetail = ({ dataType, contentId }: { dataType: string | undefined, contentId: number | undefined }) => {
  return (
    <LinkStyle to={dataType === "movie"
      ? `${dataType}/${contentId}/details`
      : `${contentId}/details`}>
      <SmallArrowBtn></SmallArrowBtn>
    </LinkStyle >
  );
};
export default BtnDetail;
