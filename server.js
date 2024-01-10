const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socket = require('./socket');
const Service = require('./services');

socket.init(server);
server.listen(8000);
console.log('server is running');

const service = new Service();

app.use(express.json());

app.get('/', function (request, response) {
  const code = service.getCode();
  console.log(code);

  const dummy = {
    data: code,
  };
  response.status(200);
  response.json(dummy);
});
