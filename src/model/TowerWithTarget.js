import { Tower } from "./Tower.js";

export class TowerWithTarget extends Tower {
  target;

  constructor(
    gameController,
    ctx,
    x,
    y,
    width,
    height,
    range,
    damage,
    reloadTime,
    allAnimations
  ) {
    super(
      gameController,
      ctx,
      x,
      y,
      width,
      height,
      Math.PI / 2,
      range,
      damage,
      reloadTime,
      allAnimations
    );
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

  update(dt) {
    super.update(dt);

    if (
      !this.target ||
      this.target.killed ||
      this.getDistance(this.target) > this.range
    ) {
      this.target = this.getTarget();
      if (!this.target) return;
    }

    this.rotation = Math.atan2(this.target.y - this.y, this.target.x - this.x);

    if (this.shootReady) {
      this.setAnimation(1, 0.05);
      // Attack
      this.target.takeDamage(this.damage);
      this.shootReady = false;
      this.time = 0;
    }
  }
}
