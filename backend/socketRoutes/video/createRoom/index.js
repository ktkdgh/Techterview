
const WaitingRoom = require("../../../models/waitingRoom");

module.exports= (socket, event) => {
    socket.on(event ,(socketId,roomId, sendNum,roomName,tag0,tag1,tag2)=> {
        console.log(socketId,roomId,sendNum,roomName,tag0,tag1,tag2)
        WaitingRoom.addRoomInfo(socketId,roomId,sendNum, roomName,tag0,tag1,tag2)
        console.log(WaitingRoom.roomInfo)
        // socket.emit("roomsUpdated", WaitingRoom.roomInfo)
    });
}
