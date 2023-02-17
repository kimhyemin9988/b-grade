import styled from "styled-components";
import { Helmet } from "react-helmet";

export const Header = styled.header`
    width: 100%;
    height: 80px;
    background-color:white;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Title = styled.span`
    color: black;
    font-size: x-large;
    margin: 7%;
    font-weight: 800;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
`
export const ToggleThemeBtn = styled.button`
    background-color:white;
    color: black;
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
export const Main = styled.div`
    width: 100%;
    height: 100vh;
`
export const Box1 = styled.div`
    background-color: black;
    height: 30px;
    border-radius: 50px;
    padding: 2%;
    margin: 1%;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Home = () => {
    return (
        <>
            <Helmet>
                <title></title>
            </Helmet>
            <Header>
                <Title></Title>
            </Header>
            <Main>
                <Box1>사과</Box1>
            </Main>
        </>
    );
};
export default Home;