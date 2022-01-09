import { Tower } from "./Tower.mjs";

export class Campfire extends Tower {
  maxRangeFullDamage;
  damageMaxRange;

  constructor(gameController, ctx, x, y) {
    const range = 300,
      damage = 1;
    super(gameController, ctx, x, y, range, damage, 0.4, "");

    this.maxRangeFullDamage = 0.25 * range;
    this.damageMaxRange = 0.25 * damage;
  }

  mapDamage(distance) {
    return (
      this.damage +
      ((this.damageMaxRange - this.damage) *
        (distance - this.maxRangeFullDamage)) /
        (this.range - this.maxRangeFullDamage)
    );
  }

  update(dt) {
    super.update(dt);
    if (this.shootReady) {
      for (const enemy of this.gameController.enemies) {
        const distance = this.getDistance(enemy);
        if (distance < this.range) {
          // Coef d'amenuisement selon distance
          if (distance < this.maxRangeFullDamage) enemy.takeDamage(this.damage);
          else enemy.takeDamage(this.mapDamage(distance));
        }
      }
      this.shootReady = false;
      this.time = 0;
    }
  }
}
