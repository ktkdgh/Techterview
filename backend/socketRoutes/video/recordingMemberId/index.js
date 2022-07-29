module.exports = (socket, event) => {
    socket.on(event, (recordingId, roomId) => {
        socket.broadcast.to(roomId).emit("recordingId", recordingId)
    })
}