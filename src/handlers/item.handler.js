import { createItem, getItem, setItem } from '../models/item.model.js';
import { getStage, setStage } from '../models/stage.model.js';
import { getGameAssets } from '../init/assets.js';

// 아이템 점수 획득 핸들러
export const getItemHandler = (userId, payload) => {
  let currentStages = getStage(userId);
  const currentStage = currentStages[currentStages.length - 1];
  const assets = getGameAssets();

  // 획득한 아이템 아이템 존재 여부 확인
  const item = assets.items.data.find((asset) => asset.id === payload.itemId);
  console.log(item);
  if (!item) {
    return { status: 'fail', message: 'No item found for data' };
  }

  const serverTime = Date.now();
  createItem(userId);
  setItem(userId, item.id, item.score, currentStage.id, serverTime);

  return { status: 'success', message: `${item.id}번 아이템 획득!, +${item.score}` };
};
