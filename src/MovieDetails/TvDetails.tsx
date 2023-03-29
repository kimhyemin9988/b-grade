import { useQuery } from "react-query";
import { Link, Outlet, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import styled from "styled-components";
import { getCredits, getDetails, getImages, getVideos } from "../api";
import LoadingC from "../miniModule/LoadingC";
import { ArrowSvgSmall } from "../miniModule/SmallArrowBtn";
import { Blur, Container, opts, OverviewContainer } from "../MovieF/LatestMovies";
import { Box, Main, movieData, Overview, Wrapper, DetailBtn, Title, BigTitle, SliderContainer } from "../MovieF/Movie";
import TotalImages from "./TotalImages";
import { MainVideo, optsMin } from "./TotalVideos";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BackdropPhoto, CastBox, CompanySvgSmall, Credits, DetailBlur, DetailData, LargeBox, OverviewSpan, OverviewTitle, SmallCircle, TextBox, Videos, Width10, WrapperDetail } from "./MovieDetails";

export interface tvDetails {
    adult: boolean;
    backdrop_path: string;
    created_by: [
        {
            name: string;
        }
    ] | [],
    episode_run_time: [
        {
            0: number;
        }
    ]
    belongs_to_collection: {
        backdrop_path: string;
        id: number;
        name: string;
        poster_path: string;
    }
    id: number;
    name: string;
    genres: [
        {
            id: number;
            name: string;
        }]
    original_language: string;
    original_name: string;
    production_companies: [
        {
            id?: number;
            name: string;
            original_country?: string;
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
    ],
    status: string;
};

const TvDetails = () => {
    const params = useParams();
    const tvId = params.tvId;
    const distStr = Object.keys(params)[0].slice(0, -2);

    const { isLoading: detailsLoading, data: detailsData } = useQuery<tvDetails>(["details", `${tvId}`], () => getDetails(distStr, tvId));
    const { isLoading: CreditsLoading, data: CreditsData } = useQuery<Credits>(["Credits", `${tvId}`], () => getCredits(distStr, tvId));
    const { isLoading: VideosLoading, data: VideosData } = useQuery<Videos>(["Videos", `${tvId}`], () => getVideos(distStr, tvId));
    //<Title>Original title : {data?.[0].original_title}</Title> (오리지널 타이틀)
    //console.log(data); ->출시일
    //console.log(CreditsData); -> 배우 1명
    // 배우, 출시일, 트레일러, 사진
    //                    <Overview>{detailsData?.genres.name}</Overview>
    return (
        <Main style={{ paddingTop: "13vh" }}>
            {detailsLoading ? (
                <LoadingC></LoadingC >
            ) : (
                <>
                    <Container style={{ height: "fit-content" }}
                        bgPhoto={`https://image.tmdb.org/t/p/original/${detailsData?.backdrop_path}`}>
                        <DetailBlur>
                            <TextBox>
                                <BigTitle>{`${detailsData?.name} season ${detailsData?.number_of_seasons}`}
                                    <OverviewSpan style={{ color: "yellow" }}>{detailsData?.status}</OverviewSpan>
                                    <OverviewTitle>original title
                                        <OverviewSpan>{detailsData?.original_name}</OverviewSpan>
                                    </OverviewTitle>
                                </BigTitle>
                                <Link to={`../images`} state={tvId}>
                                    <DetailBtn>more Image +</DetailBtn>
                                </Link>
                            </TextBox>
                            <WrapperDetail>
                                <LargeBox posterbg={`https://image.tmdb.org/t/p/w300/${detailsData?.poster_path}`}></LargeBox>
                                <TextBox style={{ margin: "0 0.3rem", borderRadius: 0 }}>
                                    <Width10>
                                        <OverviewTitle>number of episodes
                                            <OverviewSpan>{detailsData?.number_of_episodes}</OverviewSpan>
                                        </OverviewTitle>
                                        <OverviewTitle>first air date
                                            <OverviewSpan>{detailsData?.first_air_date}</OverviewSpan>
                                        </OverviewTitle>
                                        {detailsData?.runtime !== 0 &&
                                            <>
                                                <OverviewTitle>episode run time
                                                    <OverviewSpan>{`${detailsData?.episode_run_time[0]}min`}</OverviewSpan>
                                                </OverviewTitle>
                                            </>
                                        }
                                        <DetailData>
                                            <OverviewTitle>genres
                                                {detailsData?.genres.map((i) => {
                                                    return (
                                                        <OverviewSpan key={i.id}>{i.name}</OverviewSpan>
                                                    );
                                                })}
                                            </OverviewTitle>
                                        </DetailData>
                                        {detailsData?.created_by.length === 0 ? null :
                                            <DetailData>
                                                <OverviewTitle>created by
                                                    <OverviewSpan>{detailsData?.created_by[0].name}</OverviewSpan>
                                                </OverviewTitle>
                                            </DetailData>
                                        }
                                        <DetailData>
                                            <OverviewTitle>crew
                                                {CreditsData?.crew?.slice(0, 3).map((i) => {
                                                    return CreditsData?.crew?.indexOf(i) === 2 ? <OverviewSpan key={i.name + i.job}>{i.name} {`(${i.job}).`}
                                                    </OverviewSpan> : <OverviewSpan key={i.name + i.job}>{i.name} {`(${i.job}),`}
                                                    </OverviewSpan>;
                                                })}
                                            </OverviewTitle>
                                        </DetailData>
                                        {detailsData?.production_companies &&
                                            <DetailData>
                                                <OverviewTitle>
                                                    <CompanySvgSmall xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" /></CompanySvgSmall>
                                                    production companies
                                                    {detailsData?.production_companies.map((i) => {
                                                        return detailsData?.production_companies.indexOf(i) === detailsData?.production_companies.length - 1 ? <OverviewSpan key={i.id}>{i.name}.</OverviewSpan> : <OverviewSpan key={i.id}>{i.name},</OverviewSpan>;
                                                    })}
                                                </OverviewTitle>
                                            </DetailData>
                                        }
                                    </Width10>
                                </TextBox>
                                {detailsData?.belongs_to_collection && detailsData?.belongs_to_collection.backdrop_path ? <BackdropPhoto bgPhoto={`https://image.tmdb.org/t/p/original/${detailsData?.belongs_to_collection.backdrop_path}`}></BackdropPhoto> :
                                    (detailsData?.backdrop_path && <BackdropPhoto bgPhoto={`https://image.tmdb.org/t/p/original/${detailsData?.backdrop_path}`}></BackdropPhoto>)
                                }
                            </WrapperDetail>
                            <TextBox>
                                <OverviewTitle>overview
                                    <Overview>{detailsData?.overview}</Overview>
                                </OverviewTitle>
                            </TextBox>
                        </DetailBlur>
                    </Container>
                    {
                        VideosLoading ? <LoadingC></LoadingC > :
                            VideosData?.results.length !== 0 &&
                            (<Main style={{ padding: "20px", margin: "0" }}>
                                <DetailData>video
                                    {VideosData?.results.length !== undefined && VideosData?.results.length > 3 &&
                                        <Link to={`../videos`} state={tvId}>
                                            <DetailBtn>more +</DetailBtn>
                                        </Link>
                                    }
                                </DetailData>
                                <MainVideo style={{ margin: "0" }}>
                                    {VideosData?.results.slice(0, 3).map((i) => {
                                        return (
                                            <Wrapper key={i.id}>
                                                <YouTube style={{ paddingLeft: "20px" }} videoId={i.key} opts={optsMin} />
                                            </Wrapper>
                                        );
                                    })}
                                </MainVideo>
                            </Main>)
                    }
                    {CreditsLoading ? <LoadingC></LoadingC > :
                        CreditsData?.cast.length !== 0 &&
                        (<Main style={{ padding: "20px" }}>
                            <DetailData>cast
                                {CreditsData?.cast.length !== undefined && CreditsData?.cast.length > 5 &&
                                    <Link to={`../casts`} state={tvId}>
                                        <DetailBtn>total casts</DetailBtn>
                                    </Link>
                                }
                            </DetailData>
                            <MainVideo>
                                {CreditsData?.cast.slice(0, 5).map((i) => {
                                    return (
                                        <CastBox key={i.id}>
                                            {i.profile_path === null ? (
                                                <SmallCircle>
                                                    <FontAwesomeIcon icon={faUser} />
                                                </SmallCircle>
                                            ) : (
                                                <SmallCircle posterbg={`https://image.tmdb.org/t/p/w200/${i.profile_path}`}></SmallCircle>
                                            )

                                            }
                                            <Overview style={{ textAlign: "center" }}>{i.character}</Overview>
                                            <Overview style={{ textAlign: "center" }}>{i.name}</Overview>
                                        </CastBox>);
                                })}
                            </MainVideo>
                        </Main>)
                    }
                </>
            )
            }
        </Main >
    );
};
export default TvDetails;
