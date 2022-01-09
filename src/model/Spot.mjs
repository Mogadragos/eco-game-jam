import { Entity } from "./Entity.mjs";

export class Spot extends Entity {
  tower;
  radius;

  constructor(ctx, x, y, sprite) {
    super(ctx, x, y, 80, 80, sprite);

    this.tower = null;
    this.radius = 80;
  }

  render() {
    this.ctx.fillStyle = "#DDA253";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
  }
}
