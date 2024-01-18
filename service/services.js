import { getRandomInt } from '../util/util.js';
import Status from '../router/status.js';

// CLASS 방 정보
class Room {
  constructor(id) {
    this.member = [id];
    this.memberCnt = 1;
    this.score = { black: 0, white: 0 };
    this.gameState = [];
  }
  getMemberCnt() {
    return this.memberCnt;
  }
  addMember(id) {
    this.member.push(id);
    this.memberCnt++;
  }
  removeMember(id) {
    this.member = this.member.filter((el) => el !== id);
    this.memberCnt--;
  }
  setGame() {
    this.gameState = [];
  }
  updateGame(game) {
    this.gameState = game;
  }
  setScore(black, white) {
    this.score = {
      black: black,
      white: white,
    };
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
  addRoom(roomCode, id) {
    //this.room.push(roomCode);
    this.roomInfo[roomCode] = new Room(id);
    console.log(this.roomInfo);
  }

  deleteRoom(roomCode) {
    console.log(this.roomInfo[roomCode]);
    delete this.roomInfo[roomCode];
    console.log(this.roomInfo);
  }

  // FUNCTION 방이 존재하는지 확인
  findRoom(roomCode) {
    console.log(this.roomInfo[roomCode]);
    if (this.roomInfo[roomCode] !== undefined && this.roomInfo[roomCode] !== null) {
      console.log(true);
      return true;
    }
    console.log(false);
    return false;
  }

  // FUNCTION 방 떠나기
  leaveRoom(roomCode, id) {
    if (!this.findRoom(roomCode)) {
      console.log(this.roomInfo);
      return;
    }
    this.roomInfo[roomCode].removeMember(id);
    console.log(this.roomInfo[roomCode].getMemberCnt());
    if (this.roomInfo[roomCode].getMemberCnt() <= 0) this.deleteRoom(roomCode);
  }

  // FUNCTION 방 참가
  joinRoom(roomCode, id) {
    let result;

    console.log(this.findRoom(roomCode));
    if (this.findRoom(roomCode)) {
      if (this.roomInfo[roomCode].getMemberCnt() >= 2) {
        // console.log('인원이 초과되었습니다.');
        result = new Status(501, undefined, '인원이 초과되었습니다.');
      } else {
        this.roomInfo[roomCode].addMember(id);
        const data = { member: this.roomInfo[roomCode].member, code: roomCode };
        console.log(data);
        result = new Status(200, data, '방 입장');
      }
    } else {
      result = new Status(501, undefined, '방 정보가 없습니다.');
      // result = { message: '방 정보가 없습니다.' };
    }
    return result;
  }

  // FUNCTION 방에 2인 접속 시 매칭
  matchGame(roomCode) {}
}

const service = new Service();

export default service;

//export default Service;
