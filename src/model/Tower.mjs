import { Entity } from "./Entity.mjs";

export class Tower extends Entity {
  gameController;
  range;
  damage;
  reloadTime;
  target;

  constructor(gameController, ctx, x, y, range, damage, reloadTime, sprite) {
    super(ctx, x, y, 30, 30, sprite);

    this.gameController = gameController;
    this.range = range;
    this.damage = damage;
    this.reloadTime = reloadTime;
  }

  getDistance(entity) {
    const x = this.x - entity.x;
    const y = this.y - entity.y;
    return Math.sqrt(x * x + y * y);
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

  render() {
    super.render();

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.range, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
