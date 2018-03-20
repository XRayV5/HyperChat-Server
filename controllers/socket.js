const {
  recognizeUserConnection,
  saveMessage,
  fetchMessageLog
} = require("../services/socket");

exports.handleUserJoin = (socket, onlineUsers) => async () => {
  const { email } = await recognizeUserConnection(socket.decoded_token.sub);
  socket.id = email;
  console.log("User Entered: ", email);
  onlineUsers.push(email);
  socket.emit("registered", email);
  socket.broadcast.emit("new user joined", onlineUsers);
  const log = await fetchMessageLog();
  socket.emit("update message log", log);
};

exports.handleNewMessage = socket => async message => {
  console.log("New Message from ", socket.id);
  const messageObj = await saveMessage(socket.id, message);
  if (messageObj) {
    socket.broadcast.emit("new message", messageObj);
  }
};
