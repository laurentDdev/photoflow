
class _socketManager {
    constructor() {
        this._sockets = []
    }

    addSocket(socket) {
        console.log("Socket has been added")
        this._sockets.push(socket)
    }

    removeSocket(socket) {
        this._sockets = this._sockets.filter(s => s !== socket)
    }

    emits(event, data) {
        console.log("Socket connected", this._sockets.length)
        this._sockets.forEach(socket => {
            socket.emit(event, data)
        })
    }
}


module.exports = new _socketManager()