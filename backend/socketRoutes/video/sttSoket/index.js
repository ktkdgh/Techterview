module.exports = (socket, event) => {
    socket.on(event, (msg) => {
        let rooms = socket.rooms;
        let realRoom;
        for (const room of rooms) {
            if (room !== socket.id) {
                realRoom = room;
            }
        }
        socket.broadcast.to(realRoom).emit("sttSoket", msg);
    })
}



