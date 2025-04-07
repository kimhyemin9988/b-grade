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
    
    const preloadImage = new Image();
    const screenSize = window.innerWidth;
    const imgSize = screenSize < 550 ? "w780" : "w1280";
    preloadImage.src = `https://image.tmdb.org/t/p/${imgSize}/${content?.backdrop_path}`;

    return (
        <>
            <BigCover bgPhoto={preloadImage.src} />
            <BigTitle>
                {content?.title ? content?.title : content?.name}
            </BigTitle>
            <BtnDetail dataType={dataType} contentId={content?.id}></BtnDetail>
            <OverviewComponent content={content} sliceLength={300}></OverviewComponent>
        </>
    )
};

export default InsideModal;