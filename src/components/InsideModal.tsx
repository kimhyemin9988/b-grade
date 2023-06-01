import { BigCover, BigTitle, movieData } from "../MovieF/Movie";
import { MoviesProps } from "./WebSliderC";
import BtnDetail from "./BtnDetail";
import OverviewComponent from "./OverviewComponent";

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