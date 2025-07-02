const { Server } = require("socket.io");
const chatService = require("../services/chatService");

let users = new Map();

module.exports = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    socket.on("register", (userId) => {
      users.set(userId, socket.id);
    });

    socket.on("private-message", async ({ senderId, receiverId, content }) => {
      const message = await chatService.saveMessage({ sender: senderId, receiver: receiverId, content });
      const receiverSocketId = users.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive-message", message);
      }
    });

    socket.on("disconnect", () => {
      for (let [userId, socketId] of users) {
        if (socketId === socket.id) users.delete(userId);
      }
    });
  });
};
