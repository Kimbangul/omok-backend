import express from 'express';
import http from 'http';
import initSocket from './service/socket.js';
import Service from './service/services.js';
//const express = require('express');
const app = express();
const server = http.createServer(app);
//const server = require('http').createServer(app);

initSocket(server);
server.listen(8000);
console.log('server is running');

const service = new Service();
let corsOptions = {
  origin: '*', // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(express.json());

app.post('/room/add', function (request, response) {
  const code = service.getCode();
  //console.log(request);
  console.log(code);

  const dummy = {
    data: code,
  };
  response.status(200);
  response.json(dummy);
});
