import { Server } from 'socket.io';
import Service from './services.js';
import { corsOptions } from '../util/util.js';

class Socket {
  socketList = {};
  io;
  constructor() {
    this.socketList = {};
    this.io;
  }
  setSocketList(socket, id) {
    this.socketList[id] = socket;
  }
  init(server) {
    this.io = new Server(server, {
      cors: corsOptions,
    });

    this.io.sockets.on('connection', function (socket) {
      //this.socketList[socket.id] = socket;
      //this.setSocketList(socket, socket.id);
      console.log(socket.id);
      console.log(socket);
      // console.log('connection : %s sockets connected', Object.keys(this.socketList).length);

      // FUNCTION 새로운 방 생성
      socket.on('newRoom', (msg) => {
        const message = { userName: socket.userName, msg: msg };
        console.log(`{ userName: ${socket.userName}, msg: ${msg} }`);
        // io.sockets.emit('newMsgFromServer', message);
      });

      // FUNCTION 방 떠나기
      socket.on('leaveRoom', (code) => {
        console.log(`leaveRoom ${code}`);
        Service.leaveRoom(code);
      });

      socket.on('disconnect', () => {
        if (this.socketList[socket.id]) {
          delete this.socketList[socket.id];
        }
        console.log('disconnect');
      });
    });
  }
}

const socket = new Socket();

export default socket;

// const initSocket = (server, service) => {
//   const io = new Server(server, {
//     cors: {
//       origin: 'http://127.0.0.1:3000',
//       credentials: true,
//     },
//   });

//   let socketList = {};

//   io.sockets.on('connection', function (socket) {
//     socketList[socket.id] = socket;
//     console.log(socket.id);
//     console.log('connection : %s sockets connected', Object.keys(socketList).length);

//     // FUNCTION 새로운 방 생성
//     socket.on('newRoom', (msg) => {
//       const message = { userName: socket.userName, msg: msg };
//       console.log(`{ userName: ${socket.userName}, msg: ${msg} }`);
//       // io.sockets.emit('newMsgFromServer', message);
//     });

//     // FUNCTION 방 떠나기
//     socket.on('leaveRoom', (code) => {
//       console.log(`leaveRoom ${code}`);
//       service.leaveRoom(code);
//     });

//     socket.on('disconnect', () => {
//       if (this.socketList[socket.id]) {
//         delete this.socketList[socket.id];
//       }
//       console.log('disconnect');
//     });
//   });
// };

// export default initSocket;
