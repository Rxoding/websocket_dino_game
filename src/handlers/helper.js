import { CLIENT_VERSION } from '../constansts.js';
import { getGameAssets } from '../init/assets.js';
import { createStage, getStage, setStage } from '../models/stage.model.js';
import { getUser, removeUser } from '../models/user.model.js';
import handlerMappings from './handlerMapping.js';

export const handleDisconnect = (socket, uuid) => {
  removeUser(socket.id);
  console.log(`User disconnected:${socket.id}`);
  console.log('Current users', getUser());
};

export const handleConnection = (socket, uuid) => {
  console.log(`${uuid}님이 새로 접속하였습니다. soketID ${socket.id}`);
  console.log(`현재 접속중인 유저: `, getUser());

  createStage(uuid);

  socket.emit('connection', { uuid });
};

export const handlerEvent = (io, socket, data) => {
  if (!CLIENT_VERSION.includes(data.clientVersion)) {
    socket.emit('response', { status: 'fail', message: '클라이언트 버전 오류' });
    return;
  }

  const handler = handlerMappings[data.handlerId];
  if (!handler) {
    socket.emit('response', { status: 'fail', message: 'Handler를 찾을 수 없습니다' });
  }

  const response = handler(data.userId, data.payload);

  //모든유저에게 보내기
  if (response.broadcast) {
    io.emit('response', 'broadcast');
    return;
  }

  socket.emit('response', response);
};
