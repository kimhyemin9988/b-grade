import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getImages } from "../api";
import LoadingC from "../miniModule/LoadingC";
import { Main } from "../MovieF/Movie";
import { BackdropPhoto, TitleDiv } from "./MovieDetails";
import styled from "styled-components";
import { MainVideo } from "./TvDetails";

export interface Images {
  backdrops: [
    {
      file_path: string;
    }
  ];
  logos: [
    {
      file_path: string;
    }
  ];
  posters: [
    {
      file_path: string;
    }
  ];
}
export const MainImage = styled(MainVideo)`
  @media screen and (max-width: 550px) {
    justify-content: center;
  }
`;

const TotalImages = () => {
  const { state, pathname } = useLocation();
  const distStr = pathname.split("/")[1]; // movie of tv
  const { isLoading: getImagesLoading, data: getImagesData } = useQuery<Images>(
    ["getImages", `${state}`],
    () => getImages(distStr, state)
  );
  return (
    <Main style={{ paddingTop: "13vh" }}>
      <TitleDiv>images</TitleDiv>
      {getImagesLoading ? (
        <LoadingC></LoadingC>
      ) : (
        <MainImage>
          {getImagesData?.backdrops.map((i) => {
            return (
              <BackdropPhoto
                style={{ width: "10rem", height: "6rem" }}
                bgPhoto={`https://image.tmdb.org/t/p/original/${i.file_path}`}
                key={getImagesData?.backdrops.indexOf(i)}
              ></BackdropPhoto>
            );
          })}
        </MainImage>
      )}
    </Main>
  );
};
export default TotalImages;
