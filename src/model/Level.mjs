import { Enemy } from "./Enemy.mjs";

const width = 1920;
const height = 1080;

export class Level {
  background;
  roads;
  spots;
  waves;

  enemiesCtx;
  time;

  cooldown;

  constructor(background, roads, spots, waves) {
    this.background = background;
    this.roads = roads;
    this.spots = spots;
    this.waves = waves;

    this.enemiesCtx = document.getElementById("enemies").getContext("2d");
    this.time = 0;

    this.reset();
    this.cooldown = 0;
  }

  reset() {
    this.nbEnemies = 0;
  }

  init() {
    //#region Canvas on click
    document.getElementById("spots").onclick = (e) => {
      for (const spot of this.spots) {
        let distance = distanceBetween(
          {
            x: (e.clientX / window.innerWidth) * width,
            y: (e.clientY / window.innerHeight) * height,
          },
          {
            x: spot.x,
            y: spot.y,
          }
        );

        if (distance < spot.radius) {
          document.getElementById("hud").style.display = "";

          if (!spot.tower) {
            //Open buy menu
            document.getElementById("buyMenu").classList.remove("hidden");
          } else {
            //Open upgrade menu
            document.getElementById("upgradeMenu").classList.remove("hidden");
          }
        }
      }
    };
    //#endregion

    this.reset();

    document.getElementById("background").src = "./assets/" + this.background;
    const ctxRoads = document.getElementById("roads").getContext("2d");

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
      spot.render();
    }
  }

  update(dt) {
    if (this.waves.length) {
      if (this.time > this.waves[0].timing) {
        this.cooldown -= dt;
        if (this.waves[0].enemies.number > 0) {
          if (this.cooldown <= 0) {
            this.cooldown = this.waves[0].enemies.cooldown;
            this.waves[0].enemies.number--;

            return new Enemy(
              this.enemiesCtx,
              this.roads[0],
              "",
              this.waves[0].enemies.health,
              this.waves[0].enemies.speed
            );
          }
        } else {
          this.waves.shift();
        }
      }
    }

    this.time += dt;

    return;
  }
}

function distanceBetween(from, to) {
  return Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
}
