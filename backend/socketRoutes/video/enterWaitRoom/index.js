
const WaitingRoom = require("../../../models/waitingRoom");

module.exports= (socket, event) => {
    socket.on(event,()=> {
    socket.emit("roomInfo", WaitingRoom.roomInfo)
    // console.log(WaitingRoom.roomInfo)
})   

}




// 