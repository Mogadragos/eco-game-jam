export class UIController {
  gameController;
  menuOpened;

  constructor(gameController) {
    this.menuOpened = true;
    this.gameController = gameController;
  }

  init() {
    this.initMenu();

    //#region HUD
    document.getElementById("resume").onclick = () => {
      document.getElementById("pause").style.display = "";
      document.getElementById("pauseMenu").style.display = "none";
      this.resume();
    };

    document.getElementById("exit").onclick = () => {
      document.getElementById("pause").style.display = "";
      document.getElementById("hud").style.display = "none";
      document.getElementById("pauseMenu").style.display = "none";
      this.quit();
    };

    document.getElementById("pause").onclick = () => {
      document.getElementById("pause").style.display = "none";
      document.getElementById("pauseMenu").style.display = "";
      this.pause();
    };
    //#endregion

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Escape":
          if (this.menuOpened) this.resume();
          else this.pause();
          break;
      }
    });
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
        document.getElementById("hud").style.display = "";
        document.getElementById("levelSelection").style.display = "none";
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
