export class Entity {
  controller;

  ctx;
  x;
  y;
  sprite;

  constructor(ctx, x, y, sprite) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.sprites = sprite;
  }

  update() {}
  render() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, 10, 10);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
