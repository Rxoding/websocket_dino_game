import Item from './Item.js';
import item_unlock from '../assets/item_unlock.json' with { type: 'json' };

class ItemController {
  INTERVAL_MIN = 0;
  INTERVAL_MAX = 6000;

  nextInterval = null;
  items = [];
  unlockedItems = []; // 해금된 아이템을 저장할 배열

  constructor(ctx, itemImages, scaleRatio, speed) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.itemImages = itemImages;
    this.scaleRatio = scaleRatio;
    this.speed = speed;

    this.setNextItemTime();
  }

  setNextItemTime() {
    this.nextInterval = this.getRandomNumber(this.INTERVAL_MIN, this.INTERVAL_MAX);
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  unlockItemsForStage(currentStageId) {
    // 주어진 스테이지에 대해 해금된 아이템을 가져옵니다.
    this.unlockedItems = item_unlock.data
      .filter((item) => item.stage_id === currentStageId)
      .map((item) => item.item_id);
  }

  createItem(currentStageId) {
    // 스테이지에 맞게 해금
    this.unlockItemsForStage(currentStageId);

    // 해금된 아이템 중에서 랜덤으로 선택합니다.
    const availableItems = this.itemImages.filter((itemInfo) =>
      this.unlockedItems.includes(itemInfo.id),
    );

    if (availableItems.length > 0) {
      const index = this.getRandomNumber(0, availableItems.length - 1);
      const itemInfo = availableItems[index];
      const x = this.canvas.width * 1.5;
      const y = this.getRandomNumber(10, this.canvas.height - itemInfo.height);

      const item = new Item(
        this.ctx,
        itemInfo.id,
        x,
        y,
        itemInfo.width,
        itemInfo.height,
        itemInfo.image,
      );

      this.items.push(item);
    }
  }

  update(gameSpeed, deltaTime, currentStageId) {
    if (this.nextInterval <= 0) {
      this.createItem(currentStageId);
      this.setNextItemTime();
    }

    this.nextInterval -= deltaTime;

    this.items.forEach((item) => {
      item.update(this.speed, gameSpeed, deltaTime, this.scaleRatio);
    });

    this.items = this.items.filter((item) => item.x > -item.width);
  }

  draw() {
    this.items.forEach((item) => item.draw());
  }

  collideWith(sprite) {
    const collidedItem = this.items.find((item) => item.collideWith(sprite));
    if (collidedItem) {
      this.ctx.clearRect(collidedItem.x, collidedItem.y, collidedItem.width, collidedItem.height);
      return {
        itemId: collidedItem.id,
      };
    }
  }

  reset() {
    this.items = [];
  }
}

export default ItemController;
