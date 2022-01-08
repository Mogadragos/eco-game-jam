import { Entity } from "./Entity.mjs";

export class Tower extends Entity {
  gameManager;
  range;
  damage;
  reloadTime;
  target;

  constructor(gameManager, ctx, x, y, range, damage, reloadTime, sprite) {
    super(ctx, x, y, 30, 30, sprite);

    this.gameManager = gameManager;
    this.range = 200;
    this.damage = 0;
    this.reloadTime = 0;
  }

  getDistance(entity) {
    const x = this.x - entity.x;
    const y = this.y - entity.y;
    return Math.sqrt(x * x + y * y);
  }

  getTarget() {
    let target = null;
    let maxAliveTime = 0;
    for (const enemy of this.gameManager.enemies) {
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

  render() {
    super.render();

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.range, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
