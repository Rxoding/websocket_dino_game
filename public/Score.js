import { sendEvent } from './Socket.js';
import stage from '../assets/stage.json' with { type: 'json' };
import item from '../assets/item.json' with { type: 'json' };

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;
  stageRow = 0;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    const stageData = stage.data;
    this.score += deltaTime * 0.001 * stageData[this.stageRow].scoresByStage;

    // 마지막 스테이지에 도달했는지 체크
    if (this.isFinalStage === undefined) {
      this.isFinalStage = false;
    }

    // stage.json의 설정에 맞게 stage 변경
    if (Math.floor(this.score) > stageData[this.stageRow].score && this.stageChange) {
      if (this.stageRow + 1 < stageData.length) {
        // 다음 스테이지로 넘어갈 수 있을 때
        sendEvent(11, {
          currentStage: stageData[this.stageRow].id,
          targetStage: stageData[this.stageRow + 1].id,
        });
        console.log(
          `${stageData[this.stageRow].id}스테이지를 통과하고 ${stageData[this.stageRow].id + 1} 스테이지로 넘어갑니다!`,
        );
        this.stageRow++;
      } else if (!this.isFinalStage) {
        // 마지막 스테이지일 때, 처음 한 번만 출력
        console.log(`마지막 스테이지입니다! 최고기록을 세워보세요!`);
        this.isFinalStage = true;
      }
    }
  }

  // 아이템 획득
  getItem(itemId) {
    const itemData = item.data;
    const getItem = itemData.find((e) => e.id === itemId);
    sendEvent(12, {
      currentStage: itemData[this.stageRow].id,
      itemId: itemId,
      score: getItem.score,
    });
    this.score += getItem.score;
  }

  // 현재 스테이지 아이디 획득
  getCurrentStageId() {
    return stage.data[this.stageRow].id;
  }

  reset() {
    this.score = 0;
    this.stageRow = 0;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
