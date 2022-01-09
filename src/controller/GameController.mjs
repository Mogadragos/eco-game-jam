export class GameController {
  // FPS
  then;
  interval;
  delta;

  // Execution
  paused;
  prevUpdate;

  // Level
  levels;
  level;

  // Entities
  enemies;
  towers;

  // DOM
  canvasesDict;
  canvases;
  dynamicCanvases;

  constructor(levels, canvases) {
    // FPS
    const fps = 60;
    this.interval = 1000 / fps;

    this.levels = levels;

    this.canvasesDict = canvases;
    this.canvases = Object.values(canvases);
    this.dynamicCanvases = [canvases.enemies, canvases.towers];
  }

  setLevel(index) {
    this.reset();
    this.level = this.levels[index];
    this.level.init();
  }

  clearCanvases(canvases) {
    // Canvases
    for (const canvas of canvases) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  reset() {
    this.clearCanvases(this.canvases);
    // Entities
    this.enemies = [];
    this.towers = [];
  }

  play() {
    this.paused = false;
    this.then = performance.now();
    this.loop();
  }

  pause() {
    this.paused = true;
  }

  loop() {
    if (this.paused) return;
    requestAnimationFrame(() => this.loop());

    const now = performance.now();
    this.delta = now - this.then;

    if (this.delta > this.interval) {
      this.then = now - (this.delta % this.interval);

      this.update();
      this.clearCanvases(this.dynamicCanvases);
      this.render();
    }
  }

  addTower(tower) {
    this.towers.push(tower);
  }

  /**
   * Calculate data of each entity
   */
  update() {
    const dt = this.delta / 1000 / 2;
    const temp_enemies = this.level.update(dt);
    if (temp_enemies) this.enemies = this.enemies.concat(temp_enemies);

    for (const tower of this.towers) {
      tower.update(dt);
    }

    let enemy_index = this.enemies.length;
    while (enemy_index--) {
      const enemy = this.enemies[enemy_index];
      if (enemy.killed) {
        this.enemies.splice(enemy_index, 1);
      }
      enemy.update(dt);
    }
  }

  /**
   * Render each entity
   */
  render() {
    let enemy_index = this.enemies.length;
    while (enemy_index--) {
      this.enemies[enemy_index].render();
    }
    for (const tower of this.towers) {
      tower.render();
    }
  }
}
