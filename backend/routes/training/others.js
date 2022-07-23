// var express  = require('express');
// var router   = express.Router();
// const server = require("http").Server(router);
// const io = require("socket.io")(8001, { cors:{ origin: ['http://localhost:3000']} });


// io.on("connection", (socket) => {
//   socket.on("room_new",(name) => {
//     name = name.trim();
//     console.log(`Socket ${socket.id} is creating room ${name}`)

//   })


//   socket.on("join-room", (roomId, userId) => {
//     socket.join(roomId);
//     socket.broadcast.to(roomId).emit("user-connected", userId);
//     console.log("roomID:::::::", socket.rooms, roomId, userId);
//     socket.on("message", (message) => {
//       io.to(roomId).emit("createMessage", message);

//       socket.on("room_new",(name)=> {
//         name = name.trim();
//         console.log(`Socket ${socket.id} is creating room ${name}`)
      
//           const roomInfo = {
//             name:"room",
//             player: "",
//           };
//           roomInfo.name = name;
//           roomInfo.player = socket.id;
//           console.log("________________",name)
      
//           publicRoom.push(roomInfo);
//           wsSever.sockets.emit("room_change",publicRoom);
//           socket.join(name);
//           socket.emit("room_enter",name);
//           console.log(publicRoom);
//       });
//     });
//   });
//  });

/** 대기실 방 생성 **/

//  io.on("connection", (socket) => {



//  })


//  module.exports = router;