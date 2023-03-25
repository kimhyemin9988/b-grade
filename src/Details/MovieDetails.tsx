import { useQuery } from "react-query";
import { Link, Outlet, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import styled from "styled-components";
import { getCredits, getDetails, getImages, getVideos } from "../api";
import LoadingC from "../miniModule/LoadingC";
import { ArrowSvgSmall } from "../miniModule/SmallArrowBtn";
import { Blur, Container, opts, OverviewContainer } from "../MovieF/LatestMovies";
import { Box, Main, movieData, Overview, Wrapper, DetailBtn, Title, BigTitle } from "../MovieF/Movie";
import TotalImages from "./TotalImages";

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
}

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
    ]
}

const LargeBox = styled.div <{ posterbg: string | undefined }>`
  width: 4rem;
  height: 6rem;
  font-size: 100%;
  background-image: url(${(props) => props.posterbg});
  background-size: 100% 100%;
`;


export const BackdropPhoto = styled.section<{ bgPhoto: string | undefined }>`
    width: 10rem;
    height: 6rem;
    background-image: url(${(props) => props.bgPhoto});
    background-size: 100% 100%;
`


export const DetailData = styled.div`
    width: 100%;
    height: 1rem;
    margin: 0.1rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const CompanySvgSmall = styled.svg`
    height: 200ps;
    width: 300px;
    fill: ${(props) => props.theme.bodyFtColor};
`
const WrapperDetail = styled.div`
    display: flex;
`
const Width10 = styled.div`
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
`
export const TextBox = styled.div`
    background-color: ${(props) => props.theme.bodyBgColor};
    border-radius: 0.4rem;
    box-shadow: 5px 5px 5px rgb(0 0 0 / 40%);
    margin-top: 1rem;
    padding: 1rem;
`
const MovieDetails = () => {
    const params = useParams();
    const movieId = params.movieId;
    const { isLoading: detailsLoading, data: detailsData } = useQuery<details>(["details", `${movieId}`], () => getDetails(movieId));
    const { isLoading: CreditsLoading, data: CreditsData } = useQuery<Credits>(["Credits", `${movieId}`], () => getCredits(movieId));
    const { isLoading: VideosLoading, data: VideosData } = useQuery<Videos>(["Videos", `${movieId}`], () => getVideos(movieId));
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
                    <Container
                        bgPhoto={`https://image.tmdb.org/t/p/original/${detailsData?.backdrop_path}`}>
                        <DetailBlur>
                            <TextBox>
                                <BigTitle>{detailsData?.title}
                                    <Overview>original title : {detailsData?.original_title}</Overview>
                                </BigTitle>
                            </TextBox>
                            <WrapperDetail style={{ paddingLeft: "20px" }}>
                                <LargeBox posterbg={`https://image.tmdb.org/t/p/w300/${detailsData?.poster_path}`}></LargeBox>
                                <TextBox>
                                    <Width10>
                                        <Overview>release_date : {detailsData?.release_date}</Overview>
                                        {detailsData?.runtime !== 0 &&
                                            <Overview>runtime : {detailsData?.runtime}min</Overview>
                                        }
                                        <DetailData>
                                            <Overview>genres :</Overview>
                                            {detailsData?.genres.map((i) => {
                                                return (
                                                    <Overview key={i.id}>{i.name}</Overview>
                                                );
                                            })}
                                        </DetailData>
                                        <DetailData>
                                            <Overview>crew :</Overview>
                                            {CreditsData?.crew.slice(0, 3).map((i) => {
                                                return (
                                                    <Overview style={{ margin: "0" }} key={i.id}>{i.name},{i.job}
                                                    </Overview>
                                                );
                                            })}
                                        </DetailData>
                                        {detailsData?.production_companies &&
                                            <DetailData>
                                                <CompanySvgSmall xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" /></CompanySvgSmall>
                                                <Overview>production companies</Overview>
                                                {detailsData?.production_companies.map((i) => {
                                                    return (
                                                        <Overview>{i.name}</Overview>
                                                    );
                                                })}
                                            </DetailData>
                                        }
                                    </Width10>
                                </TextBox>
                                {detailsData?.belongs_to_collection && <BackdropPhoto bgPhoto={`https://image.tmdb.org/t/p/original/${detailsData?.belongs_to_collection.backdrop_path}`}></BackdropPhoto>}
                            </WrapperDetail>
                            <TextBox>
                                <Overview>overview : {detailsData?.overview}</Overview>
                            </TextBox>
                        </DetailBlur>
                    </Container>
                    {CreditsLoading ? <LoadingC></LoadingC > :
                        <>
                            <Main>
                                <p>cast</p>
                                <Link to={`/${movieId}/casts`} state={movieId}>
                                    <DetailBtn>more casts</DetailBtn>
                                </Link>
                                {CreditsData?.cast.slice(0, 3).map((i) => {
                                    return (
                                        <div key={i.id}>
                                            <Box style={{ margin: "0" }} posterbg={`https://image.tmdb.org/t/p/w200/${i.profile_path}`}></Box>
                                            <Overview>{i.character}</Overview>
                                            <Overview>{i.name}</Overview>
                                        </div>);
                                })}
                            </Main>
                            <Main>
                                <p>Image</p>
                                <Link to={`/${movieId}/images`} state={movieId}>
                                    <DetailBtn>more +</DetailBtn>
                                </Link>
                            </Main>
                            {
                                VideosLoading ? <LoadingC></LoadingC > :
                                    VideosData?.results !== undefined &&
                                    <Main>
                                        <p>video</p>
                                        <Link to={`/${movieId}/videos`} state={movieId}>
                                            <DetailBtn>more +</DetailBtn>
                                        </Link>
                                    </Main>
                            }
                        </>
                    }
                </>
            )
            }
        </Main>
    );
};
export default MovieDetails;

/*
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
// 사진 없으면 이 아이콘 센터에

*/
/*
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>

*/