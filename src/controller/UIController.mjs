import { Tower } from "../model/Tower.mjs";

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
      document.getElementById("pause").style.display = "";
      document.getElementById("pauseMenu").style.display = "none";
      document.getElementById("hud").style.display = "none";
      this.resume();
    };

    document.getElementById("exit").onclick = () => {
      document.getElementById("pause").style.display = "none";
      document.getElementById("pauseMenu").style.display = "none";
      document.getElementById("hud").style.display = "none";
      document.getElementById("ui").style.display = "";
      this.quit();
    };

    document.getElementById("pause").onclick = () => {
      document.getElementById("pause").style.display = "none";
      document.getElementById("pauseMenu").style.display = "";
      document.getElementById("hud").style.display = "";
      this.pause();
    };
    //#endregion

    //#region hud menus
    document.getElementById("closeBuyMenu").onclick = (e) => {
      this.closeBuyMenu();
    };
    document.getElementById("closeUpgradeMenu").onclick = (e) => {
      this.closeUpgradeMenu();
    };
    //#endregion

    //#region create tower
    document.getElementById("benevole").onclick = () => {
      if (this.currentSelectedSpot) {
        let newTower = new Tower(
          this.gameController,
          this.gameController.canvasesDict.towers.getContext("2d"),
          this.currentSelectedSpot.x,
          this.currentSelectedSpot.y,
          250,
          2,
          0.5,
          ""
        );

        this.currentSelectedSpot.tower = newTower;
        this.gameController.addTower(newTower);
        this.closeBuyMenu();
      }
    };
    //#endregion

    //#region Canvas on click
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
        this.navigate(e.srcElement.dataset.to);
      };
    }

    for (let btn of document.getElementsByClassName("levelBtn")) {
      btn.onclick = (e) => {
        document.getElementById("game").style.display = "";
        document.getElementById("pause").style.display = "";
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
