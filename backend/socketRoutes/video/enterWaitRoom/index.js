const WaitingRoom = require("../waitingRoom/waitingRoom");

module.exports= (socket, event) => {
    socket.on(event, ()=> {
        socket.emit("roomInfo", WaitingRoom.roomInfo)
    })  
}