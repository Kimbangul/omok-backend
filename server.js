import express from 'express';
import http from 'http';
import initSocket from './service/socket.js';
import cors from 'cors';
import Service from './service/services.js';
import { corsOptions } from './util/util.js';

const app = express();
const server = http.createServer(app);

initSocket(server);
server.listen(8000);
console.log('server is running');

const service = new Service();

app.use(express.json());
app.use(cors(corsOptions));

app.post('/room/add', function (request, response) {
  const code = service.getCode();
  //console.log(request);
  console.log(code);

  const data = {
    code: code,
  };
  response.status(200);
  response.json(data);
});
