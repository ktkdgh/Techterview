const WaitingRoom = require("../waitingRoom/waitingRoom");
 
module.exports= (socket, event) => {
    socket.on(event, (roomId)=> {
       WaitingRoom.deleteUser(socket.id, socket.rooms)
       socket.broadcast.emit("roomsUpdated", WaitingRoom.roomInfo)
    })  
}