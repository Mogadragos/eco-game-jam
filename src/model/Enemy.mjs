import { Entity } from "./Entity.mjs";

export class Enemy extends Entity {
  health;
  speed;
  aliveTime;
  hasTurtle;

  constructor(ctx, road, sprite) {
    super(ctx, -10, -10, sprite);
    this.road = road;
    this.speed = 0.1;
    this.aliveTime = 0;
    this.hasTurtle = false;
  }

  update(dt) {
    this.aliveTime += dt * this.speed;
    const position = this.road.getPosition(this.aliveTime);
    if (!position.out) {
      this.x = position.x;
      this.y = position.y;
    }
  }
}
