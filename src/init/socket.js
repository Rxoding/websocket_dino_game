import { Server as SoketIO } from 'socket.io';
import registerHandler from '../handlers/register.handler.js';

const initSocket = (server) => {
  const io = new SoketIO();
  io.attach(server);

  registerHandler(io);
};

export default initSocket;
