import styled from "styled-components";
import { Overview } from "../MovieF/Movie";

const DetailBtnSmall = styled.button`
  width: 1.9rem;
  height: 0.5rem;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  border-radius: 0.1rem;
  font-weight: 900;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  &:hover {
    background-color: #ffffff96;
    color: black;
  }
  @media screen and (max-width: 550px) {
    width: 2.1rem;
  }
`;
const ArrowSvgSmall = styled.svg`
  height: 0.4rem;
  width: 0.4rem;
  fill: black;
`;
const SmallArrowBtn = () => {
  return (
    <DetailBtnSmall>
      <Overview style={{ color: "black", fontSize: "0.25rem" }}>
        Details
      </Overview>
      <ArrowSvgSmall viewBox="0 0 320 512">
        <path d="M0 55.2V426c0 12.2 9.9 22 22 22c6.3 0 12.4-2.7 16.6-7.5L121.2 346l58.1 116.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9L179.8 320H297.9c12.2 0 22.1-9.9 22.1-22.1c0-6.3-2.7-12.3-7.4-16.5L38.6 37.9C34.3 34.1 28.9 32 23.2 32C10.4 32 0 42.4 0 55.2z" />
      </ArrowSvgSmall>
    </DetailBtnSmall>
  );
};
export default SmallArrowBtn;
