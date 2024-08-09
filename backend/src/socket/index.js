const {Server} = require("socket.io");
const _socketManager = require("./_socketManager");

const mySocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ["GET", "POST"]
        }
    })

    io.on("connection", (socket) => {
        console.log("Un utilisateur s'est connecté")
        _socketManager.addSocket(socket);
    })


    return io;
}




module.exports = mySocket;