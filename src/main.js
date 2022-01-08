import { AudioController } from "./controller/AudioController.mjs";
import { GameController } from "./controller/GameController.mjs";
import { UIController } from "./controller/UIController.mjs";
import { Level } from "./model/Level.mjs";
import { Road } from "./model/Road.mjs";

const width = 1920,
  height = 1080;

function resizeCanvases(canvases) {
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

const levels = [];
initLevels();

function initLevels() {
  //Level 1
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

  //Level 2
  levels.push(
    new Level("background-1.jpg", [
      new Road(
        {
          x1: 0,
          y1: height / 3,
          x2: width / 4,
          y2: height,
          x3: width / 4,
          y3: 0,
          x4: width / 2,
          y4: height / 8,
        },
        {
          x1: width / 2,
          y1: height / 8,
          x2: width / 2 + width / 2,
          y2: height / 1.5,
          x3: width / 2,
          y3: height,
          x4: width / 2,
          y4: height - height / 4,
        }
      ),
    ])
  );
}

const gameController = new GameController(levels);

const uiController = new UIController(gameController);

const audioController = new AudioController();

window.onload = () => {
  const canvases = document.getElementsByTagName("canvas");
  resizeCanvases(canvases);

  uiController.init();
  audioController.init();
};
