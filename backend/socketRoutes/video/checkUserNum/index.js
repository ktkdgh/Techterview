const WaitingRoom = require("../../../models/waitingRoom");

module.exports= (socket, event) => {
    socket.on(event,(socketId, roomId,room)=> {
        // console.log(room.roomId)
       console.log( WaitingRoom.getUserNum(socketId, roomId,room))


        if (WaitingRoom.getUserNum(socketId,roomId,room) ===0 ) {
            socket.emit('allowEnter')
        }
        else if (WaitingRoom.getUserNum(socketId, roomId,room) ===1){
            console.log('allowEnter')
            socket.emit("allowEnter");
        }else {
            socket.emit('Room is full')
            console.log('Room is full')
        }
    });
}
