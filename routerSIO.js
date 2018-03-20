const sio = require("socket.io");
const socketioJwt = require("socketio-jwt");
const config = require("./config");

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
    console.log("New Connection with ID: ", socket.id);
    socket.on("enter chat", data => {
      socket.id = data.username;
      console.log("User Entered: ", data.username);
      onlineUsers.push(data.username);
    });
    socket.on("disconnect", () => {
      console.log("User disconnected: ", socket.id);
      onlineUsers = onlineUsers.remove(socket.id);
      console.log("Users: ", onlineUsers);
    });
  });
};
