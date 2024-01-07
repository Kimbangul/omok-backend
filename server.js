const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socket = require('./socket');

socket.init(server);
server.listen(8000);
console.log('server is running');
