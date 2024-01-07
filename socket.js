const socket = require('socket.io');

const initSocket = (server) => {
  const io = socket(server);

  io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log('connection : %s sockets connected', socket);

    socket.on('disconnect', () => {
      console.log('disconnect');
    });
  });
};

module.exports.init = initSocket;
