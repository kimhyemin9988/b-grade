import styled from "styled-components";
import { BigCover, movieData } from "../MovieF/Movie";
import BtnDetail from "./BtnDetail";
import OverviewComponent from "./OverviewComponent";

export const BigTitle = styled.p`
  font-size: 0.4rem;
  padding: 5px;
  font-weight: 700;
`;

const InsideModal = ({ content, dataType }: { content?: movieData, dataType?: string }) => {
    return (
        <>
            <BigCover bgPhoto={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`} />
            <BigTitle>
                {content?.title ? content?.title : content?.name}
            </BigTitle>
            <BtnDetail dataType={dataType} contentId={content?.id}></BtnDetail>
            <OverviewComponent content={content} sliceLength={300}></OverviewComponent>
        </>
    )
};

export default InsideModal;