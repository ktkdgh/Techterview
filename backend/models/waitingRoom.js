
let idx = 0;
const room = {}
const waitIndices = new Set();

function increaseIdx() {
    idx += 1;
    return idx;
  }
  
  function getIdx() {
    return idx;
  }


function getStatus(idx) {
    return room[idx].status;
  }
  
  
  function setStatus(idx, status) {
    room[idx].status = status;
  }

  
function getRoom(socket) {
    const rooms = socket.rooms;

    for (let i of rooms) {
        if(i != socket.id) {
            return i;
        }
    }
}

function setRoom(roomInfo) {
    if(roomInfo) {
        room[idx].users = roomInfo;
    }
}

function createRoom(userInfo) {
    if(room[idx]?.status==='interviewing') {
        idx ++;
    }
    room[idx] = {
        users: [userInfo],
        status: 'waiting'
    }
    waitIndices.add(idx);
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
    room,
    waitIndices,
    getRoom,
    setRoom,
    getStatus,
    setStatus,
    createRoom,
    joinRoom,
    increaseIdx,
    getIdx
  };

