const sio = require("socket.io");
const socketioJwt = require("socketio-jwt");
const config = require("./config");

module.exports = function(server) {
  const ioServer = sio(server);

  ioServer.use(
    socketioJwt.authorize({
      secret: config.secret,
      handshake: true
    })
  );

  ioServer.on("connection", socket => {
    console.log("New Connection with ID: ", socket.id);
    console.log(socket.decoded_token, "connected");
    socket.on("disconnect", socket => {
      console.log("User disconnected: ", socket);
    });
  });
};
