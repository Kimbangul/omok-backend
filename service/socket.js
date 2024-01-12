import { Server } from 'socket.io';

const room = [];

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://127.0.0.1:3000',
      credentials: true,
    },
  });

  let socketList = {};
  console.log();

  io.sockets.on('connection', function (socket) {
    socketList[socket.id] = socket;
    console.log(socket.id);
    console.log('connection : %s sockets connected', Object.keys(socketList).length);

    // FUNCTION 새로운 방 생성
    socket.on('newRoom', (msg) => {
      const message = { userName: socket.userName, msg: msg };
      console.log(`{ userName: ${socket.userName}, msg: ${msg} }`);
      // io.sockets.emit('newMsgFromServer', message);
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });
  });
};

export default initSocket;
