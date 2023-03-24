import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import { getVideos } from "../api";
import LoadingC from "../miniModule/LoadingC";
import { opts } from "../MovieF/LatestMovies";
import { Wrapper } from "../MovieF/Movie";
import { Videos } from "./MovieDetails";

const TotalVideos = () => {
    const { state: movieId } = useLocation();
    const { isLoading: VideosLoading, data: VideosData } = useQuery<Videos>(["Videos", `${movieId}`], () => getVideos(movieId));
    return (
        <>
            {VideosLoading ? <LoadingC></LoadingC> :
                <>
                    {VideosData?.results.map((i) => {
                        return (
                            <Wrapper key={i.id}>
                                <YouTube style={{ height: "300px", paddingLeft: "20px" }} videoId={i.key} opts={opts} />
                            </Wrapper>
                        );
                    }
                    )}
                </>
            }
        </>
    );
};
export default TotalVideos;