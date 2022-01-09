import { Entity } from "./Entity.mjs";

export class Turtle extends Entity {
  drawabled;
  killed;
  constructor(ctx, x, y) {
    super(ctx, x, y, 100, 100, Math.PI / 2, [
      window.imageController.animations.turtleIdle,
    ]);
    this.drawabled = true;
    this.killed = false;
    this.rotation = Math.random() * 2 * Math.PI;
  }

  drop() {
    // play sound
    this.setAnimation(1);
  }
}
