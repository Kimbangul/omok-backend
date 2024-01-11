const { getRandomInt } = require('../util/util.js');

// CLASS 방 정보
class Room {
  constructor() {
    this.memberCnt = 1;
    this.score = { black: 0, white: 0 };
  }
  getMemberCnt() {
    return this.memberCnt;
  }
  addMember() {
    this.memberCnt++;
  }
  removeMember() {
    this.memberCnt--;
  }
}
// CLASS 서비스 로직
class Service {
  constructor() {
    this.room = [];
    this.roomInfo = {};
  }

  // FUNCTION 랜덤 코드 생성
  getCode() {
    const code = String(getRandomInt(1, 1000)).padStart(4, '0');
    if (this.roomInfo[code]) return this.getCode();

    this.addRoom(code);
    return code;
  }

  // FUNCTION 방 생성 및 삭제
  addRoom(roomCode) {
    //this.room.push(roomCode);
    this.roomInfo[roomCode] = new Room();
    console.log(this.roomInfo);
  }

  deleteRoom(roomCode) {
    delete this.roomInfo[roomCode];
    console.log(this.roomInfo);
  }

  // FUNCTION 방이 존재하는지 확인
  findRoom(roomCode) {
    console.log(this.roomInfo[roomCode]);
    if (this.roomInfo[roomCode] !== (undefined || null)) {
      console.log(true);
      return true;
    }
    console.log(false);
    return false;
  }

  // FUNCTION 방 떠나기
  leaveRoom(roomCode) {
    this.roomInfo[roomCode].removeMember();
    if (this.roomInfo[roomCode].getMemberCnt <= 0) deleteRoom(roomCode);
  }

  // FUNCTION 방 참가
  joinRoom(roomCode) {
    console.log(this.findRoom(roomCode));
    if (this.findRoom(roomCode)) {
      if (this.roomInfo[roomCode].getMemberCnt() >= 2) {
        console.log('인원이 초과되었습니다.');
        return;
      }

      this.roomInfo[roomCode].addMember();
      console.log(this.roomInfo);
      return;
    }
    console.log('방 정보가 없습니다.');
  }
}

module.exports = Service;
