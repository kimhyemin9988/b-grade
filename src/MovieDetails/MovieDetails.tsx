import { useQuery } from "react-query";
import { Link, Outlet, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import styled from "styled-components";
import { getCredits, getDetails, getImages, getVideos } from "../api";
import LoadingC from "../miniModule/LoadingC";
import SmallArrowBtn, { ArrowSvgSmall } from "../miniModule/SmallArrowBtn";
import { Blur, Container, opts, OverviewContainer } from "../MovieF/LatestMovies";
import { Box, Main, movieData, Overview, Wrapper, DetailBtn, Title, BigTitle, SliderContainer } from "../MovieF/Movie";
import TotalImages from "./TotalImages";
import { MainVideo, largeVideo, smallVideo } from "./TotalVideos";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { DetailContainer } from "./TvDetails";

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
    }],
    crew: [{
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
  width: 5rem;
  height: 6.6rem;
  font-size: 100%;
  background-image: url(${(props) => props.posterbg});
  background-size: 100% 100%;
    box-shadow: 5px 5px 5px rgb(0 0 0 / 40%);
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
        box-shadow: 5px 5px 5px rgb(0 0 0 / 40%);
`


export const DetailData = styled.div`
    width: fit-content;
    //width: 100%;
    margin: 10px;
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
    @media screen and (max-width: 550px){
        flex-wrap: wrap;
    }
`
export const Width10 = styled.div`
    width: -webkit-fill-available;
    flex-direction: column;
    align-items: center;
    display: flex;
    background-color: ${(props) => props.theme.bodyBgColor};
    box-shadow: 5px 5px 5px rgb(0 0 0 / 40%);
    padding: 0.3rem;

`
export const DetailBlur = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.034);
    backdrop-filter: blur(50px);
    padding: 20px;
    height: 100%;
    @media screen and (max-width: 550px){
        padding: 10px;
    }
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
    color:rgb(24, 199, 191);
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
    width: 2.5rem;
    height: 5.5rem;
    @media screen and (max-width: 550px){
        padding: 0.2rem;
        margin: 0.2rem;
        height: 5rem;
    }
`
export const TitleDiv = styled.div`
    font-size: 0.4rem;
    padding: 5px;
    font-weight:700;
`;
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
        <>
            {
                detailsLoading ? (
                    <LoadingC></LoadingC >
                ) : (
                    <Main style={{ paddingTop: "13vh" }}>
                        <Container style={{ height: "fit-content" }}
                            bgPhoto={`https://image.tmdb.org/t/p/original/${detailsData?.backdrop_path}`}>
                            <DetailBlur>
                                <TextBox>
                                    <TitleDiv>{detailsData?.title}
                                        <OverviewTitle>original title
                                            <OverviewSpan>{detailsData?.original_title}</OverviewSpan>
                                        </OverviewTitle>
                                    </TitleDiv>
                                    <Link to={`../images`} state={movieId}>
                                        <DetailBtn>
                                            <p>more Image +</p>
                                        </DetailBtn>
                                    </Link>
                                </TextBox>
                                <WrapperDetail>
                                    <DetailContainer style={{ width:"fit-content" }}>
                                        <LargeBox posterbg={`https://image.tmdb.org/t/p/w300/${detailsData?.poster_path}`}></LargeBox>
                                        <Width10 style={{ height : "6rem"}}>
                                            <OverviewTitle>release date
                                                <OverviewSpan>{detailsData?.release_date}</OverviewSpan>
                                            </OverviewTitle>
                                            {detailsData?.runtime !== 0 &&
                                                <OverviewTitle>runtime
                                                    <OverviewSpan>{detailsData?.runtime}min</OverviewSpan>
                                                </OverviewTitle>
                                            }
                                            <OverviewTitle>genres
                                                {detailsData?.genres.map((i) => {
                                                    return (
                                                        <OverviewSpan key={i.id}>{i.name}</OverviewSpan>
                                                    );
                                                })}
                                            </OverviewTitle>
                                            {CreditsData?.crew.length !== undefined &&
                                                <OverviewTitle>crew
                                                    {CreditsData?.crew?.slice(0, 3).map((i) => {
                                                        return <OverviewSpan key={i.name + i.job}>{i.name}{
                                                            CreditsData?.crew?.indexOf(i) === 2 ? `(${i.job}).` : `(${i.job}),`}
                                                        </OverviewSpan>
                                                    })}
                                                </OverviewTitle>
                                            }
                                            {detailsData?.production_companies &&
                                                <OverviewTitle>
                                                    <CompanySvgSmall xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" /></CompanySvgSmall>
                                                    production companies
                                                    {detailsData?.production_companies?.map((i) => {
                                                        return <OverviewSpan key={i.id}>{i.name}{
                                                            detailsData?.production_companies?.indexOf(i) === detailsData?.production_companies?.length - 1 ? `.` : `,`}</OverviewSpan>

                                                    })}
                                                </OverviewTitle>
                                            }
                                        </Width10>
                                    </DetailContainer>
                                    {detailsData?.belongs_to_collection && detailsData?.belongs_to_collection.backdrop_path ? <BackdropPhoto style={{ marginTop: window.outerWidth <= 550 ? "0.5rem" : "0", height:"6.6rem", width:"20rem" }} bgPhoto={`https://image.tmdb.org/t/p/original/${detailsData?.belongs_to_collection.backdrop_path}`}></BackdropPhoto> :
                                        (detailsData?.backdrop_path && <BackdropPhoto style={{ marginTop: window.outerWidth <= 550 ? "0.5rem" : "0", height:"6.6rem",width:"20rem" }} bgPhoto={`https://image.tmdb.org/t/p/original/${detailsData?.backdrop_path}`}></BackdropPhoto>)
                                    }
                                </WrapperDetail>
                                <TextBox>
                                    <OverviewTitle>overview
                                        <Overview>{detailsData?.overview}</Overview>
                                    </OverviewTitle>
                                </TextBox>
                            </DetailBlur>
                        </Container>
                        {VideosLoading ? <LoadingC></LoadingC > :
                            VideosData?.results.length !== 0 &&
                            (<Main>
                                <DetailData>video
                                    {VideosData?.results.length !== undefined && VideosData?.results.length > 3 &&
                                        <Link to={`../videos`} state={movieId}>
                                            <DetailBtn>
                                                <p>more +</p>
                                            </DetailBtn>
                                        </Link>
                                    }
                                </DetailData>
                                <MainVideo style={{ marginLeft : "10px" }}>
                                    {VideosData?.results.slice(0, 3).map((i) => {
                                        return (
                                            <Wrapper key={i.id}>
                                                <YouTube style={{ paddingLeft: window.outerWidth <= 550 ? "0" : "20px" }} videoId={i.key} opts={window.outerWidth <= 550 ? smallVideo : largeVideo} />
                                            </Wrapper>
                                        );
                                    })}
                                </MainVideo>
                            </Main>)
                        }
                        {CreditsLoading ? <LoadingC></LoadingC > :
                            CreditsData?.cast.length !== undefined &&
                            (<Main>
                                <DetailData>cast
                                    {CreditsData?.cast.length !== undefined && CreditsData?.cast.length > 5 &&
                                        <Link to={`../casts`} state={movieId}>
                                            <DetailBtn>
                                                <p>total casts</p>
                                            </DetailBtn>
                                        </Link>
                                    }
                                </DetailData>
                                <MainVideo style={{ marginLeft : "10px" }}>
                                    {CreditsData?.cast?.slice(0, 5).map((i) => {
                                        return (
                                            <CastBox key={i.id}>
                                                {i.profile_path === null ? (
                                                    <SmallCircle>
                                                        <FontAwesomeIcon icon={faUser} />
                                                    </SmallCircle>
                                                ) : (
                                                    <SmallCircle posterbg={`https://image.tmdb.org/t/p/w300/${i.profile_path}`}></SmallCircle>
                                                )

                                                }
                                                <Overview style={{ textAlign: "center", fontWeight: "700" }}>{i.character}</Overview>
                                                <Overview style={{ textAlign: "center", fontWeight: "700", color: "gray" }}>{i.name}</Overview>
                                            </CastBox>);
                                    })}
                                </MainVideo>
                            </Main>)
                        }
                    </Main >
                )}
        </>
    );
};
export default MovieDetails;
