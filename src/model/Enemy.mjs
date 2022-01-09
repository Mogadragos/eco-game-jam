import { Entity } from "./Entity.mjs";

export class Enemy extends Entity {
  maxHealth;
  health;
  speed;
  aliveTime;
  prevPosition;
  positionTime;
  hasTurtle;
  killed;

  constructor(ctx, road, sprite, maxHealth, speed) {
    super(ctx, -10, -10, 30, 50, sprite);
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.road = road;
    this.speed = speed;
    this.aliveTime = 0;
    this.prevPosition = { x: 0, y: 0 };
    this.positionTime = 0;
    this.hasTurtle = false;
    this.killed = false;
  }

  takeDamage(damage) {
    this.health -= damage;
  }

  update(dt) {
    if (!(this.health > 0)) {
      this.killed = true;
      return;
    }

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
      this.rotation = Math.atan2(
        position.y - this.prevPosition.y,
        position.x - this.prevPosition.x
      );
      this.prevPosition.x = this.x = position.x;
      this.prevPosition.y = this.y = position.y;
    }
  }

  render() {
    super.render();

    this.ctx.lineWidth = 10;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";
    this.ctx.moveTo(this.x - 30, this.y - 40);
    this.ctx.lineTo(this.x + 30, this.y - 40);
    this.ctx.closePath();
    this.ctx.stroke();

    let healthBarSizeMax = 60;
    let healthPercent = this.health / this.maxHealth;
    let healthBarSize = healthBarSizeMax * healthPercent;

    this.ctx.lineWidth = 8;
    this.ctx.beginPath();
    this.ctx.strokeStyle =
      healthPercent > 0.5
        ? "#00FF00"
        : healthPercent > 0.2
        ? "#FFFF00"
        : "#FF0000";
    this.ctx.moveTo(this.x - healthBarSizeMax / 2, this.y - 40);
    this.ctx.lineTo(this.x - healthBarSizeMax / 2 + healthBarSize, this.y - 40);
    this.ctx.closePath();
    this.ctx.stroke();
  }
}
