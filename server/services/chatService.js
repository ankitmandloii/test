const User = require('../models/User');
const Message = require('../models/Message');

exports.getUserList = async (myId) => {
  return await User.find({ _id: { $ne: myId } });
};

exports.getChatMessages = async (myId, userId) => {
  return await Message.find({
    $or: [
      { sender: myId, receiver: userId },
      { sender: userId, receiver: myId }
    ]
  }).sort({ timestamp: 1 });
};

exports.saveMessage = async ({ sender, receiver, content }) => {
  return await Message.create({ sender, receiver, content });
};
