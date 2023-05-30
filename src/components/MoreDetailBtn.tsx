import { Link } from "react-router-dom";
import { Credits, DetailData, TitleDiv, Videos } from "../MovieTvDetails/MovieDetails";
import { LinkStyle } from "../App";
import { DetailBtn } from "../MovieF/Movie";

const MoreDetailBtn = ({ data, id, url, btnType, moreNumber }: { data?: Videos["results"] | undefined | Credits["cast"], id: string | undefined, url: string, btnType: string, moreNumber?: number }) => {
  return (
    <DetailData>
      <TitleDiv>{btnType}</TitleDiv>
      {data?.length !== undefined &&
        moreNumber && data?.length > moreNumber && (
          <LinkStyle to={`../${url}`} state={id}>
            <DetailBtn>
              <p>more {btnType}</p>
            </DetailBtn>
          </LinkStyle>
        )}
    </DetailData>
  );
};
export default MoreDetailBtn;
