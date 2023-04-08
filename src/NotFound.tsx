import { Link } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./App";
import HomeHeader from "./HomeHeader";
import { Main } from "./MovieF/Movie";
import { Darktheme } from "./style/theme";

const HomeNavBtn = styled.button`
  background-color: ${(props) => props.theme.bodyBgColor};
  color: ${(props) => props.theme.bodyFtColor};
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  border-radius: 0.3rem;
  font-weight: 800;
  text-align: center;
  cursor: pointer;
  padding: 0 1.5rem;
  border: 1px solid ${(props) => props.theme.bodyFtColor};
`;
export const ErrorMain = styled(Main)`
  font-size: 20px;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const NotFound = () => {
  return (
    <>
      <ThemeProvider theme={Darktheme}>
        <GlobalStyle />
        <HomeHeader></HomeHeader>
        <ErrorMain>
          <span>찾으시는 페이지가 없습니다.</span>
          <br />
          <span>요청하신 페이지를 찾을 수 없습니다.</span>
          <br />
          <span>
            입력하신 경로가 정확한지 다시 한번 확인해 주시기 바랍니다.
          </span>
          <br />
          <HomeNavBtn>
            <Link to="">홈으로</Link>
          </HomeNavBtn>
        </ErrorMain>
      </ThemeProvider>
    </>
  );
};
export default NotFound;
