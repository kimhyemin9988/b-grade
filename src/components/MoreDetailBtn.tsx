import { Credits, DetailData, TitleDiv, Videos } from "../MovieTvDetails/MovieDetails";
import { LinkStyle } from "../App";
import styled from "styled-components";

export const DetailBtn = styled.button`
  width: 2.2rem;
  height: 0.6rem;
  margin-top: 0.1rem;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  border-radius: 0.1rem;
  border: 0;
  font-weight: 900;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.25rem;
  &:hover {
    background-color: #ffffff96;
    color: black;
  }
  p {
    font-weight: 600;
  }
`;

const MoreDetailBtn = ({ data, id, url, btnType, moreNumber }: { data?: Videos["results"]| Credits["cast"], id?: string, url: string, btnType: string, moreNumber?: number }) => {
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
