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

/* interface detailI {

}
<detailI[]>

interface detailId{
    id : string;
}*/

export interface details {
    adult: boolean;
    backdrop_path: string;
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
    original_title: string;
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
    release_date: string;
    runtime: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    key: string;
};

export interface Credits {
    id: string;
    cast: [{
        character: string;
        name: string;
        profile_path: string;
        id: string;
    }] | [],
    crew?: [{
        job: string;
        name: string;
        id: string;
    }],
};
export interface Videos {
    id: string;
    results: [
        {
            iso_639_1: string;
            iso_3166_1: string;
            name: string; // video 이름
            key: string; // 비디오 api로 불러올 수 있음
            size: number;
            type: string;
            official: true;
            published_at: string;
            id: string;
        }
    ] | [];
}

export const LargeBox = styled.div <{ posterbg: string | undefined }>`
  width: 4rem;
  height: 6rem;
  font-size: 100%;
  background-image: url(${(props) => props.posterbg});
  background-size: 100% 100%;
`;

export const SmallCircle = styled.div <{ posterbg?: string | undefined }>`
  width: 2rem;
  height: 3rem;
  background-image: url(${(props) => props.posterbg});
  background-size: 100% 100%;
  border-radius: 50%;
    border: 1px solid ${(props) => props.theme.bodyFtColor};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const BackdropPhoto = styled.section<{ bgPhoto?: string | undefined }>`
    width: 10rem;
    height: 6rem;
    background-image: url(${(props) => props.bgPhoto});
    background-size: 100% 100%;
`


export const DetailData = styled.div`
    width: 100%;
    margin: 0.1rem;
    display: flex;
    align-items: center;
`

export const CompanySvgSmall = styled.svg`
    height: 0.3rem;
    width: 0.3rem;
    fill: ${(props) => props.theme.bodyFtColor};
`
export const WrapperDetail = styled.div`
    display: flex;
    margin: 0.5rem 0 0.5rem 0;
`
export const Width10 = styled.div`
    width: 6rem;
    flex-direction: column;
    align-items: center;
    display: flex;
`
export const DetailBlur = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.034);
    backdrop-filter: blur(50px);
    padding: 20px;
    height: 100%;
`
export const TextBox = styled.div`
    background-color: ${(props) => props.theme.bodyBgColor};
    border-radius: 0.4rem;
    box-shadow: 5px 5px 5px rgb(0 0 0 / 40%);
    padding: 0.3rem;
    display: flex;
    justify-content: space-between;
`
export const OverviewTitle = styled.div`
    color:rgb(131, 255, 249);
  font-size: 0.3rem;
  width: 100%;
  @media screen and (max-width: 550px){
    font-size: 10%;
    }
`

export const OverviewSpan = styled.span`
    margin-left: 0.1rem;
    color: ${(props) => props.theme.bodyFtColor};
  font-size: 0.3rem;
  width: 100%;
  @media screen and (max-width: 550px){
    font-size: 10%;
    }
`;

export const CastBox = styled.div`
    padding: 0.3rem;
    margin: 0.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const MovieDetails = () => {
    const params = useParams();
    const movieId = params.movieId;
    const distStr = Object.keys(params)[0].slice(0, -2);
    //console.log(distStr);
    const { isLoading: detailsLoading, data: detailsData } = useQuery<details>(["details", `${movieId}`], () => getDetails(distStr, movieId));
    const { isLoading: CreditsLoading, data: CreditsData } = useQuery<Credits>(["Credits", `${movieId}`], () => getCredits(distStr, movieId));
    const { isLoading: VideosLoading, data: VideosData } = useQuery<Videos>(["Videos", `${movieId}`], () => getVideos(distStr, movieId));
    //<Title>Original title : {data?.[0].original_title}</Title> (오리지널 타이틀)
    //console.log( getImagesData);
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
                                <BigTitle>{detailsData?.title}
                                    <OverviewTitle>original title
                                        <OverviewSpan>{detailsData?.original_title}</OverviewSpan>
                                    </OverviewTitle>
                                </BigTitle>
                                <Link to={`../images`} state={movieId}>
                                    <DetailBtn>more Image +</DetailBtn>
                                </Link>
                            </TextBox>
                            <WrapperDetail>
                                <LargeBox posterbg={`https://image.tmdb.org/t/p/w300/${detailsData?.poster_path}`}></LargeBox>
                                <TextBox style={{ margin: "0 0.3rem", borderRadius: 0 }}>
                                    <Width10>
                                        <OverviewTitle>release date
                                            <OverviewSpan>{detailsData?.release_date}</OverviewSpan>
                                        </OverviewTitle>
                                        {detailsData?.runtime !== 0 &&
                                            <>
                                                <OverviewTitle>runtime
                                                    <OverviewSpan>{detailsData?.runtime}min</OverviewSpan>
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
                                        {CreditsData?.cast.length !== 0 &&
                                            <DetailData>
                                                <OverviewTitle>crew
                                                    {CreditsData?.crew?.slice(0, 3).map((i) => {
                                                        return CreditsData?.crew?.indexOf(i) === 2 ? <OverviewSpan key={i.name + i.job}>{i.name} {`(${i.job}).`}
                                                        </OverviewSpan> : <OverviewSpan key={i.name + i.job}>{i.name} {`(${i.job}),`}
                                                        </OverviewSpan>
                                                    })}
                                                </OverviewTitle>
                                            </DetailData>
                                        }
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
                                        <Link to={`../videos`} state={movieId}>
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
                                    <Link to={`../casts`} state={movieId}>
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
export default MovieDetails;
