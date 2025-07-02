const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const initSocket = require("./socket/socket");

const app = express();
const server = http.createServer(app);
initSocket(server);

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
//mongodb://localhost:27017/chat-app

mongoose.connect("mongodb://localhost:27017/chat-app").then(() => {
  server.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
  });
});
