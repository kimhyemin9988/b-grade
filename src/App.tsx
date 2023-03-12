import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Outlet } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Darktheme, Lighttheme } from './style/theme';
import HomeHeader from './HomeHeader';

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'LINESeedKR';
    src: local("LINESeedKR"),url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR.woff2') format('woff2');
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
	overflow-x: hidden;
}

@media screen and (max-width: 425px) {
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
	-홈으로 버튼 만들기 + 
	
	2. 모바일에서 가로 스크롤 생기는것 막기 + 

	3. 사진 크기 변환해서 가져오기 + 

	4. 라이트 모드 버튼 사진 뒤로가는것 고치기 +

	5. 헤더 고정하기 + 

	6. overview 크기 넘는것 ...으로 만들기 + 

	9. 포스터 잘리는 것 고치기 + 

	12. 인기있는 영화 장르 찾기 + 동영상이나 트레일러 넣기(동영상이나 트레일러는 가져오는데 오래걸리니 필요한것만 가져오기) + 

	13. 슬라이드 전부 고치기 + 
	
	11. search에서 로딩중 화면 만들기 -> 검색없음 화면 만들기+

	7. 컨테이너 앞뒤로 마지막 마진 주기 + 

	20. 포스터 호버시 회색배경화면 바꾸고 글씨도 thema마다 바뀌게 고치기 -> 포스터에 이름 써있음 필요x +

	18. 레이아웃 번호를 같게 하니 애니메이션 이동됨 -> 수정 + 

	14. Section 타이틀 마다 icon과 타이틀 넣기 +

	21. 글씨 250자 이상이면 삭제되는것 다른 슬라이드 안고침 +

	27. tv는 on air과 poluar 겹치는 것 많아서 poluar에서 나라별로 카테고리 만들기 + 



	
	8. tv에서 Latest show 말고 가장 인기있는 최신 쇼로 배경 고치기 ->데이터는 받아옴.. 나머지 하기

	15. tv쇼는 시즌별로 select 가능하게

	16. 모바일
	
	17. 검색시 무한 스크롤

	19. 포스터 제목을 누르거나 more detail버튼 누르면 다른 창으로 이동됨

	22. rating에 별점 넣기

	23. 트레일러 있는 것들은 트레일러 넣기

	24. 정보 좀더 넣기
	년도, 상영시간, 장르
	20232h 4min12
	Director Peyton Reed
	Stars Paul RuddEvangeline LillyMichael Douglas

	25. back to top

	26. section 장르별로 #태그 검색 가능

	*/