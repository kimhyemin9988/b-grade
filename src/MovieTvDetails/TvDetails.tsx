import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import styled from "styled-components";
import { indepthDetail, getDetails } from "../api";
import LoadingC from "../components/LoadingC";
import { Container } from "../MovieF/LatestMovies";
import {
  Main,
  Overview,
  Wrapper,
  DetailBtn,
  smallVideo,
  largeVideo,
} from "../MovieF/Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  BackdropPhoto,
  CastBox,
  CompanySvgSmall,
  Credits,
  DetailBlur,
  DetailData,
  LargeBox,
  MainDetail,
  OverviewSpan,
  OverviewTitle,
  SmallCircle,
  TextBox,
  TitleDiv,
  Videos,
  Width10,
  WrapperDetail,
} from "./MovieDetails";
import { LinkStyle } from "../App";

export interface tvDetails {
  adult: boolean;
  backdrop_path: string;
  created_by:
    | [
        {
          name: string;
        }
      ]
    | [];
  episode_run_time: [
    {
      0: number;
    }
  ];
  belongs_to_collection: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
  };
  id: number;
  name: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  original_language: string;
  original_name: string;
  production_companies: [
    {
      id: number;
      name: string;
      original_country: string;
    }
  ];
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  runtime: number;
  video: boolean;
  vote_average: number;
  vote_count: number;
  homepage: string;
  networks: [
    {
      name: string;
    }
  ];
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: [
    {
      air_date: string;
      name: string;
      id: number;
      episode_count: number;
      poster_path: string;
      season_number: number;
      overview: string;
    }
  ];
  status: string;
}
export const DetailContainer = styled.div`
  width: 100%;
  display: flex;
`;
export const MainVideo = styled(Main)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: fit-content;
`;
const TvDetails = () => {
  const params = useParams();
  const tvId = params.tvId;
  const distStr = Object.keys(params)[0].slice(0, -2);

  const { isLoading: detailsLoading, data: detailsData } = useQuery<tvDetails>(
    ["details", `${tvId}`],
    () => getDetails(distStr, tvId)
  );
  const { isLoading: CreditsLoading, data: CreditsData } = useQuery<Credits>(
    ["Credits", `${tvId}`],
    () => indepthDetail(distStr, tvId, 'credits')
  );
  const { isLoading: VideosLoading, data: VideosData } = useQuery<Videos>(
    ["Videos", `${tvId}`],
    () => indepthDetail(distStr, tvId, 'videos')
  );

  return (
    <>
      {detailsLoading ? (
        <LoadingC></LoadingC>
      ) : (
        <MainDetail>
          <Container
            style={{ height: "fit-content" }}
            bgPhoto={`https://image.tmdb.org/t/p/original/${detailsData?.backdrop_path}`}
          ></Container>
          <DetailBlur>
            <TextBox>
              <TitleDiv>
                {`${detailsData?.name} season ${detailsData?.number_of_seasons}`}
                <OverviewSpan style={{ color: "#e3c503" }}>
                  {detailsData?.status}
                </OverviewSpan>
                <OverviewTitle>
                  original title
                  <OverviewSpan>{detailsData?.original_name}</OverviewSpan>
                </OverviewTitle>
              </TitleDiv>
              <TitleDiv></TitleDiv>
              <LinkStyle to={`../images`} state={tvId}>
                <DetailBtn>
                  <p>more Image</p>
                </DetailBtn>
              </LinkStyle>
            </TextBox>
            <WrapperDetail>
              <DetailContainer style={{ width: "fit-content" }}>
                <LargeBox
                  posterbg={`https://image.tmdb.org/t/p/w300/${detailsData?.poster_path}`}
                ></LargeBox>
                <Width10>
                  <OverviewTitle>
                    <OverviewSpan
                      style={{ color: "rgb(24, 199, 191)", marginLeft: "0" }}
                    >
                      number of episodes
                    </OverviewSpan>
                    <OverviewSpan>
                      {detailsData?.number_of_episodes}
                    </OverviewSpan>
                  </OverviewTitle>
                  <OverviewTitle>
                    <OverviewSpan
                      style={{ color: "rgb(24, 199, 191)", marginLeft: "0" }}
                    >
                      first air date
                    </OverviewSpan>
                    <OverviewSpan>{detailsData?.first_air_date}</OverviewSpan>
                  </OverviewTitle>
                  {detailsData?.runtime !== 0 && (
                    <OverviewTitle>
                      <OverviewSpan
                        style={{ color: "rgb(24, 199, 191)", marginLeft: "0" }}
                      >
                        episode run time
                      </OverviewSpan>
                      <OverviewSpan>{`${detailsData?.episode_run_time[0]}min`}</OverviewSpan>
                    </OverviewTitle>
                  )}
                  <OverviewTitle>
                    <OverviewSpan
                      style={{ color: "rgb(24, 199, 191)", marginLeft: "0" }}
                    >
                      genres
                    </OverviewSpan>
                    <OverviewSpan>
                      {`${detailsData?.genres.map(
                        (i) =>
                          i.name +
                          `${
                            detailsData?.genres.indexOf(i) ===
                            detailsData?.genres?.length - 1
                              ? `.`
                              : ``
                          }`
                      )}`}
                    </OverviewSpan>
                  </OverviewTitle>
                  {detailsData?.created_by.length !== 0 && (
                    <OverviewTitle>
                      <OverviewSpan
                        style={{ color: "rgb(24, 199, 191)", marginLeft: "0" }}
                      >
                        created by
                      </OverviewSpan>
                      <OverviewSpan>
                        {detailsData?.created_by[0].name}
                      </OverviewSpan>
                    </OverviewTitle>
                  )}
                  {CreditsData?.crew?.length !== undefined && (
                    <OverviewTitle>
                      <OverviewSpan
                        style={{ color: "rgb(24, 199, 191)", marginLeft: "0" }}
                      >
                        crew
                      </OverviewSpan>
                      {CreditsData?.crew?.slice(0, 3).map((i) => {
                        return (
                          <OverviewSpan key={i.name + i.job}>
                            {i.name}
                            {CreditsData?.crew?.indexOf(i) === 2
                              ? `(${i.job}).`
                              : `(${i.job}),`}
                          </OverviewSpan>
                        );
                      })}
                    </OverviewTitle>
                  )}
                  {detailsData?.production_companies[0] && (
                    <OverviewTitle>
                      <CompanySvgSmall
                        viewBox="0 0 384 512"
                      >
                        <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" />
                      </CompanySvgSmall>
                      <OverviewSpan
                        style={{ color: "rgb(24, 199, 191)", marginLeft: "0" }}
                      >
                        production companies
                      </OverviewSpan>
                      {detailsData?.production_companies
                        ?.slice(0, 4)
                        .map((i) => {
                          return (
                            <OverviewSpan key={i.id}>
                              {i.name}
                              {detailsData?.production_companies?.indexOf(i) ===
                              3
                                ? `.`
                                : `,`}
                            </OverviewSpan>
                          );
                        })}
                    </OverviewTitle>
                  )}
                </Width10>
              </DetailContainer>
              {detailsData?.belongs_to_collection &&
              detailsData?.belongs_to_collection.backdrop_path ? (
                <BackdropPhoto
                  style={{
                    marginTop: window.outerWidth <= 550 ? "0.5rem" : "0",
                    height: "6.6rem",
                    width: "15rem",
                  }}
                  bgPhoto={`https://image.tmdb.org/t/p/original/${detailsData?.belongs_to_collection.backdrop_path}`}
                ></BackdropPhoto>
              ) : (
                detailsData?.backdrop_path && (
                  <BackdropPhoto
                    style={{
                      marginTop: window.outerWidth <= 550 ? "0.5rem" : "0",
                      height: "6.6rem",
                      width: "15rem",
                    }}
                    bgPhoto={`https://image.tmdb.org/t/p/original/${detailsData?.backdrop_path}`}
                  ></BackdropPhoto>
                )
              )}
            </WrapperDetail>
            <TextBox>
              <OverviewTitle>
                <OverviewSpan
                  style={{ color: "rgb(24, 199, 191)", marginLeft: "0" }}
                >
                  overview
                </OverviewSpan>
                <Overview>{detailsData?.overview}</Overview>
              </OverviewTitle>
            </TextBox>
          </DetailBlur>
          {VideosLoading ? (
            <LoadingC></LoadingC>
          ) : (
            VideosData?.results.length !== 0 && (
              <Main>
                <DetailData>
                  <TitleDiv>Videos</TitleDiv>
                  {VideosData?.results.length !== undefined &&
                    VideosData?.results.length > 3 && (
                      <LinkStyle to={`../videos`} state={tvId}>
                        <DetailBtn>
                          <p>more Video</p>
                        </DetailBtn>
                      </LinkStyle>
                    )}
                </DetailData>
                <MainVideo style={{ marginLeft: "10px" }}>
                  {VideosData?.results.slice(0, 3).map((i) => {
                    return (
                      <Wrapper key={i.id}>
                        <YouTube
                          style={{
                            paddingLeft:
                              window.outerWidth <= 550 ? "0" : "20px",
                          }}
                          videoId={i.key}
                          opts={
                            window.outerWidth <= 550 ? smallVideo : largeVideo
                          }
                        />
                      </Wrapper>
                    );
                  })}
                </MainVideo>
              </Main>
            )
          )}
          {CreditsLoading ? (
            <LoadingC></LoadingC>
          ) : (
            CreditsData?.cast?.length !== undefined && (
              <Main>
                <DetailData>
                  <TitleDiv>Casts</TitleDiv>
                  {CreditsData?.cast?.length !== undefined &&
                    CreditsData?.cast.length > 5 && (
                      <LinkStyle to={`../casts`} state={tvId}>
                        <DetailBtn>
                          <p>total cast</p>
                        </DetailBtn>
                      </LinkStyle>
                    )}
                </DetailData>
                <MainVideo style={{ marginLeft: "10px" }}>
                  {CreditsData?.cast?.slice(0, 5).map((i) => {
                    return (
                      <CastBox key={i.id}>
                        {i.profile_path === null ? (
                          <SmallCircle>
                            <FontAwesomeIcon icon={faUser} />
                          </SmallCircle>
                        ) : (
                          <SmallCircle
                            posterbg={`https://image.tmdb.org/t/p/w300/${i.profile_path}`}
                          ></SmallCircle>
                        )}
                        <Overview
                          style={{ textAlign: "center", fontWeight: "700" }}
                        >
                          {i.character}
                        </Overview>
                        <Overview
                          style={{
                            textAlign: "center",
                            fontWeight: "700",
                            color: "gray",
                          }}
                        >
                          {i.name}
                        </Overview>
                      </CastBox>
                    );
                  })}
                </MainVideo>
              </Main>
            )
          )}
        </MainDetail>
      )}
    </>
  );
};
export default TvDetails;
