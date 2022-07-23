
const WaitingRoom = require("../../../models/waitingRoom");

module.exports= (socket, event) => {
    socket.on(event,(userInfo)=> {
    console.log("you have entered room!!!!!")
    let idx = WaitingRoom.getIdx();
    
    if (Object.keys(WaitingRoom.room).length === 0 || WaitingRoom.room[idx] ===undefiend ) {
        WaitingRoom.createRoom(userInfo);
        socket.join(`room${idx}`);   

    }

    else if (WaitingRoom.room[idx].users.length < 2 && WaitingRoom.room[idx].status ==='waiting') {
        WaitingRoom.joinRoom(userInfo);
    
        WaitingRoom.setRoom(unique);
        socket.join(`room${idx}`);
    
    }
    else {
        idx = WaitingRoom.increaseIdx();
        WaitingRoom.createRoom(userInfo);
        socket.join(`room${idx}`);
    }
    socket.nsp.to(`room${idx}`).emit('enterNewUser', WaitingRoom.room[idx].users);
    console.log('WaitingRoom Entered', WaitingRoom.room, socket.rooms);

    })
}




// 