import styled from "styled-components";
import { movieData } from "../MovieF/Movie";

export const BigOverview = styled.p`
  font-size: 0.3rem;
  position: relative;
  color: ${(props) => props.theme.bodyFtColor};
  padding: 5px;
`;

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