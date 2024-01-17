import { Server } from 'socket.io';
import service from './services.js';
import { corsOptions } from '../util/util.js';

const initSocket = (server, service) => {
  const io = new Server(server, {
    cors: corsOptions,
  });

  // io.sockets.on('connection', function (socket) {
  //   socketList[socket.id] = socket;
  //   console.log(socket.id);
  //   console.log('connection : %s sockets connected', Object.keys(socketList).length);

  //   // FUNCTION 새로운 방 생성
  //   socket.on('newRoom', (msg) => {
  //     const message = { userName: socket.userName, msg: msg };
  //     console.log(`{ userName: ${socket.userName}, msg: ${msg} }`);
  //     // io.sockets.emit('newMsgFromServer', message);
  //   });

  //   // FUNCTION 방 떠나기
  //   socket.on('leaveRoom', (code) => {
  //     console.log(`leaveRoom ${code}`);
  //     service.leaveRoom(code);
  //   });

  //   socket.on('disconnect', () => {
  //     if (this.socketList[socket.id]) {
  //       delete this.socketList[socket.id];
  //     }
  //     console.log('disconnect');
  //   });
  // });

  return io;
};

export const setEvent = (io) => {
  let socketList = {};

  io.sockets.on('connection', function (socket) {
    const id = socket.id;
    socketList[id] = socket;
    console.log(id);
    console.log('connection : %s sockets connected', Object.keys(socketList).length);

    // FUNCTION 새로운 방 생성
    socket.on('newRoom', (code) => {
      console.log(`{ userName: ${socket.userName}, code: ${code} }`);
      service.addRoom(code, id);
      // io.sockets.emit('newMsgFromServer', message);
    });

    // FUNCTION 방 떠나기
    socket.on('leaveRoom', (code) => {
      console.log(`leaveRoom ${code}`);
      service.leaveRoom(code, id);
    });

    socket.on('disconnect', () => {
      if (id in socketList) {
        delete socketList[id];
      }
      console.log('disconnect');
    });
  });
};

export default initSocket;
