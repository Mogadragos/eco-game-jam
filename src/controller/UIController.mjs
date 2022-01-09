import { Tower } from "../model/Tower.mjs";

export class UIController {
  gameController;
  menuOpened;
  currentSelectedSpot;
  levels;

  constructor(gameController, levels) {
    this.menuOpened = true;
    this.gameController = gameController;
    this.currentSelectedSpot = null;
    this.levels = levels;
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
      document.getElementById("buyMenu").classList.add("hidden");
      document.getElementById("hud").style.display = "none";
    };
    document.getElementById("closeUpgradeMenu").onclick = (e) => {
      document.getElementById("upgradeMenu").classList.add("hidden");
      document.getElementById("hud").style.display = "none";
    };
    //#endregion

    //#region create tower
    document.getElementById("benevole").onclick = () => {
      if (this.currentSelectedSpot)
        this.gameController.addTower(
          new Tower(
            this.gameController,
            this.gameController.canvasesDict.towers.getContext("2d"),
            this.currentSelectedSpot.x,
            this.currentSelectedSpot.y,
            70,
            2,
            0.5,
            ""
          )
        );
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
}
