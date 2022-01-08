import { GameController } from "./controller/GameController.mjs";
import { Level } from "./model/Level.mjs";
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

const gameController = new GameController();

gameController.setLevel(levels[0]);

gameController.start();
