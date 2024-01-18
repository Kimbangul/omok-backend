import { Server } from 'socket.io';
import service from './services.js';
import { corsOptions } from '../util/util.js';

const initSocket = (server, service) => {
  const io = new Server(server, {
    cors: corsOptions,
  });
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
    socket.on('addRoom', (clientId) => {
      const code = service.getCode();
      console.log(`{ userName: ${socket.userName}, code: ${code} }`);
      service.addRoom(code, id);
      console.log(clientId, id);
      io.to(clientId).emit('getNewRoomCode', code);
    });

    // FUNCTION 방 입장
    socket.on('joinRoom', (code, clientId) => {
      console.log(`{ userName: ${socket.userName}, code: ${code} }`);
      const result = service.joinRoom(code, clientId);
      if (result.status !== 200) {
        io.to(clientId).emit('alertToClient', result.message);
        return;
      }
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
