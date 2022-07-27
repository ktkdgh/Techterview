const WaitingRoom = require("../../../models/waitingRoom");

module.exports= (socket, event) => {
    socket.on(event, (roomId, userId, socketId) => {
        let roominformation;
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-connected", userId);
        for (let i = 0; i < WaitingRoom.roomInfo.length; i++) {
            if (WaitingRoom.roomInfo[i].roomId === roomId){
                roominformation = WaitingRoom.roomInfo[i];
                break;
            } 
        }
        socket.emit("getRoominfo", roominformation);
        const idx = WaitingRoom.getIdx()
        WaitingRoom.addUser(idx,roomId,userId, socketId)
    });
}



// 