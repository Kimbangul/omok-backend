const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socket = require('./service/socket');
const Service = require('./service/services');

socket.init(server);
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
