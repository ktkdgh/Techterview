const WaitingRoom = require("../waitingRoom/waitingRoom");

module.exports= (socket, event) => {
    socket.on(event ,(roomId, sendNum,roomName,checkedTitle,checkedValue,checkedInterview, memberId)=> {
        WaitingRoom.addRoomInfo(roomId,sendNum, roomName,checkedTitle,checkedValue,checkedInterview,memberId)
        socket.broadcast.emit("roomsUpdated", WaitingRoom.roomInfo)
        console.log("방금들어온사람",roomId)
        console.log('roomInfo:',WaitingRoom.roomInfo)
    });
}

