import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import { setupSocket } from "./socket/socketHandlers";
import { setupCommandLine } from "./utils/commandline";

const app = express();
const server = http.createServer(app);

const FRONTEND_URL = "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

setupSocket(io);
setupCommandLine(io);

server.listen(8000, "0.0.0.0", () => {
  console.log("Server running on http://localhost:8000");
});