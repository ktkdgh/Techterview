
let idx = 0;
/* room = [{socketId, roomId}] */
let room = []; 
/* socketId= [{roomId, sendNum,roomName,checkedTitle, checkedValue, checkedInterview}] */
let roomInfo =  [];

//테스트용
// const room = [
//     {socketId: 123,roomId: 33},
//     {socketId:523 ,roomId: 33},
//     {socketId:113 ,roomId: 30}
// ]
// let roomInfo =  new Set()
// roomInfo = [
// { roomId:"734bf8d7-f58b-479c-90b2-f58f865146ea" , sendNum:3,roomName:'방제목1',checkedTitle:'CS',checkedValue:"javascript", checkedInterview:0},
// { roomId:"734bf8d7-f58b-479c-90b2-f58f865146ea", sendNum:3,roomName:'방제목2',checkedTitle:'CS',checkedValue:"javascript", checkedInterview:0},
// {roomId:1213, sendNum:3,roomName:'방제목3',checkedTitle:'CS',checkedValue:"javascript", checkedInterview:1},
// {roomId:1215, sendNum:3,roomName:'방제목4',checkedTitle:'CS',checkedValue:"javascript", checkedInterview:0}
// ]



function getUserNum(socketId,roomId ) {
    count = 0

    for (var i = 0; i < room.length; i++) {
        if (room[i]?.roomId === roomId)
        {
        count += 1 
        }
    }
     if (count == 0){ /*들어가자마자 사람이 나갔을떄*/
        return 0
     } else if (count ==1){  /*통신 필요* */
         return 1
     } else {
        return 2
     }
}

function deleteUser(socketId) {
/* room에 있는 해당 socketId(User)정보를 삭제해줌*/
    let roomId = 0
    for (var i = 0; i < room.length; i++) {
        if (room[i]?.socketId == socketId)
        {
        roomId = room[i].roomId
        delete room[i]
        }
    }
    userNum= 0
/** 만약 삭제하고 userNum이 0 인경우 해당 roomInfo 방정보를 로비에서 완전히 삭제*/
    for (var i = 0; i < room.length; i++) {
        if (room[i]?.roomId == roomId)
        {
        userNum += 1
        }
    }
    if (userNum ===0) {
        for (var i = 0; i < roomInfo.length+1; i++){
            if (roomInfo[i]?.roomId === roomId){
                roomInfo[i] = null
                
            }
    
        }
    }

}


function addUserRoom(socketId, roomId) {
    room.push({
        socketId : socketId,
        roomId : roomId
    })

}

function addRoomInfo(roomId,sendNum,roomName,checkedTitle,checkedValue,checkedInterview) {
    count = 0
    for (var i = 0; i < roomInfo.length; i++) {
        if (roomInfo[i]?.roomId == roomId)
        {
        count += 1 
        }
    }

    if (count == 0){
        roomInfo.push({

            roomId : roomId,
            sendNum : sendNum,
            roomName : roomName,
            checkedTitle  : checkedTitle,
            checkedValue  : checkedValue,
            checkedInterview  : checkedInterview,
        })
    }
}



module.exports = {
    room,
    roomInfo,
    addRoomInfo,
    getUserNum,
    deleteUser,
    addUserRoom
};
