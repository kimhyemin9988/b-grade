import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { SearchData } from "../api";
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import {
  BigCover,
  BigOverview,
  BigTitle,
  Box,
  BoxModal,
  boxVariants,
  Info,
  infoVariants,
  Main,
  movieData,
  overlay,
  Overlay,
  RatingContainer,
  RatingSpan,
  Wrapper,
} from "../MovieF/Movie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingC from "../miniModule/LoadingC";
import { ErrorMain } from "../NotFound";
import SmallArrowBtn from "../miniModule/SmallArrowBtn";
import { MainDetail } from "../MovieTvDetails/MovieDetails";

const Search = () => {
  const [id, setId] = useState<null | string>(null);
  const [content, setContent] = useState<movieData>();
  const navigate = useNavigate();

  /* 무한 스크롤 */
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const [page, setPage] = useState(1);
  const { isLoading, data } = useQuery<movieData[]>(
    ["Search", `${keyword}=${page}`],
    () => SearchData(keyword, page),
    { keepPreviousData: true }
  );

  const [keepData, setkeepData] = useState<movieData[]>([]);

  useEffect(() => {
    if (data) {
      let movieArray: movieData[] = data;
      keepData.map((i) => {
        // 중복제거
        return (movieArray = movieArray.filter((k) => k.id !== i.id));
      });
      setkeepData((prev) => (prev = [...prev, ...movieArray]));
    }
  }, [data]);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (
      latest + window.innerHeight >
      document.documentElement.offsetHeight - 10
    ) {
      setPage((prev) => (prev = prev + 1));
    }
  });

  return (
    <>
      {isLoading ? (
        <LoadingC></LoadingC>
      ) : (
        <>
          {page === 1 && data?.length === 0 ? (
            <ErrorMain>
              <span>검색 결과가 없습니다.</span>
              <br />
              <span>다른 용어로 검색해주세요.</span>
            </ErrorMain>
          ) : (
            <MainDetail>
              <Wrapper style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <RatingContainer>
                  <RatingSpan>Search Results : {keepData?.length}</RatingSpan>
                </RatingContainer>
                {keepData?.map((i) => (
                  <Box
                    key={i.id}
                    posterbg={`https://image.tmdb.org/t/p/w400/${i.poster_path}`}
                    whileHover="hover"
                    initial="normal"
                    variants={boxVariants}
                    transition={{ type: "tween" }}
                    onClick={() => {
                      setId(`${i.id}`);
                      setContent(i);
                    }}
                    layoutId={`${i.id}`}
                  >
                    <Info variants={infoVariants} key={i.id}>
                      <p>
                        {Object.keys(i).includes("title") === true
                          ? i.title
                          : i.name}
                      </p>
                    </Info>
                  </Box>
                ))}
                {isLoading && <LoadingC></LoadingC>}
              </Wrapper>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <AnimatePresence>
                  {id ? (
                    <>
                      <Overlay
                        variants={overlay}
                        onClick={() => {
                          setId(null);
                          navigate(`?keyword=${keyword}`);
                        }}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      ></Overlay>
                      <BoxModal layoutId={id}>
                        <BigCover
                          bgPhoto={`https://image.tmdb.org/t/p/original/${content?.backdrop_path}`}
                        />
                        <BigTitle>
                          {content?.title ? content?.title : content?.name}
                        </BigTitle>
                        <Link
                          to={`../${content?.media_type}/${content?.id}/details`}
                        >
                          <SmallArrowBtn></SmallArrowBtn>
                        </Link>
                        <BigOverview>
                          {content?.overview.slice(
                            0,
                            content?.overview.indexOf(" ", 350)
                          )}
                          {content && content?.overview.length > 350
                            ? "..."
                            : "."}
                        </BigOverview>
                      </BoxModal>
                    </>
                  ) : null}
                </AnimatePresence>
              </div>
            </MainDetail>
          )}
        </>
      )}
    </>
  );
};
export default Search;
