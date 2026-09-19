import io from "socket.io-client";

const socketOptions = { autoConnect: false };
const socketUrl = import.meta.env.VITE_SOCKET_URL;

export const socket = socketUrl
  ? io(socketUrl, socketOptions)
  : io(socketOptions);
