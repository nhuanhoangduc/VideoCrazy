module.exports = function(server) {
  var io = require('socket.io')(server);
  var shortid = require('shortid');
  var users = {};

  io.on('connection', function(socket) {
    var id = shortid.generate();

    // new
    socket.on('news', function() {
      socket.emit('id', {
        id: id,
        users: users
      });

      users[id] = false;
    });

    // data send from client
    socket.on('clientToServer', function(data) {
      socket.broadcast.emit('serverToClient', {
        id: data.id,
        webcam: data.webcam
      });
    });
  });
};
