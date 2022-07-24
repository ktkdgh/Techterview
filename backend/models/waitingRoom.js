const e = require("express");

let idx = 0;
const room = {}
let roomInfo =  new Set()
roomInfo = [
{ roomName: '방제목 1입니다', tag0: 'CS' , tag1: "프론트엔드", tag2: "네트워크"}, 
{ roomName: '방제목 2입니다', tag0: '네트워크', tag1: "프론트엔드", tag2: "네트워크"}, 
{ roomName: '방제목 3입니다', tag0: '프론트엔드',tag1: "프론트엔드", tag2: "네트워크" }
]

  
  function getIdx() {
    return idx;
  }

function addUser(idx, socketId, roomId, userId ) {
    room[idx]={socketId,roomId,userId};
}

function addRoomInfo(socketId, roomId,sendNum,roomName,tag0,tag1,tag2) {
    count = 0
    for (var i = 0; i < roomInfo.length; i++) {
        if (roomInfo[i].socketId == socketId)
        {
        count += 1 
        }
    }

if (count == 0){
    roomInfo.push({

        socketId : socketId,
        roomId : roomId,
        sendNum : sendNum,
        roomName : roomName,
        tag0  : tag0,
        tag1  : tag1,
        tag2  : tag2,
})
}
  }

function joinRoom(userInfo) {
    try {
        room[idx].users.push(userInfo);
    }
    catch(e) {
        console.log(e)
    }
}



module.exports = {
    roomInfo,
    joinRoom,
    getIdx,
    addUser,
    addRoomInfo,
  };

