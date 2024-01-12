export default function addRoom(request,response,service){
  const code = service.getCode();
  //console.log(request);
  console.log(code);

  const data = {
    code: code,
  };
  response.status(200);
  response.json(data);
}