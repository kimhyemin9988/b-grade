import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getCredits } from "../api";
import LoadingC from "../components/LoadingC";
import { Main, Overview, Title } from "../MovieF/Movie";
import { CastBox, Credits, SmallCircle } from "./MovieDetails";
import { MainVideo } from "./TvDetails";

const TotalCasts = () => {
  const { state, pathname } = useLocation();
  const distStr = pathname.split("/")[1]; // movie of tv

  const { isLoading: CreditsLoading, data: CreditsData } = useQuery<Credits>(
    ["Credits", `${state}`],
    () => getCredits(distStr, state)
  );
  return (
    <>
      {CreditsLoading ? (
        <LoadingC></LoadingC>
      ) : (
        <Main style={{ paddingTop: "13vh" }}>
          <Title style={{ paddingLeft: "20px", margin: "0" }}>cast</Title>
          <MainVideo>
            {CreditsData?.cast.map((i) => {
              return (
                <CastBox key={i.id}>
                  {i.profile_path === null ? (
                    <SmallCircle>
                      <FontAwesomeIcon icon={faUser} />
                    </SmallCircle>
                  ) : (
                    <SmallCircle
                      posterbg={`https://image.tmdb.org/t/p/w300/${i.profile_path}`}
                    ></SmallCircle>
                  )}
                  <Overview style={{ textAlign: "center", fontWeight: "700" }}>
                    {i.character}
                  </Overview>
                  <Overview
                    style={{
                      textAlign: "center",
                      fontWeight: "700",
                      color: "gray",
                    }}
                  >
                    {i.name}
                  </Overview>
                </CastBox>
              );
            })}
          </MainVideo>
        </Main>
      )}
    </>
  );
};
export default TotalCasts;
