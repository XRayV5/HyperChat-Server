const sio = require("socket.io");
const socketioJwt = require("socketio-jwt");
const config = require("./config");

module.exports = function(server) {
  const ioServer = sio(server);

  ioServer.set(
    "authorization",
    socketioJwt.authorize({
      secret: config.secret,
      handshake: true
    })
  );

  ioServer.on("connection", socket => {
    console.log("New Connection with ID: ", socket.id);
    console.log(socket.handshake.decoded_token.email, "connected");
  });
};
