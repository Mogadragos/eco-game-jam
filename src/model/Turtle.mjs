import { Entity } from "./Entity.mjs";

export class Turtle extends Entity {
  killed;
  dropped;
  positionTime;
  road;
  constructor(ctx, x, y) {
    super(ctx, x, y, 100, 100, Math.PI / 2, [
      window.imageController.animations.turtleIdle,
      window.imageController.animations.turtleGrabbed,
      window.imageController.animations.turtleDropped,
    ]);
    this.dropped = false;
    this.killed = false;
    this.rotation = Math.random() * 2 * Math.PI;
  }

  drop(positionTime, road) {
    this.dropped = true;
    // play sound
    this.setAnimation(1);
  }
}
