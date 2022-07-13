"use strict"

// const http = require('http');
// const app = http.createServer((req, res) => {
//     //console.log(req.url); // /
//     res.writeHead(200, { 'Content-type' : 'text/html; charset=utf-8'});
//     if(req.url === '/'){
//         res.end('여기는 루트입니다.');
//     }else if(req.url === '/login'){
//         res.end('여기는 로그인화면 입니다.');
//     }
// });

// app.listen(3001, () => {
//     console.log('http로 가동된 서버입니다.');
// });


const express = require('express'); // 모듈
const app = express();

//const PORT = 3000;

// 라우팅
const home = require("./src/routes/home"); // 라우팅 분리

// 앱세팅
app.set('views', './src/views');
app.set('view engine', 'ejs'); //views 엔진

//라우팅
// app.get('/', (req, res) => {
//     //이러한 동작을 하겠다.
//     //res.send('여기는 루트 입니다.');
//     res.render("home/index");
// });

// app.get('/login', (req, res) => {
//     //이러한 동작을 하겠다.
//     //res.send('여기는 로그인 화면입니다.');
//     res.render("home/login");
// });


app.use("/", home); // use -> 미들 웨어를 등록해주는 메서드

// app.listen(PORT, () => {
//     console.log('서버 가동');
// });

// 위 서버 가동 port 연결
module.exports = app;

// 간편한 서버가동 코드