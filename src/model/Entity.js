export class Entity {
  controller;

  ctx;
  x;
  y;
  width;
  height;
  rotation;
  idle;
  idleTime;
  allAnimations;
  animation;
  isAnimation;
  currentSpriteTime;
  spriteTime;
  spriteIndex;

  constructor(
    ctx,
    x,
    y,
    width,
    height,
    initialRotation = 0,
    allAnimations = [],
    spriteTime = 0
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.initialRotation = initialRotation;
    this.rotation = 0;
    this.currentSpriteTime = 0;
    this.allAnimations = allAnimations;
    this.isAnimation = false;
    this.setIdle(0, spriteTime);
  }

  setIdle(index, spriteTime) {
    if (this.allAnimations[index]) {
      this.idle = this.animation = this.allAnimations[index];
      this.idleTime = this.spriteTime = spriteTime;
      this.spriteIndex = 0;
      this.currentSpriteTime = 0;
    }
  }

  setAnimation(index, spriteTime) {
    if (this.allAnimations[index]) {
      this.isAnimation = true;
      this.animation = this.allAnimations[index];
      this.spriteTime = spriteTime;
      this.spriteIndex = 0;
      this.currentSpriteTime = 0;
    }
  }

  nextSprite() {
    this.spriteIndex++;
    if (!(this.spriteIndex < this.animation.length)) {
      this.spriteIndex = 0;
      if (this.isAnimation) {
        this.isAnimation = false;
        this.animation = this.idle;
        this.spriteTime = this.idleTime;
        this.currentSpriteTime = 0;
      }
    }
  }

  update(dt) {
    if (this.spriteTime > 0) {
      this.currentSpriteTime += dt;
      if (this.currentSpriteTime > this.spriteTime) {
        this.nextSprite();
        this.currentSpriteTime = 0;
      }
    }
  }

  render() {
    try {
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.initialRotation + this.rotation);
      this.ctx.translate(
        -this.x - 0.5 * this.width,
        -this.y - 0.5 * this.height
      );

      this.ctx.beginPath();
      this.ctx.drawImage(
        this.animation[this.spriteIndex],
        this.x,
        this.y,
        this.width,
        this.height
      );
    } catch (e) {
      this.ctx.fillStyle = "#BF40BF";
      this.ctx.rect(this.x, this.y, this.width, this.height);
      this.ctx.fill();
    } finally {
      this.ctx.closePath();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }
}
