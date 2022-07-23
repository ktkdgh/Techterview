
const WaitingRoom = require("../../../models/waitingRoom");

module.exports= (socket, event) => {
    socket.on(event,(roomId, userId)=> {
    
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-connected", userId);
        console.log("roomID:::::::", socket.rooms, roomId, userId);
        socket.on("message", (message) => {
          io.to(roomId).emit("createMessage", message);
        });
    });
}




// 