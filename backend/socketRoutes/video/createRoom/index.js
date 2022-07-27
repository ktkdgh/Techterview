
const WaitingRoom = require("../../../models/waitingRoom");

module.exports= (socket, event) => {
    socket.on(event ,(socketId,roomId, sendNum,roomName,checkedTitle,checkedValue,checkedInterview)=> {
        console.log(socketId,roomId,sendNum,roomName,checkedTitle,checkedValue,checkedInterview)
        WaitingRoom.addRoomInfo(socketId,roomId,sendNum, roomName,checkedTitle,checkedValue,checkedInterview)
        console.log(WaitingRoom.roomInfo)
        // socket.emit("roomsUpdated", WaitingRoom.roomInfo)
    });
}
