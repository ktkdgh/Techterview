const WaitingRoom = require("../waitingRoom/waitingRoom");

module.exports= (socket, event) => {
    socket.on(event, (roomId, userId, socketId, userInfo) => {
        let roominformation;
        socket.join(roomId);
        WaitingRoom.addUserRoom(socket.id,roomId)

        socket.broadcast.to(roomId).emit("user-connected", userId);
        for (let i = 0; i < WaitingRoom.roomInfo.length; i++) {
            if (WaitingRoom.roomInfo[i]?.roomId === roomId){
                roominformation = WaitingRoom.roomInfo[i];
                break;
            } 
        }
        socket.broadcast.to(roomId).emit("user-connected", userId, userInfo, roominformation);
        socket.emit("getRoominfo", roominformation);
        console.log("joinroom했어욤",socket.id, WaitingRoom.roomInfo)
        console.log("지금 방의 정보는요", WaitingRoom.room)

    });
}

