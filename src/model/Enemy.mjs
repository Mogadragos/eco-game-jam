import { Entity } from "./Entity.mjs";

export class Enemy extends Entity {
  health;
  speed;
  aliveTime;
  positionTime;
  hasTurtle;
  killed;

  constructor(ctx, road, sprite) {
    super(ctx, -10, -10, sprite);
    this.road = road;
    this.speed = 0.3;
    this.aliveTime = 0;
    this.positionTime = 0;
    this.hasTurtle = false;
    this.killed = false;
  }

  update(dt) {
    this.aliveTime += dt;
    this.positionTime += dt * this.speed;
    const position = this.road.getPosition(this.positionTime);
    if (position.out) {
      if (this.hasTurtle) {
        this.killed = true;
      } else {
        this.hasTurtle = true;
        this.speed = -this.speed;
      }
    } else {
      this.x = position.x;
      this.y = position.y;
    }
  }
}
