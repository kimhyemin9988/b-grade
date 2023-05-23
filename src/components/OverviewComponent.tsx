import { BigOverview, movieData } from "../MovieF/Movie";

const OverviewComponent = ({ content, sliceLength }: { content: movieData | undefined, sliceLength: number }) => {
    return (
        <BigOverview>
            {content?.overview.slice(0,
                content?.overview.indexOf(" ", sliceLength)
            )}
            {content && content?.overview.length > sliceLength ? "..." : "."}
            {/* overview 긴것 자름 */}
        </BigOverview>
    )
};

export default OverviewComponent;