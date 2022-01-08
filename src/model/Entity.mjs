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
    this.ctx.rect(this.x, this.y, 100, 100);
    this.ctx.fill();
  }
}
