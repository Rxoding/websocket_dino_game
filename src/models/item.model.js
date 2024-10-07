const items = {};

// 아이템 초기화
export const createItem = (uuid) => {
  items[uuid] = [];
};

export const getItem = (uuid) => {
  return items[uuid];
};

export const setItem = (uuid, itemId, itemScore, currentStageId, timestamp) => {
  return items[uuid].push({ itemId, itemScore, currentStageId, timestamp });
};

export const clearItem = (uuid) => {
  items[uuid] = [];
};
