const sio = require("socket.io");
const socketioJwt = require("socketio-jwt");
const config = require("./config");
const { handleUserJoin, handleNewMessage } = require("./controllers/socket");

module.exports = function(server) {
  const ioServer = sio(server);
  let onlineUsers = [];

  ioServer.use(
    socketioJwt.authorize({
      secret: config.secret,
      handshake: true
    })
  );

  ioServer.on("connection", socket => {
    socket.on("enter chat", handleUserJoin(socket, onlineUsers));
    socket.on("new message", handleNewMessage(socket));
    socket.on("disconnect", () => {
      console.log("User disconnected: ", socket.id);
      onlineUsers = onlineUsers.remove(socket.id);
      socket.broadcast.emit("user left", onlineUsers);
      console.log("Users left: ", onlineUsers);
    });
  });
};
