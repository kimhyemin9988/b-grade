import { latestMovies } from "../api";
import { useQuery } from "react-query";
import {
  movieData,
} from "./Movie";
import styled from "styled-components";
import LoadingC from "../components/LoadingC";
import BtnDetail from "../components/BtnDetail";
import { Overview } from "./Movie";
import { changeVideoSize } from "../ModuleFx";

export const Container = styled.section<{ bgPhoto: string | undefined }>`
  width: 100%;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  height: fit-content;
  background-size: 100% 100%;
`;
export const Blur = styled.div`
  background-color: rgba(255, 255, 255, 0.034);
  backdrop-filter: blur(50px);
  height: fit-content;
  display: grid;
  grid-template-areas:
    "title title title"
    "video posterbg posterbg"
    "overview overview overview";
  @media screen and (max-width: 550px) {
    grid-template-areas:
      "video video"
      "title title"
      "posterbg overview";
  }
`;
const SqureBox = styled.article<{ posterbg: string | undefined }>`
  width: 4rem;
  height: 6rem;
  background-image: url(${(props) => props.posterbg});
  background-size: 100% 100%;
  grid-area: posterbg;
  @media screen and (max-width: 550px) {
    margin-left: 10px;
    margin-bottom: 10px;
  }
`;
export const OverviewContainer = styled.div`
  grid-area: overview;
  padding: 20px;
  @media screen and (max-width: 550px) {
    padding: 10px;
  }
`;

const LatestOriginal = styled.p`
  padding-left: 20px;
  font-size: 0.5rem;
  font-weight: 600;
@media screen and (max-width: 550px) {
    padding-left: 10px;
  }
`
const LatestTitle = styled.p`
    margin-bottom: 20px;
    padding-left: 20px;
    font-size: 0.5rem;
    font-weight: 600;
  @media screen and (max-width: 550px) {
    margin-bottom: 10px;
    padding-left: 10px;
  }
`
const LatestWrapper = styled.div`
  color: ${(props) => props.theme.bodyFtColor};
  flex-direction: column;
  align-items: flex-start;
  display: flex;
  min-height: 50vh;
  margin-bottom: 180px;
  @media screen and (max-width: 550px) {
    margin-bottom: 20px;
  }
`
export const YouTubeStyle = styled.iframe<{
  widthAndHeight: {
    width?: number;
    height?: number;
  }
}>`
 width: ${({ widthAndHeight }) => `${widthAndHeight.width}px`};
  height: ${({ widthAndHeight }) => `${widthAndHeight.height}px`};
  grid-area: video;
  padding-left: 20px;
  @media screen and (max-width: 550px) {
    padding-left:0;
    display: flex;
    justify-content: center;
    padding-top: 10px;
  }
`

const LatestMovies = ({ dataType }: { dataType: string }) => {
  /* 데이터 받아오기 */
  const { isLoading, data } = useQuery<movieData[]>(
    ["latestMovies"],
    latestMovies
  );

  return (
    <>
      {isLoading ? (
        <LoadingC></LoadingC>
      ) :
        <LatestWrapper>
          <LatestTitle>
            Popular Movies In Theaters
          </LatestTitle>
          <Container
            bgPhoto={`https://image.tmdb.org/t/p/w1280/${data?.[0].backdrop_path}`}>
            <Blur>
              <div style={{ display: "flex", alignItems: "center", gridArea: "title" }}>
                <LatestOriginal>
                  {data?.[0].original_title}
                </LatestOriginal>
                <BtnDetail dataType={dataType} contentId={data?.[0].id}></BtnDetail>
              </div>
              <SqureBox
                posterbg={`https://image.tmdb.org/t/p/w300/${data?.[0].poster_path}`}
              ></SqureBox>
              <YouTubeStyle
                title="movieYouTube"
                loading="lazy"
                widthAndHeight={changeVideoSize()}
                src={`https://www.youtube-nocookie.com/embed/${data?.[1].key}`}>
              </YouTubeStyle>
              <OverviewContainer>
                <Overview>{data?.[0].overview}</Overview>
              </OverviewContainer>
            </Blur>
          </Container>
        </LatestWrapper>
      }
    </>
  );
};

export default LatestMovies;
