# Sync Draw Guess

A real-time, multiplayer drawing and guessing game built using Node.js, Socket.IO, React, and TypeScript. Players join rooms, take turns drawing prompts, and compete to guess the drawings in a fun and interactive environment. With real-time canvas synchronization, timeouts for word selection, and smooth drawing experiences, this project captures the excitement of collaborative gameplay.

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-000000?style=flat&logo=socket.io&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

## Backend

The backend is developed using Node.js and Socket.IO. It handles real-time communication between clients and the server.

### Server Events

- **Client Events:**
  - `connect` - Client connects to the server.
  - `disconnecting` - Client disconnects from the server.
  - `joinRoom` - Client joins a room.
  - `leaveRoom` - Client leaves a room.
  - `startGame` - Client starts the game.
  - `draw` - Client sends drawing data.
  - `guess` - Client sends a guess.
  - `changeSettings` - Client changes game settings.
  - `wordSelect` - Client selects a word.

- **Server Events:**
  - `joinedRoom` - Server confirms client has joined the room.
  - `playerJoined` - Server notifies when a player joins.
  - `playerLeft` - Server notifies when a player leaves.
  - `gameStarted` - Server notifies when the game starts.
  - `gameEnded` - Server notifies when the game ends.
  - `drawData` - Server sends drawing data to clients.
  - `guessed` - Server notifies when a word is guessed.
  - `turnEnded` - Server notifies when a turn ends.
  - `chooseWord` - Server requests the drawer to choose a word.
  - `wordChosen` - Server sends the chosen word to clients.
  - `settingsChanged` - Server notifies when settings are changed.
  - `guessFail` - Server notifies when a guess fails.

### Room System

Players join a room using a unique room ID. If the drawer takes too long to choose a word, one is automatically assigned. Each turn has a time limit for guessing.

## Frontend

The frontend is developed using React with TypeScript and Vite for a fast development experience.

## Deploy on Railway

The included Dockerfile deploys the frontend and Socket.IO server as one web service, so the game uses a single public URL.

1. Create a Railway project, then add a **Redis** database and a service from this GitHub repository.
2. In the web service's variables, set `REDIS_URL` to `${{Redis.REDIS_URL}}` (use the actual Redis service name if you rename it).
3. Deploy the service and generate a public domain in **Settings → Networking**. That domain is the live project link.

Railway provides `PORT` automatically. For local development, copy `server/.env.example` to `server/.env` and set `REDIS_URL` (the older `REDDIS_URL` name is still supported).

## Deploy the frontend on Vercel

This project can use Vercel for the React frontend and the Docker deployment above for the persistent Socket.IO/Redis backend.

1. Deploy the backend first and note its public URL, for example `https://your-backend.example.com`.
2. In the backend environment, set `FRONTEND_URL` to the Vercel production URL after it is created.
3. Import this repository into Vercel and set the **Root Directory** to `client`.
4. In Vercel's environment variables, set `VITE_SOCKET_URL` to the backend's public URL. It is intentionally public and must not contain a secret.
5. Deploy. Vercel detects Vite and builds the `dist` directory automatically.

For local development, leave `VITE_SOCKET_URL` unset so Vite proxies Socket.IO to `http://localhost:8000`.

## Installation

  ### Clone the repository
   ```bash
   git clone https://github.com/DivyanshuLohani/SyncDrawGuess.git
   cd SyncDrawGuess
   ```

   ### Start a redis server
   ```bash
   docker run -d -p 6379:6379 redis
   ```

   ### Start the server
   ```bash
   cd server 
   npm install && npm run dev
   ```

   ### Start the client
   ```bash
   cd client
   npm install && npm run dev
   ```

   ### Playing
 http://127.0.0.1:5173/
    
   
## Preview
[!Watch the video](https://github.com/user-attachments/assets/3c92e898-b9be-43ed-99f4-e02371018176)
