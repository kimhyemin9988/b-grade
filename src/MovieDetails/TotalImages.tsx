import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getImages } from "../api";
import LoadingC from "../miniModule/LoadingC";
import { Box, Main, Title } from "../MovieF/Movie";
import { BackdropPhoto } from "./MovieDetails";
import { MainVideo } from "./TotalVideos";

export interface Images {
    backdrops: [{
        file_path: string;
    }],
    logos: [{
        file_path: string;
    }],
    posters: [{
        file_path: string;
    }],

}
const TotalImages = () => {
    const { state, pathname } = useLocation();
    const distStr = pathname.split('/')[1]; // movie of tv
    const { isLoading: getImagesLoading, data: getImagesData } = useQuery<Images>(["getImages", `${state}`], () => getImages(distStr, state));
    return (
        <Main style={{ paddingTop: "13vh" }}>
            <Title style={{ paddingLeft: "20px" }}>images</Title>
            {getImagesLoading ? <LoadingC></LoadingC> :
                <MainVideo>
                    {getImagesData?.backdrops.map((i) => {
                        return (
                            <BackdropPhoto style={{ width: "7rem", height: "4rem" }} bgPhoto={`https://image.tmdb.org/t/p/original/${i.file_path}`} key={getImagesData?.backdrops.indexOf(i)}></BackdropPhoto>
                        );
                    })
                    }
                </MainVideo>
            }
        </Main>
    );
};
export default TotalImages;