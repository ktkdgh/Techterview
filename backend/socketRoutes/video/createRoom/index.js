const WaitingRoom = require("../../../models/waitingRoom");

module.exports= (socket, event) => {
    socket.on(event ,(socketId,roomId, sendNum,roomName,checkedTitle,checkedValue,checkedInterview, memberId)=> {
        WaitingRoom.addRoomInfo(socketId,roomId,sendNum, roomName,checkedTitle,checkedValue,checkedInterview,memberId)
        socket.broadcast.emit("roomsUpdated", WaitingRoom.roomInfo)
    });
}

