const { getRandomInt } = require('./util.js');

class Service {
  constructor() {
    this.room = [];
    this.roomInfo = {};
  }

  // FUNCTION 랜덤 코드 생성
  getCode() {
    const code = String(getRandomInt(1, 1000)).padStart(4, '0');
    if (this.room.includes(code)) return this.getCode();

    this.makeRoom(code);
    return code;
  }

  // FUNCTION 방 생성 및 삭제
  addRoom(roomCode) {
    this.room.push(roomCode);
    this.roomInfo[roomCode] = {};
  }

  deleteRoom(roomCode) {}
}

const service = new Service();

console.log(service.getCode());
