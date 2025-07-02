const chatService = require("../services/chatService");

exports.getUserList = async (req, res) => {
  try {
    const users = await chatService.getUserList(req.user.userId);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getChat = async (req, res) => {
  try {
    const messages = await chatService.getChatMessages(req.user.userId, req.params.userId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
