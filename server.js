import express from "express";
import { createServer } from "http"; 
import { Server } from "socket.io"; 
import rootRouter from "./src/routes/root.router.js";
import { handleError } from "./src/common/helpers/error.helper.js";
import cors from "cors";
import prisma from "./src/common/prisma/init.prisma.js";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "google.com"],
  },
});

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "google.com"],
}));
app.use(express.static("."));

prisma.$connect()
  .then(() => console.log("✅ Prisma connected to database"))
  .catch((err) => {
    console.error("❌ Prisma connection error:", err);
    process.exit(1);
  });

app.use(rootRouter);
app.use(handleError);

io.on("connection", (socket) => {
  console.log(`⚡ Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

httpServer.listen(4000, () => {
  console.log(`🚀 Server Online At Port 4000`);
});
