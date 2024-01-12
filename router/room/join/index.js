export default function joinRoom(request, response, service) {
  let msg;
  let result;
  const code = request.body.code;

  console.log(service.room);
  if (service.findRoom(code)) {
    service.joinRoom(code);
    msg = 'join';
    result = 'success';
  } else {
    msg = 'error';
    result = 'failed';
  }

  const data = { message: msg, result: result };
  response.status(200);
  response.json(data);
}
