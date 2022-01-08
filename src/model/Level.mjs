import { Enemy } from "./Enemy.mjs";

export class Level {
  background;
  roads;

  enemiesCtx;

  aliveTime;

  constructor(background, roads) {
    this.background = background;
    this.roads = roads;

    this.enemiesCtx = document.getElementById("enemies").getContext("2d");

    this.reset();
  }
  reset() {
    this.aliveTime = 0;
    this.nbEnemies = 0;
  }
  init() {
    this.reset();

    document.getElementById("background").src = "./assets/" + this.background;
    const ctx = document.getElementById("roads").getContext("2d");

    this.enemiesCtx.clearRect(
      0,
      0,
      this.enemiesCtx.canvas.width,
      this.enemiesCtx.canvas.height
    );

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.strokeStyle = "#9cec5b";
    ctx.lineWidth = 40;
    ctx.lineCap = "round";

    //context.lineTo(canvas.width, canvas.height);
    for (const road of this.roads) {
      for (const curve of road.curves) {
        ctx.beginPath();
        ctx.moveTo(curve.x1, curve.y1);
        ctx.bezierCurveTo(
          curve.x2,
          curve.y2,
          curve.x3,
          curve.y3,
          curve.x4,
          curve.y4
        );
        ctx.stroke();
      }
    }
  }
  update(dt) {
    this.aliveTime += dt;
    if (this.nbEnemies < 1) {
      this.nbEnemies++;
      return new Enemy(this.enemiesCtx, this.roads[0], "");
    }
    return;
  }
}
