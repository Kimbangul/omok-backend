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

      const member = result.data.member;
      if (member.length === 2) {
        member.forEach((el) => {
          // io.to(el).emit('setMatch', result.data);
          io.to(el).emit('updateClient', service.roomInfo[code]);
        });
      }
    });

    // FUNCTION 방 떠나기
    socket.on('leaveRoom', (code) => {
      console.log(`leaveRoom ${code}`);
      service.leaveRoom(code, id);
    });

    // FUNCTION 게임 시작
    socket.on('startGame', (info) => {
      const stageSize = info.input;
      const code = info.code;
      // console.log(info);

      service.updateRoom(code, { stageSize: stageSize });
      service.getMember(code).forEach((el) => {
        io.to(el).emit('doneStartGame', service.roomInfo[code]);
      });
    });

    // FUNCTION 클라이언트 진행상황을 서버에 업데이트
    socket.on('updateServer', (code, info) => {
      service.updateRoom(code, info);
      console.log('====== 서버 업데이트');
      console.log(`====== 업데이트id: ${id}`);
      console.log(info);
      service.getMember(code).forEach((el) => {
        io.to(el).emit('updateClient', service.roomInfo[code]);
      });
    });

    // FUNCTION 승패 결정 시
    socket.on('endGame', (code, member, msg) => {
      console.log('====end game');
      service.getMember(code).forEach((el) => {
        io.to(el).emit('alertToClient', msg);
      });
    });

    socket.on('resetRoom', (code, info) => {
      console.log('====resetRoom');
      service.resetRoom(code, info);
      service.getMember(code).forEach((el) => {
        io.to(el).emit('updateClient', service.roomInfo[code]);
      });
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
