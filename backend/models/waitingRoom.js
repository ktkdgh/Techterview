
let idx = 0;
const room = {}
let roomInfo =  []

//테스트용
// const room = [
//     {socketId: 123,roomId: 33, userId:'abc3'},
//     {socketId:523 ,roomId: 33, userId: 'bc2'},
//     {socketId:113 ,roomId: 30, userId: 'bc2'}
// ]
// let roomInfo =  new Set()
// roomInfo = [
// {socketId: 111, roomId:"734bf8d7-f58b-479c-90b2-f58f865146ea" , sendNum:3,roomName:'방제목1',checkedTitle:'CS',checkedValue:"javascript", checkedInterview:0},
// {socketId: 23, roomId:"734bf8d7-f58b-479c-90b2-f58f865146ea", sendNum:3,roomName:'방제목2',checkedTitle:'CS',checkedValue:"javascript", checkedInterview:0},
// {socketId: 2, roomId:1213, sendNum:3,roomName:'방제목3',checkedTitle:'CS',checkedValue:"javascript", checkedInterview:1},
// {socketId: 14411, roomId:1215, sendNum:3,roomName:'방제목4',checkedTitle:'CS',checkedValue:"javascript", checkedInterview:0}
// ]


function getIdx() {
    return idx;
  }

function getUserNum(socketId,roomId, room ) {
    count = 0

    for (var i = 0; i < roomInfo.length; i++) {
        if (roomInfo[i].roomId === roomId)
        {
        count += 1 
        }
    }
/*들어가자마자 나간 경우가 있을 수 있음. 이 경우에는 roomInfo에도 객체 정보를 한번 더 넘겨줘야함. */
     if (count == 0){
         roomInfo.push(room) 
        /*room 객체 정보 새롭게 푸시해주면서 userId는 덮어씌어줌.*/
        // roomInfo[roomInfo.length -1].socketId = socketId          
        /*해당 방에 대한 새로운 정보 업데이트(방 물려받음)* */
        
        return 0
     } else if (count ==1){  /*통신 필요* */

         return 1

     } else {
        return 2
     }
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
    getUserNum,
};
