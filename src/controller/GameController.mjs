export default class GameController {
  constructor() {
    // this.audioController;
    // this.UIController;

    const fps = 30;
    this.now;
    this.then = performance.now();
    this.interval = 1000 / fps;
    this.delta;

    this.play();
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

      // draw
    }
  }
}
