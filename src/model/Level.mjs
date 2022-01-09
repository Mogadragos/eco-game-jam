import { Enemy } from "./Enemy.mjs";
import { DrawPath } from "./PathDrawer.mjs";

export class Level {
  background;
  roads;
  spots;
  waves;
  golds;

  enemiesCtx;
  time;

  cooldown;

  constructor(background, roads, spots, waves, nbTurtles) {
    this.background = background;
    this.roads = roads;
    this.spots = spots;
    this.waves = waves;
    this.nbTurtles = nbTurtles;

    this.enemiesCtx = document.getElementById("enemies").getContext("2d");
    this.time = 0;

    this.reset();
    this.cooldown = 0;
  }

  reset() {
    this.nbEnemies = 0;

    for (let spot of this.spots) {
      spot.tower = null;
    }

    this.golds = 200;
  }

  init() {
    this.reset();

    document.getElementById("background").src = "./assets/" + this.background;
    const ctxRoads = document.getElementById("roads").getContext("2d");

    ctxRoads.strokeStyle = "#a3a2af";
    ctxRoads.lineWidth = 50;
    ctxRoads.lineCap = "round";

    for (const road of this.roads) {
      for (const curve of road.curves) {
        DrawPath(ctxRoads, curve, "../../assets/Chemin_texture.png");
      }
    }

    for (const spot of this.spots) {
      spot.render();
    }

    document.getElementById("goldAmount").innerHTML = this.golds;
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
              this.waves[0].enemies.health,
              this.waves[0].enemies.speed,
              this.waves[0].enemies.gold
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
