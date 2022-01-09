import { Tower } from "./Tower.mjs";

export class TowerWithTarget extends Tower {
  target;

  constructor(gameController, ctx, x, y, range, damage, reloadTime, sprite) {
    super(gameController, ctx, x, y, range, damage, reloadTime, sprite);
    this.target = null;
  }

  getTarget() {
    let target = null;
    let maxAliveTime = 0;
    for (const enemy of this.gameController.enemies) {
      const distance = this.getDistance(enemy);
      if (distance < this.range && maxAliveTime < enemy.aliveTime) {
        maxAliveTime = enemy.aliveTime;
        target = enemy;
      }
    }
    return target;
  }

  update() {
    if (!this.target || this.getDistance(this.target) > this.range) {
      this.target = this.getTarget();
      if (!this.target) return;
    }

    this.rotation = Math.atan2(this.target.y - this.y, this.target.x - this.x);
    // Attack
  }
}
