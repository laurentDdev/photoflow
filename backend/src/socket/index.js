const {Server} = require("socket.io");
const _socketManager = require("./_socketManager");

const mySocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    io.on("connection", (socket) => {
        console.log("Un utilisateur s'est connecté")
        _socketManager.addSocket(socket);

        socket.on("disconnect", (reason) => {
            console.log("Un utilisateur s'est déconnecté", reason)
            _socketManager.removeSocket(socket);
        })
    })


    return io;
}


module.exports = mySocket;