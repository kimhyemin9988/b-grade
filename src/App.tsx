import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Outlet } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Darktheme, Lighttheme } from './style/theme';
import HomeHeader from './HomeHeader';

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'LINESeedKR-Bd';
    src: local("LINESeedKR"),url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
	font-family: inherit;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: normal;
	background-color: ${(props) => props.theme.bodyBgColor};
	color:${(props) => props.theme.bodyFtColor};
	font-family: "LINESeedKR-Bd", "Open Sans", "Helvetica Neue", sans-serif;
}

@media screen and (max-width: 425px) { //480이하인 경우 모바일
	html, body {
		font-size: 20px;
	}
}

/* large */
@media screen and (max-width: 768px){
	html, body {
		font-size: 40px;
	}

}
@media screen and (min-width: 769px){
	html, body {
		font-size: 60px;
	}

}

ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a{
    color: inherit;
    text-decoration: none;
}
`


const App = () => {
	const [isDark, setIsDark] = useState<boolean>(true);
	return (
		<>
			<ThemeProvider theme={isDark ? Darktheme : Lighttheme}>
				<GlobalStyle />
				<HomeHeader></HomeHeader>
				<Outlet context={[setIsDark]}></Outlet>
				<ReactQueryDevtools initialIsOpen={true} />
			</ThemeProvider>
		</>
	);
}
export default App;


/*
	1. not found 페이지 App 밑으로 넣어서 헤더랑 바탕화면 보이게
	찾으시는 페이지가 없습니다.
	요청하신 페이지를 찾을 수 없습니다.
	입력하신 경로가 정확한지 다시 한번 확인해 주시기 바랍니다
	-홈으로 버튼 만들기
	
	2. 모바일에서 가로 스크롤 생기는것 막기

	3. 사진 크기 변환해서 가져오기

	4. 라이트 모드 버튼 사진 뒤로가는것 고치기

	5. 헤더 고정하기

	6. overview 크기 넘는것 ...으로 만들기

	7. 페이지 마지막 마진 주기

	8. tv에서 Latest show 말고 가장 인기있는 쇼로 배경 고치기

	9. 포스터 잘리는 것 고치기

	11. search에서 로딩중 화면 만들기
	*/