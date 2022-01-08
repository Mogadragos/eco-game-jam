import { Tower } from "./Tower.mjs";

export class Campfire extends Tower {
  update() {
    for (const enemy of this.gameManager.enemies) {
      const distance = this.getDistance(enemy);
      if (distance < this.range) {
        // Attack
        /*
          Coef d'amenuisement selon distance
        */
      }
    }
  }
}
