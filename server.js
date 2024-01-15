import express from 'express';
import http from 'http';
import initSocket, { setEvent } from './service/socket.js';
//import socket from './service/socket.js';
import cors from 'cors';
import Service from './service/services.js';
import { corsOptions } from './util/util.js';
import { addRoom, joinRoom } from './router/index.js';

const app = express();
const server = http.createServer(app);

//const service =Service();
const socket = initSocket(server, Service);
setEvent(socket);

server.listen(8000);
//socket.init(server);
console.log('server is running');

app.use(express.json());
app.use(cors(corsOptions));

app.post('/room/add', (req, res) => addRoom(req, res, Service));
app.post('/room/join', (req, res) => joinRoom(req, res, Service));
