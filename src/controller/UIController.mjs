export class UIController {
  gameController;
  menuOpened;

  constructor(gameController) {
    this.menuOpened = true;
    this.gameController = gameController;
  }

  init() {
    this.initMenu();

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
    this.menuOpened = true;
    document.getElementById("ui").style.display = "";
    this.navigate("menu");
  }

  resume() {
    this.menuOpened = false;
    document.getElementById("ui").style.display = "none";
    this.navigate();
    this.gameController.play();
  }
}
