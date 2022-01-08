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
  canvases;

  constructor(levels, canvases) {
    // FPS
    const fps = 30;
    this.interval = 1000 / fps;

    this.levels = levels;

    this.canvases = canvases;
  }

  setLevel(index) {
    this.reset();
    this.level = this.levels[index];
    this.level.init();
  }

  reset() {
    // Canvases
    for (const id in this.canvases) {
      const canvas = this.canvases[id];
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
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
      this.render();
    }
  }

  /**
   * Calculate data of each entity
   */
  update() {
    const dt = this.delta / 1000;
    const temp_enemies = this.level.update(dt);
    if (temp_enemies) this.enemies = this.enemies.concat(temp_enemies);

    for (const enemy of this.enemies) {
      enemy.update(dt);
    }
    for (const tower of this.towers) {
      tower.update(dt);
    }
  }

  /**
   * Render each entity
   */
  render() {
    for (const enemy of this.enemies) {
      enemy.render();
    }
    for (const tower of this.towers) {
      tower.render();
    }
  }
}
