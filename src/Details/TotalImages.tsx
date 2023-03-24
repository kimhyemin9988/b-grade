import { useQuery } from "react-query";
import { getImages } from "../api";
import { Box } from "../MovieF/Movie";

export interface Images {
    backdrops: [{
        file_path: string;
    }],

}
const TotalImages = () => {
    const { isLoading: getImagesLoading, data: getImagesData } = useQuery<Images>(["getImages", `${movieId}`], () => getImages(movieId));
    return (
        <>
            {getImagesData?.backdrops.map((i) => {
                return (
                    <Box posterbg={`https://image.tmdb.org/t/p/original/${i.file_path}`} key={getImagesData?.backdrops.indexOf(i)}></Box>
                );
            }
            )}
        </>
    );
};
export default TotalImages;