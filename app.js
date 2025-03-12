// http 모듈을 불러옵니다.
const http = require('http');

// 서버를 만듭니다.
const server = http.createServer((req, res) => {
    // 응답 헤더 설정
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // 클라이언트에게 응답 내용 전송
    res.end('Hello, Node.js!');
});

// 서버가 3000번 포트에서 요청을 기다리도록 설정
server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
