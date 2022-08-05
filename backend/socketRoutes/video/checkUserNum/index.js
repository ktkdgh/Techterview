const WaitingRoom = require("../waitingRoom/waitingRoom");

module.exports= (socket, event) => {
    socket.on(event,(socketId, roomId)=> {
        // console.log(room.roomId)
       console.log( WaitingRoom.getUserNum(socketId, roomId))


        if (WaitingRoom.getUserNum(socketId,roomId) ===0 ) {
            socket.emit('allowEnter')
        }
        else if (WaitingRoom.getUserNum(socketId, roomId) ===1){
            console.log('allowEnter')
            socket.emit("allowEnter");
        }else {
            socket.emit('RoomIsFull')
            console.log('Room is full')
        }
    });
}
