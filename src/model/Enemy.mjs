import { Entity } from "./Entity.mjs";

export class Enemy extends Entity {
  maxHealth;
  health;
  speed;
  aliveTime;
  prevPosition;
  positionTime;
  tryGetTurtle;
  turtle;
  isGoingBack;
  killed;
  gold;

  constructor(ctx, road, maxHealth, speed, gold, width = 80) {
    super(
      ctx,
      -10,
      -10,
      width,
      width,
      Math.PI / 2,
      [window.imageController.animations.enemy],
      0.2
    );
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.road = road;
    this.speed = speed;
    this.aliveTime = 0;
    this.prevPosition = { x: 0, y: 0 };
    this.positionTime = 0;
    this.tryGetTurtle = false;
    this.turtle = null;
    this.isGoingBack = false;
    this.killed = false;
    this.gold = gold;
  }

  takeDamage(damage) {
    this.health -= damage;
  }

  update(dt) {
    if (!(this.health > 0)) {
      this.die();
      return;
    }

    super.update(dt);

    this.aliveTime += dt;

    this.positionTime += dt * this.speed;
    const position = this.road.getPosition(this.positionTime);
    if (position.out) {
      if (this.isGoingBack) {
        this.killed = true;
      } else {
        this.isGoingBack = true;
        this.tryGetTurtle = true;
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

    if (this.turtle) {
      const turlePos = this.road.getPosition(this.positionTime - 0.05);
      this.turtle.x = turlePos.x;
      this.turtle.y = turlePos.y;
    }
  }

  setTurtle(turtle) {
    this.turtle = turtle;
    this.turtle.setIdle(1, 0.2);
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

  die() {
    this.killed = true;
  }
}
