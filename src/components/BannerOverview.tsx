import styled from "styled-components";
import { Overview, Title } from "../MovieF/Movie";
import BtnDetail from "./BtnDetail";

export const Banner = styled.div<{ bgPhoto: string | undefined }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8%;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0) 20%,
      ${(props) => props.theme.bodyBgColor}
    ),
    url(${(props) => props.bgPhoto});
  background-size: 100% 100%;
  height: 75vh;
  margin-top: 13vh;
  font-weight: 600;
  @media screen and (max-width: 550px) {
    margin-top: 8vh;
    height: 33vh;
  }
`;

const BannerOverview = ({ content, sliceLength, dataType }: { content: { overview: string, title?: string, id: number, backdrop_path: string, name?: string } | undefined, sliceLength: number, dataType: string | undefined }) => {
    return (
        <Banner
            bgPhoto={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`}>
            <Title>{content?.title === undefined ? content?.name : content?.title}</Title>
            <Overview>
                {content?.overview.slice(0,
                    content?.overview.indexOf(" ", sliceLength)
                )}
                {content && content?.overview.length > sliceLength ? "..." : "."}
            </Overview>
            <BtnDetail dataType={dataType} contentId={content?.id}></BtnDetail>
        </Banner>
    )
};

export default BannerOverview;


