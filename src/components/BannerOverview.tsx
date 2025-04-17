import styled from "styled-components";
import { Overview, Title } from "../MovieF/Movie";
import BtnDetail from "./BtnDetail";
import React from "react";

export const Banner = styled.div<{ bgPhoto: string | undefined }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8%;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0) 20%,
      ${(props) => props.theme.bodyBgColor}
    ),
    url(${(props) => props.bgPhoto});
  background-size: 100% 100%;
  height: 75vh;
  margin-top: 13vh;
  font-weight: 600;
  width: 80%;
  @media screen and (max-width: 550px) {
    margin-top: 8vh;
    height: 33vh;
  }
  min-height: 400px; /* 안정적인 기본 높이 추가 */
  background-color: ${(props) => props.theme.bodyBgColor}; /* 기본 배경 */
`;

const BannerOverview = React.memo(({ content, sliceLength, dataType }: { content?: { overview: string, title?: string, id: number, backdrop_path: string, name?: string }, sliceLength: number, dataType?: string }) => {
  
  const preloadImage = new Image();
  const screenSize = window.innerWidth;
  const imgSize = screenSize < 550 ? "w780" : "w1280";
  preloadImage.src = `https://image.tmdb.org/t/p/${imgSize}/${content?.backdrop_path}`;

  return (
    <Banner
      bgPhoto={preloadImage.src}>
      <Title>{content?.title === undefined ? content?.name : content?.title}</Title>
      {content?.overview !== "" &&
        <Overview>
          {content?.overview.slice(0,
            content?.overview.indexOf(" ", sliceLength)
          )}
          {content && content?.overview.length > sliceLength ? "..." : "."}
        </Overview>
      }
      <BtnDetail dataType={dataType} contentId={content?.id}></BtnDetail>
    </Banner>
  )
});

export default BannerOverview;


