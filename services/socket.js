const User = require("../models/user");
const Message = require("../models/message");

exports.recognizeUserConnection = async sub => {
  try {
    const username = await User.findById(sub);
    return username;
  } catch (err) {
    console.error(err);
  }
};

exports.fetchMessageLog = async () => {
  try {
    return await Message.find({});
  } catch (err) {
    console.error(err);
  }
};

exports.saveMessage = async (username, message) => {
  const newMsg = new Message({ username, message });
  try {
    if (await newMsg.save()) return newMsg;
  } catch (err) {
    console.error(err);
  }
};
