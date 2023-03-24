import { useQuery } from "react-query";
import { Link, Outlet, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { getCredits, getDetails, getImages, getVideos } from "../api";
import LoadingC from "../miniModule/LoadingC";
import { Container, opts } from "../MovieF/LatestMovies";
import { Box, Main, movieData, Overview, Wrapper, DetailBtn } from "../MovieF/Movie";
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
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: [{
        id: number;
        name: string;
        original_country: string;
    }]
    release_date: string;
    runtime: string;
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
        <>
            {detailsLoading ? (
                <LoadingC></LoadingC >
            ) : (
                <>
                    <Main>
                        <>
                            <Box style={{ margin: "0" }} posterbg={`https://image.tmdb.org/t/p/w200/${detailsData?.poster_path}`}></Box>
                            <Overview>{detailsData?.title}</Overview>
                            {detailsData?.belongs_to_collection && <Container bgPhoto={`https://image.tmdb.org/t/p/original/${detailsData?.belongs_to_collection.backdrop_path}`}></Container>}
                            {detailsData?.runtime &&
                                <Overview>runtime : {detailsData?.runtime}</Overview>
                            }
                            <Link to={`/${movieId}/images`} state={movieId}>
                                <DetailBtn>more images</DetailBtn>
                            </Link>
                            genres :
                            {detailsData?.genres.map((i) => {
                                return (
                                    <Overview key={i.id}>{i.name}</Overview>
                                );
                            })}
                            <Overview>original_title : {detailsData?.original_title}</Overview>
                            <Overview>overview : {detailsData?.overview}</Overview>
                            <Overview>popularity : {detailsData?.popularity}</Overview>
                            <Overview>release_date : {detailsData?.release_date}</Overview>
                            production_companies : {detailsData?.production_companies.map((i) => {
                                return (
                                    <Overview key={i.id}>{i.name}</Overview>
                                );
                            })}
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
                                        <p>crew</p>
                                        {CreditsData?.crew.slice(0, 3).map((i) => {
                                            return (
                                                <Overview style={{ margin: "0" }} key={i.id}>{i.name},{i.job}
                                                </Overview>
                                            );
                                        })}
                                    </Main>
                                    {
                                        VideosLoading ? <LoadingC></LoadingC > :
                                            VideosData?.results !== undefined &&
                                            <Main>
                                                <p>video</p>
                                                <Link to={`/${movieId}/videos`} state={movieId}>
                                                    <DetailBtn>more videos</DetailBtn>
                                                </Link>
                                            </Main>
                                    }
                                </>
                            }
                        </>
                    </Main>
                </>
            )
            }

        </>
    );
};
export default MovieDetails;
