const e = require("express");

let idx = 0;
const room = {}
let roomInfo =  []

function getIdx() {
    return idx;
}

function addUser(idx, socketId, roomId, userId ) {
    room[idx]={socketId,roomId,userId};
}

function addRoomInfo(socketId, roomId,sendNum,roomName,checkedTitle,checkedValue,checkedInterview) {
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
            checkedTitle  : checkedTitle,
            checkedValue  : checkedValue,
            checkedInterview  : checkedInterview,
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
