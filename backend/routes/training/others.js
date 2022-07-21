var express  = require('express');
var router   = express.Router();

const server = require("http").Server(router);
const { resourceLimits } = require('worker_threads');
const io = require("socket.io")(8001, { cors:{ origin: ['https://3.35.82.134:3000']} });


io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);
    console.log("roomID:::::::", socket.rooms, roomId, userId);
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message);
    });
  });
});

module.exports = router;