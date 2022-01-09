import { TowerWithTarget } from "../model/TowerWithTarget.mjs";
import { Campfire } from "../model/Campfire.mjs";

const width = 1920;
const height = 1080;
export class UIController {
  gameController;
  menuOpened;
  currentSelectedSpot;

  constructor(gameController) {
    this.menuOpened = true;
    this.gameController = gameController;
    this.currentSelectedSpot = null;
  }

  init() {
    this.initMenu();

    //#region HUD
    document.getElementById("resume").onclick = () => {
      window.audioController.play("click");
      document.getElementById("pause").style.display = "";
      document.getElementById("golds").style.display = "";
      document.getElementById("pauseMenu").style.display = "none";
      document.getElementById("hud").style.display = "none";
      this.resume();
    };

    document.getElementById("exit").onclick = () => {
      window.audioController.play("click");
      document.getElementById("pause").style.display = "none";
      document.getElementById("golds").style.display = "none";
      document.getElementById("pauseMenu").style.display = "none";
      document.getElementById("hud").style.display = "none";
      document.getElementById("ui").style.display = "";
      this.quit();
    };

    document.getElementById("pause").onclick = () => {
      window.audioController.play("click");
      document.getElementById("pause").style.display = "none";
      document.getElementById("golds").style.display = "none";
      document.getElementById("pauseMenu").style.display = "";
      document.getElementById("hud").style.display = "";
      this.pause();
    };
    //#endregion

    //#region hud menus
    document.getElementById("closeBuyMenu").onclick = (e) => {
      window.audioController.play("click");
      this.closeBuyMenu();
    };
    document.getElementById("closeUpgradeMenu").onclick = (e) => {
      window.audioController.play("click");
      this.closeUpgradeMenu();
    };
    //#endregion

    //#region Buy menu
    document.getElementById("volunteer").onclick = () => {
      if (this.currentSelectedSpot && this.gameController.level.golds >= 50) {
        window.audioController.play("buy_sell");
        this.gameController.level.golds -= 50;
        const width = 80;
        let newTower = new TowerWithTarget(
          this.gameController,
          this.gameController.canvasesDict.towers.getContext("2d"),
          this.currentSelectedSpot.x,
          this.currentSelectedSpot.y,
          width,
          (width * 181) / 120,
          250,
          2,
          0.5,
          [window.imageController.animations.volunteerIdle]
        );

        this.currentSelectedSpot.tower = newTower;
        this.gameController.addTower(newTower);
        this.closeBuyMenu();
      } else {
        window.audioController.play("error");
      }
    };

    document.getElementById("campfire").onclick = () => {
      if (this.currentSelectedSpot && this.gameController.level.golds >= 100) {
        window.audioController.play("buy_sell");
        this.gameController.level.golds -= 100;
        let newTower = new Campfire(
          this.gameController,
          this.gameController.canvasesDict.towers.getContext("2d"),
          this.currentSelectedSpot.x,
          this.currentSelectedSpot.y
        );

        this.currentSelectedSpot.tower = newTower;
        this.gameController.addTower(newTower);
        this.closeBuyMenu();
      } else {
        window.audioController.play("error");
      }
    };

    document.getElementById("policeman").onclick = () => {
      if (this.currentSelectedSpot && this.gameController.level.golds >= 200) {
        window.audioController.play("buy_sell");
        this.gameController.level.golds -= 200;
        const width = 80;
        let newTower = new TowerWithTarget(
          this.gameController,
          this.gameController.canvasesDict.towers.getContext("2d"),
          this.currentSelectedSpot.x,
          this.currentSelectedSpot.y,
          width,
          (width * 231) / 120,
          500,
          10,
          1.2,
          [window.imageController.animations.policemanIdle]
        );

        this.currentSelectedSpot.tower = newTower;
        this.gameController.addTower(newTower);
        this.closeBuyMenu();
      } else {
        window.audioController.play("error");
      }
    };

    //#endregion

    //#region Spot click
    document.getElementById("towers").onclick = (e) => {
      for (const spot of this.gameController.level.spots) {
        let distance = distanceBetween(
          {
            x: (e.clientX / window.innerWidth) * width,
            y: (e.clientY / window.innerHeight) * height,
          },
          {
            x: spot.x,
            y: spot.y,
          }
        );

        if (distance < spot.radius) {
          window.audioController.play("click");
          this.currentSelectedSpot = spot;
          document.getElementById("hud").style.display = "";

          if (!spot.tower) {
            //Open buy menu
            document.getElementById("buyMenu").classList.remove("hidden");
          } else {
            //Open upgrade menu
            document.getElementById("upgradeMenu").classList.remove("hidden");
          }
        }
      }
    };
    //#endregion
  }

  initMenu() {
    for (let btn of document.getElementsByClassName("navBtn")) {
      btn.onclick = (e) => {
        window.audioController.play("click");
        this.navigate(e.srcElement.dataset.to);
      };
    }

    for (let btn of document.getElementsByClassName("levelBtn")) {
      btn.onclick = (e) => {
        window.audioController.play("click");
        document.getElementById("game").style.display = "";
        document.getElementById("pause").style.display = "";
        document.getElementById("golds").style.display = "";
        document.getElementById("levelSelection").style.display = "none";
        document.getElementById("ui").style.display = "none";
        this.startLevel(e.srcElement.dataset.level);
      };
    }
  }

  navigate(destination) {
    const screens = document.getElementsByClassName("screen");

    for (let screen of screens) {
      screen.style.display = "none";
      if (destination == screen.id) screen.style.display = "";
    }
  }

  startLevel(index) {
    this.gameController.setLevel(index);
    this.resume();
    window.audioController.play("ambient");
  }

  pause() {
    this.gameController.pause();
  }

  resume() {
    this.gameController.play();
  }

  quit() {
    this.pause();
    this.navigate("menu");
    window.audioController.play("menu");
  }

  closeBuyMenu() {
    document.getElementById("buyMenu").classList.add("hidden");
    document.getElementById("hud").style.display = "none";
  }

  closeUpgradeMenu() {
    document.getElementById("upgradeMenu").classList.add("hidden");
    document.getElementById("hud").style.display = "none";
  }
}

function distanceBetween(from, to) {
  return Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
}
