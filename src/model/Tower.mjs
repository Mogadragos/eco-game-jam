import { Entity } from "./Entity.mjs";

export class Tower extends Entity {
  gameController;
  range;
  damage;
  reloadTime;
  time;
  shootReady;

  constructor(gameController, ctx, x, y, range, damage, reloadTime, sprite) {
    super(ctx, x, y, 30, 30, sprite);

    this.gameController = gameController;
    this.range = range;
    this.damage = damage;
    this.time = this.reloadTime = reloadTime;
    this.shootReady = true;
  }

  getDistance(entity) {
    const x = this.x - entity.x;
    const y = this.y - entity.y;
    return Math.sqrt(x * x + y * y);
  }

  update(dt) {
    if (!this.shootReady) {
      this.time += dt;
      if (!(this.time < this.reloadTime)) this.shootReady = true;
    }
  }

  render() {
    super.render();

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.range, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
