import express from 'express';
import http from 'http';
import initSocket from './service/socket.js';
import cors from 'cors';
import Service from './service/services.js';
import { corsOptions } from './util/util.js';
import { addRoom } from './router/index.js';

const app = express();
const server = http.createServer(app);

initSocket(server);
server.listen(8000);
console.log('server is running');

const service = new Service();

app.use(express.json());
app.use(cors(corsOptions));

app.post('/room/add', (req, res) => addRoom(req, res, service));
