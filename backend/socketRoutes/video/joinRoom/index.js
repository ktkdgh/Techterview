
const WaitingRoom = require("../../../models/waitingRoom");

module.exports= (socket, event) => {
    socket.on(event,(roomId, userId, socketId)=> {

          socket.join(roomId);
          socket.broadcast.to(roomId).emit("user-connected", userId);
          const idx = WaitingRoom.getIdx()
          WaitingRoom.addUser(idx,roomId,userId, socketId)

    });
}




// 