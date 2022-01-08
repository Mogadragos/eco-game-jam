import { Enemy } from "./Enemy.mjs";

export class Level {
  background;
  roads;
  spots;
  waves;

  enemiesCtx;

  constructor(background, roads, spots, waves) {
    this.background = background;
    this.roads = roads;
    this.spots = spots;
    this.waves = waves;

    this.enemiesCtx = document.getElementById("enemies").getContext("2d");

    this.reset();
  }

  reset() {
    this.nbEnemies = 0;
  }

  init() {
    this.reset();

    document.getElementById("background").src = "./assets/" + this.background;
    const ctxRoads = document.getElementById("roads").getContext("2d");
    const ctxSpots = document.getElementById("spots").getContext("2d");

    ctxRoads.strokeStyle = "#9cec5b";
    ctxRoads.lineWidth = 40;
    ctxRoads.lineCap = "round";

    for (const road of this.roads) {
      for (const curve of road.curves) {
        ctxRoads.beginPath();
        ctxRoads.moveTo(curve.x1, curve.y1);
        ctxRoads.bezierCurveTo(
          curve.x2,
          curve.y2,
          curve.x3,
          curve.y3,
          curve.x4,
          curve.y4
        );
        ctxRoads.stroke();
      }
    }

    for (const spot of this.spots) {
      console.log(spot);
      spot.render();
    }
  }

  update(dt) {
    if (this.nbEnemies < 1) {
      this.nbEnemies++;
      return new Enemy(this.enemiesCtx, this.roads[0], "", 50);
    }
    return;
  }
}
