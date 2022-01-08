import { Entity } from "./Entity.mjs";

export class Tower extends Entity {
  gameManager;
  range;
  damage;
  reloadTime;

  constructor(gameManager, ctx, x, y, range, damage, reloadTime, sprite) {
    super(ctx, x, y, 30, 30, sprite);

    this.gameManager = gameManager;
    this.range = range;
    this.damage = damage;
    this.reloadTime = reloadTime;
  }

  getDistance(entity) {
    const x = this.x - entity.x;
    const y = this.y - entity.y;
    return Math.sqrt(x * x + y * y);
  }

  render() {
    super.render();

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.range, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
