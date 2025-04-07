/** @type {import("prettier").Config} */
const config = {
    semi: true, // 세미콜론 붙이기
    singleQuote: true, // 작은따옴표 사용
    tabWidth: 2, // 들여쓰기 간격
    trailingComma: 'es5', // 객체나 배열의 마지막에 쉼표 붙이기 (ES5 스타일)
    printWidth: 100, // 한 줄 최대 길이
    bracketSpacing: true, // 객체 리터럴 중괄호 내에 공백 넣기: { foo: bar }
    arrowParens: 'avoid', // 화살표 함수 파라미터가 하나면 괄호 생략
  };
  
  module.exports = config;