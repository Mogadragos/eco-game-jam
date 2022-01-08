import { AudioController } from "./controller/AudioController.mjs";
import { GameController } from "./controller/GameController.mjs";
import { UIController } from "./controller/UIController.mjs";
import { Level } from "./model/Level.mjs";
import { Road } from "./model/Road.mjs";

const width = 1920,
  height = 1080;

function resizeCanvases(canvases) {
  for (const id in canvases) {
    const canvas = canvases[id];
    canvas.width = width;
    canvas.height = height;
  }
}

function genLevels() {
  return [
    //Level 1
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
    ]),

    //Level 2
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
    ]),
  ];
}

function getCanvases() {
  const roads = document.getElementById("roads");
  const spots = document.getElementById("spots");
  const enemies = document.getElementById("enemies");
  const towers = document.getElementById("towers");
  return { roads, spots, enemies, towers };
}

const audioController = new AudioController();

async function init() {
  await audioController.init(
    [
      {
        name: "sample",
        url: "./assets/sample-9s.mp3",
        sound: true,
      },
      {
        name: "ambient",
        url: "./assets/skyrim-main-theme-w-mp3-link.mp3",
        loop: true,
      },
    ],
    "ambient"
  );
}

window.onload = () => {
  const canvases = getCanvases();
  resizeCanvases(canvases);

  const gameController = new GameController(genLevels(), canvases);

  const uiController = new UIController(gameController);

  uiController.init();
  init();
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../sw.js");
}
