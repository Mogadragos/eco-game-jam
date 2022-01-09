export class Entity {
  controller;

  ctx;
  x;
  y;
  width;
  height;
  rotation;
  allAnimations;
  animation;
  spriteIndex;

  constructor(ctx, x, y, width, height, allAnimations) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotation = 0;
    this.allAnimations = allAnimations;
    this.setAnimation(0);
  }

  setAnimation(index) {
    this.animation = this.allAnimations[index];
    this.spriteIndex = 0;
  }

  nextSprite() {
    this.spriteIndex++;
    if (!(this.spriteIndex < this.animation.length)) {
      this.spriteIndex = 0;
    }
  }

  update() {}
  render() {
    try {
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.rotation);
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
