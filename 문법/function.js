// 일반적인 함수의 형태
function 문자출력함수(문자) {
    console.log('문자출력함수 ' + 문자);
};
문자출력함수('a');

// 익명 함수
문자출력익명함수 = function(문자) {
    console.log('문자출력익명함수 ' + 문자);
};
문자출력익명함수('swag');

// arrow function
문자출력익명함수 = (문자) => {
    console.log('문자출력익명함수 ' + 문자);
};
문자출력익명함수('swag');

// arrow function - 매개변수가 하나인 경우 소괄호()를 생략할 수 있다.
문자출력익명함수 = 문자 => {
    console.log('문자출력익명함수 ' + 문자);
};
문자출력익명함수('swag');

// arrow function3 - 함수 body가 return문 하나이거나, 한 줄 일 때 중괄호{}를 생략할 수 있다.
문자출력익명함수 = (문자) => console.log('문자출력익명함수 ' + 문자);
문자출력익명함수('swag');
