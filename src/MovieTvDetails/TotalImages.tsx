import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { indepthDetail } from "../api";
import LoadingC from "../components/LoadingC";
import { Main } from "../MovieF/Movie";
import { BackdropPhoto, TitleDiv } from "./MovieDetails";
import styled from "styled-components";
import { MainVideo } from "./MainDetails";

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
    () => indepthDetail(distStr, state, 'images')
  );

  const screenSize = window.innerWidth;
  const imgSize = screenSize < 550 ? "w780" : "w1280";

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
                bgPhoto={`https://image.tmdb.org/t/p/${imgSize}/${i.file_path}`}
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
