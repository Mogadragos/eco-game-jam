import { GameController } from "./controller/GameController.mjs";
import { Level } from "./model/Level.mjs";
import { Road } from "./model/Road.mjs";

const width = 1920,
  height = 1080;

const canvases = document.getElementsByTagName("canvas");

function resizeCanvases() {
  for (const canvas of canvases) {
    canvas.width = width;
    canvas.height = height;
  }
  return;
  let canvas_width = screen.width;
  let canvas_height = screen.height;
  let ratio = width / height;
  if (canvas_width / canvas_height > ratio) {
    canvas_height = canvas_width * ratio;
  } else {
    canvas_width = canvas_height / ratio;
  }
  for (const canvas of canvases) {
    canvas.width = canvas_width;
    canvas.height = canvas_height;
  }
}

resizeCanvases();

const levels = [];

levels.push(
  new Level("background-1.jpg", [
    new Road(
      {
        x1: width,
        y1: height / 6,
        x2: (width * 5) / 6,
        y2: (height * 2) / 6,
        x3: (width * 2) / 3,
        y3: (height * 2) / 6,
        x4: width / 2,
        y4: height / 2,
      },
      {
        x1: width / 2,
        y1: height / 2,
        x2: width / 3,
        y2: (height * 4) / 6,
        x3: width / 6,
        y3: (height * 4) / 6,
        x4: 40,
        y4: height / 2,
      }
    ),
  ])
);

const gameController = new GameController();

gameController.setLevel(levels[0]);

gameController.start();

window.addEventListener("keydown", (e) => {
  if (e.key == " ") {
    if (gameController.paused) gameController.play();
    else gameController.pause();
  }
});
