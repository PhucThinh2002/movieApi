import { Server } from "socket.io";

const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
    });

    io.on("connection", (socket) => {
        console.log(`id: ${socket.id}`);
      
        handleChatSocket(io, socket)
      
        handleNotificationSocket(io, socket)
      });
}


export default initSocket