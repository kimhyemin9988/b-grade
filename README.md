# b-grade

React,typescript로 작성한 영화,Tv 정보 반응형 web입니다.
현재 상영하고 있는 인기 영화, 높은 평점의 영화, 곧 개봉할 영화, 최신순으로 평점 4.5~5.5의 영화들의 정보를 제공합니다. Tv 부분에서는 현재 방영중이거나 높은 평점의 Tv 시리즈 그리고 영어, 중국어, 일본어, 한국어 각 언어별 인기 Tv 시리즈의 정보를 제공합니다. 트레일러, 이미지, 관련 인물에 대한 정보를 얻을 수 있습니다. 추가로 키워드 검색을 통해 연관된 작품들을 검색할 수 있습니다.

# [ PC Layout]

<img width="946" alt="web" src="https://user-images.githubusercontent.com/110611596/230778494-e7c788fa-14e1-46d9-a5f3-58f1ccc866db.png">

# [ Mobile Layout]
<img width="280" alt="mobileMovie" src="https://user-images.githubusercontent.com/110611596/230778499-c83a5815-5cb2-4c21-ac26-750c94cc8569.png">

# Pages

https://kimhyemin9988.github.io/b-grade/

# 적용기술
-React<br>
-react-router-dom / react-select / react-hook-form / react-youtube / react-query <br>
-recoil(react 상태관리) <br>
-typescript <br>
-styled-components <br>
-framer-motion <br>

## Section

#1. header : Home(Movie) / Tv / search<br>
  -search : 모바일에서는 아이콘 터치 시 검색창이 나타납니다.<br>

#2. styled-components를 이용해 다크 모드 / 라이트 모드 구현<br>

#3. Movie & Tv<br>
react-query와 영화 DB API 이용하여 Data를 응답받았습니다.
현재 상영하고 있는 인기 영화, 높은 평점의 영화들, 곧 개봉할 영화들, 최신순으로 평점 4.5~5.5의 영화들과 
현재 방영중이거나 높은 평점의 Tv 시리즈 그리고 영어, 중국어, 일본어, 한국어 각 언어별 인기 Tv 시리즈의 정보를 제공합니다.<br>
-슬라이더 구현<br>
  -web : 좌,우 버튼 클릭으로 이동<br>
  -mobile : Swiper Slider<br>

-포스터 클릭(터치)시 영화의 배경사진, 타이틀, 줄거리 모달창 open<br>

-detail 클릭(터치) detail화면으로 이동<br>

-react-select이용하여 언어별로 랜더링<br>

#4. search<br>
keyword로 DB에서 영화와 TV 검색할 수 있습니다.<br>
스크롤이 바닥에 닿게 되면 다음페이지의 Data를 요청하고 응답받습니다.

#5. detail<br>
영화의 id를 이용해 영화의 상세정보, 비디오, 영화 스태프와 출연자의 정보를 react-query와 api를 사용해 응답받습니다.

<하위 page><br>
-상세이미지<br>
-비디오 : 4개 이상의 비디오가 존재하면 버튼을 눌러 더 많은 관련 비디오를 볼 수 있습니다.<br>
-영화 스태프와 출연자의 정보 : 여섯 이상의 출연자가 정보가 있다면 버튼을 눌러 더 많은 인물을 볼 수 있습니다.
