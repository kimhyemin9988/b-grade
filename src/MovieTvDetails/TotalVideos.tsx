import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { indepthDetail } from "../api";
import LoadingC from "../components/LoadingC";
import { Main, Wrapper } from "../MovieF/Movie";
import { TitleDiv, Videos } from "./MovieDetails";
import { MainImage } from "./TotalImages";
import { YouTubeStyle } from "../MovieF/LatestMovies";
import { changeVideoSize } from "../ModuleFx";

const TotalVideos = () => {
  const { state, pathname } = useLocation();
  const distStr = pathname.split("/")[1]; // movie of tv
  const { isLoading: VideosLoading, data: VideosData } = useQuery<Videos>(
    ["Videos", `${state}`],
    () => indepthDetail(distStr, state, 'videos')
  );
  return (
    <Main style={{ paddingTop: "13vh", width: "100%" }}>
      <TitleDiv>Videos</TitleDiv>
      <MainImage>
        {VideosLoading ? (
          <LoadingC></LoadingC>
        ) : (
          VideosData?.results.slice(3).map((i) => {
            return (
              <Wrapper key={i.id}>
                <YouTubeStyle
                  widthAndHeight={changeVideoSize()}
                  src={`https://www.youtube.com/embed/${i.key}`}>
                </YouTubeStyle>

              </Wrapper>
            );
          })
        )}
      </MainImage>
    </Main>
  );
};
export default TotalVideos;
