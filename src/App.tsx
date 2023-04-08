import { useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { Outlet } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Darktheme, Lighttheme } from "./style/theme";
import HomeHeader from "./HomeHeader";

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
		font-size: 14px;
	}
}

/* large */
@media screen and (max-width: 768px){
	html, body {
		font-size: 30px;
	}

}
@media screen and (min-width: 769px){
	html, body {
		font-size: 50px;
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
`;

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
};
export default App;
