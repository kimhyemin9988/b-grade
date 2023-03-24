import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { getCredits } from "../api";
import { Box, DetailBtn, Overview } from "../MovieF/Movie";
import { Credits } from "./MovieDetails";

const TotalCasts = () => {
    const { state: movieId } = useLocation();
    const { isLoading: CreditsLoading, data: CreditsData } = useQuery<Credits>(["Credits", `${movieId}`], () => getCredits(movieId));
    return (
        <>
            <p>cast</p>
            {CreditsData?.cast.slice(0, 3).map((i) => {
                return (
                    <div key={i.id}>
                        <Box style={{ margin: "0" }} posterbg={`https://image.tmdb.org/t/p/w200/${i.profile_path}`}></Box>
                        <Overview>{i.character}</Overview>
                        <Overview>{i.name}</Overview>
                    </div>);
            })}
        </>
    );
};
export default TotalCasts;