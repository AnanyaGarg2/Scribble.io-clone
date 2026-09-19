import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import fs from "fs";
import path from "path";

import { setupSocket } from "./socket/socketHandlers";
import { setupCommandLine } from "./utils/commandline";

const app = express();
const server = http.createServer(app);

const frontendOrigins = (process.env.FRONTEND_URL ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = frontendOrigins.length
  ? {
      origin: frontendOrigins,
      credentials: true,
    }
  : undefined;

if (corsOptions) {
  app.use(cors(corsOptions));
}

const io = new Server(
  server,
  corsOptions
    ? {
        cors: {
          ...corsOptions,
          methods: ["GET", "POST"],
        },
      }
    : undefined
);

setupSocket(io);
setupCommandLine(io);

app.get("/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});

const clientDist = path.resolve(process.cwd(), "client", "dist");

if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get("*", (request, response, next) => {
    if (request.path.startsWith("/socket.io/")) {
      return next();
    }

    response.sendFile(path.join(clientDist, "index.html"));
  });
}

const port = Number(process.env.PORT) || 8000;

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
