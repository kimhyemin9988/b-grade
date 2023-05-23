import { Overview, movieData } from "../MovieF/Movie";
import { LatestShowsData } from "../Tv/LatestTopShows";

const BannerOverview = ({ content, sliceLength }: { content: { overview: string } | undefined, sliceLength: number }) => {
    return (
        <Overview>
            {content?.overview.slice(0,
                content?.overview.indexOf(" ", sliceLength)
            )}
            {content && content?.overview.length > sliceLength ? "..." : "."}
        </Overview>
    )
};

export default BannerOverview;