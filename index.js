const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve(__dirname, "./public")));

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("user-message", (data) => {
    io.emit("message", data); // forward message & sender
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

server.listen(9000, () => {
  console.log("Server running on http://localhost:9000");
});
