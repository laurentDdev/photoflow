
class _socketManager {
    constructor() {
        this._sockets = {}; // Utiliser un objet pour stocker les sockets par userId
    }

    addSocket(socket) {
        const userId = socket.handshake.query.userId;
        if (!userId) {
            console.error("User ID is missing in socket handshake query.");
            return;
        }

        console.log(`Socket for user ${userId} has been added`);
        this._sockets[userId] = socket;
    }

    removeSocket(socket) {
        const userId = socket.handshake.query.userId;
        if (userId && this._sockets[userId]) {
            console.log(`Socket for user ${userId} has been removed`);
            delete this._sockets[userId];
        } else {
            console.error("Trying to remove a socket that doesn't exist or userId is missing.");
        }
    }

    emits(event, data) {
        const socketCount = Object.keys(this._sockets).length;
        console.log(`Broadcasting event to ${socketCount} connected users`);

        for (const userId in this._sockets) {
            if (this._sockets.hasOwnProperty(userId)) {
                this._sockets[userId].emit(event, data);
            }
        }
    }

    emitToUser(userId, event, data) {
        console.log("Trying to emit event to user", userId);
        const socket = this._sockets[userId];
        if (socket) {
            console.log(`Emitting event to user ${userId}`);
            socket.emit(event, data);
        } else {
            console.error(`No socket found for user ${userId}`);
        }
    }
}


module.exports = new _socketManager()