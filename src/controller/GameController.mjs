export class GameController {
  // FPS
  then;
  interval;
  delta;

  // Execution dt
  prevUpdate;

  // Level
  level;

  // Entities
  enemies;
  towers;

  constructor() {
    // FPS
    const fps = 30;
    this.interval = 1000 / fps;
  }

  setLevel(level) {
    this.level = level;
  }

  start() {
    this.level.start();
    this.reset();
    this.play();
  }

  reset() {
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
