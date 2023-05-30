import { latestMovies } from "../api";
import { useQuery } from "react-query";
import {
  movieData,
  smallVideo,
} from "./Movie";
import styled from "styled-components";
import YouTube from "react-youtube";
import LoadingC from "../components/LoadingC";
import BtnDetail from "../components/BtnDetail";
import { Overview } from "./Movie";

export const Container = styled.section<{ bgPhoto: string | undefined }>`
  width: 100%;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  height: 80vh;
  background-size: 100% 100%;
  @media screen and (max-width: 550px) {
    height: 50vh;
  }
`;
export const Blur = styled.div`
  background-color: rgba(255, 255, 255, 0.034);
  backdrop-filter: blur(50px);
  height: 80vh;
  display: grid;
  grid-template-areas:
    "title title title"
    "video posterbg posterbg"
    "overview overview overview";
  @media screen and (max-width: 550px) {
    height: 50vh;
    grid-template-areas:
      "title title"
      "posterbg overview"
      "video video";
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
  }
`;
export const OverviewContainer = styled.div`
  grid-area: overview;
  padding: 20px;
  @media screen and (max-width: 550px) {
    padding: 10px;
  }
`;
export const xLarge = {
  height: "297",
  width: "528",
};

const YouTubeStyle = styled(YouTube)`
  height: 300px;
  padding-left: 20px;
  grid-area: video;
  @media screen and (max-width: 550px) {
    padding-left: 10px;
  }
`
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
  min-height: 30vh;
  margin-bottom: 180px;
  @media screen and (max-width: 550px) {
    margin-bottom: 20px;
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
            bgPhoto={`https://image.tmdb.org/t/p/original/${data?.[0].backdrop_path}`}>
            <Blur>
              <div style={{ display: "flex", alignItems:"center", gridArea:"title" }}>
                <LatestOriginal>
                  {data?.[0].original_title}
                </LatestOriginal>
                <BtnDetail dataType={dataType} contentId={data?.[0].id}></BtnDetail>
              </div>
              <SqureBox
                posterbg={`https://image.tmdb.org/t/p/w300/${data?.[0].poster_path}`}
              ></SqureBox>
              <YouTubeStyle
                videoId={data?.[1].key}
                opts={window.outerWidth <= 550 ? smallVideo : xLarge} />
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
