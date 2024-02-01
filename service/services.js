import { getRandomInt } from '../util/util.js';
import Status from '../router/status.js';

// CLASS 방 정보
class Room {
  constructor(id, roomCode) {
    this.code = roomCode;
    this.member = [id];
    this.host = id;
    this.turn = 0;
    this.memberCnt = 1;
    this.score = { 0: 0, 1: 0 };
    this.stageState = [];
    this.stageSize = { row: 0, cell: 0 };
    this.gameState = 'room';
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
    this.stageState = [];
  }
  updateGame(game) {
    this.stageState = game;
  }
  setScore(black, white) {
    this.score = {
      0: black,
      1: white,
    };
  }
  update(state) {
    // this = {...this, ...state};
    Object.assign(this, { ...state });
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

  // FUNCTION 특정 방의 멤버 구하기
  getMember(code) {
    return this.roomInfo[code].member;
  }

  // FUNCTION 방 생성 및 삭제
  addRoom(roomCode, id) {
    //this.room.push(roomCode);
    this.roomInfo[roomCode] = new Room(id, roomCode);
    console.log(this.roomInfo);
  }

  deleteRoom(roomCode) {
    console.log(this.roomInfo[roomCode]);
    delete this.roomInfo[roomCode];
    console.log(this.roomInfo);
  }

  // FUNCTION 방이 존재하는지 확인
  findRoom(roomCode) {
    // console.log(this.roomInfo[roomCode]);
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
      // console.log(this.roomInfo);
      return;
    }
    this.roomInfo[roomCode].removeMember(id);
    //console.log(this.roomInfo[roomCode].getMemberCnt());
    if (this.roomInfo[roomCode].getMemberCnt() <= 0) this.deleteRoom(roomCode);
  }

  // FUNCTION 방 참가
  joinRoom(roomCode, id) {
    let result;

    // console.log(this.findRoom(roomCode));
    if (this.findRoom(roomCode)) {
      if (this.roomInfo[roomCode].getMemberCnt() >= 2) {
        // console.log('인원이 초과되었습니다.');
        result = new Status(501, undefined, '인원이 초과되었습니다.');
      } else {
        this.roomInfo[roomCode].addMember(id);
        const data = this.roomInfo[roomCode];
        console.log(data);
        result = new Status(200, data, '방 입장');
        this.roomInfo[roomCode].update({ gameState: 'ready' });
      }
    } else {
      result = new Status(501, undefined, '방 정보가 없습니다.');
      // result = { message: '방 정보가 없습니다.' };
    }
    return result;
  }

  // FUNCTION 방 초기화
  resetRoom(roomCode, info) {
    if (!this.findRoom(roomCode)) return;
    console.log('reset room');
    this.roomInfo[roomCode].update({
      ...info,
      gameState: 'ready',
      stageState: null,
      turn: 0,
    });
  }

  // FUNCTION 방 업데이트
  updateRoom(roomCode, info) {
    if (this.findRoom(roomCode)) {
      this.roomInfo[roomCode].update(info);
      console.log('========update game============');
    }
  }
}

const service = new Service();

export default service;

//export default Service;
