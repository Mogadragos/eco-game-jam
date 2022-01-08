export class Entity {
  controller;

  ctx;
  x;
  y;
  width;
  height;
  rotation;
  sprite;

  constructor(ctx, x, y, width, height, sprite) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotation = 0;
    this.sprites = sprite;
  }

  update() {}
  render() {
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.rotation);
    this.ctx.translate(-this.x - 0.5 * this.width, -this.y - 0.5 * this.height);
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
