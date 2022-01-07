export default class GameController {
  // FPS
  now;
  then;
  interval;
  delta;

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
    // Now
    this.then = performance.now();
    // Entities
    this.enemies = [];
    this.towers = [];
  }
  play() {
    this.paused = false;
    this.loop();
  }
  pause() {
    this.paused = true;
  }
  loop() {
    if (this.paused) return;
    requestAnimationFrame(() => this.loop());

    this.now = performance.now();
    this.delta = this.now - this.then;

    if (this.delta > this.interval) {
      this.then = this.now - (this.delta % this.interval);

      this.update();
      this.render();
    }
  }

  /**
   * Calculate data of each entity
   */
  update() {
    for (const enemy of this.enemies) {
      enemy.update();
    }
    for (const tower of this.towers) {
      tower.update();
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
