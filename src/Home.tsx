import styled from "styled-components";
import { Helmet } from "react-helmet";
import movieList from "./api";
import { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import { useQuery } from "react-query";

export const Main = styled.div`
    width: 100%;
    height: 100vh;
`
export const Box1 = styled.div`
    height: 30px;
    border-radius: 50px;
    padding: 2%;
    margin: 1%;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ToggleThemeBtn = styled.button`
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    border-radius: 0.3rem;
    font-weight: 900;
    text-align: center;
    cursor: pointer;
    transition: ease background-color 250ms;
    padding: 0 1.5rem;
    border: 1px solid black;
    &:hover{
        background-color: white;
        color: black;
    }
`
interface movieData {
    adult: boolean;
    backdrop_path: object;
    genre_ids: object;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
const Home = () => {
    const [themeText, setThemeText] = useState("라이트 모드로 보기");
    const [setIsDark] = useOutletContext<React.Dispatch<React.SetStateAction<boolean>>[]>();
    const { data, isLoading } = useQuery(["movies"], movieList);

    const toggleTheme = () => {
        setIsDark((element) => (!element));
        themeText === "다크 모드로 보기" ? setThemeText("라이트 모드로 보기") : setThemeText("다크 모드로 보기")
    };

    return (
        <>
            <Helmet>
                <title>B-Grade</title>
            </Helmet>
            <Main>
            </Main>
            <ToggleThemeBtn onClick={toggleTheme}>{themeText}</ToggleThemeBtn>
        </>
    );
};
export default Home;