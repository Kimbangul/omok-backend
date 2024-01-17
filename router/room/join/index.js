import Status from '../../status.js';

export default function joinRoom(request, response, service) {
  let msg;
  let result;
  const code = request.body.code;

  console.log(service.room);
  if (service.findRoom(code)) {
    result = service.joinRoom(code);
  } else {
    result = new Status(404, undefined, '해당 방 정보가 없습니다.');
  }

  result.send(response);
  // const data = { message: msg, result: result };
  // response.status(200);
  // response.json(data);
}
