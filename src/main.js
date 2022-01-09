import { AudioController } from "./controller/AudioController.js";
import { GameController } from "./controller/GameController.js";
import { UIController } from "./controller/UIController.js";
import { ImageController } from "./controller/ImageController.js";
import { Level } from "./model/Level.js";
import { Road } from "./model/Road.js";
import { Spot } from "./model/Spot.js";
import { Wave } from "./model/Wave.js";
import { levelsJSON } from "./datas/levels.js";
import { animationsJSON } from "./datas/animations.js";
import { soundsJSON } from "./datas/sounds.js";

const width = 1920;
const height = 1080;

function resizeCanvases(canvases) {
  for (const id in canvases) {
    const canvas = canvases[id];
    canvas.width = width;
    canvas.height = height;
  }
}

function loadLevels(canvases) {
  let levels = [];

  //Chargement des données depuis le JSON
  const levelsJSONCopy = JSON.parse(JSON.stringify(levelsJSON));

  for (let index in levelsJSONCopy) {
    let levelImage = levelsJSONCopy[index].image;
    let levelRoads = levelsJSONCopy[index].roads.map((road) => {
      return new Road(road);
    });
    let levelSpots = levelsJSON[index].spots.map((spot) => {
      return new Spot(canvases.spots.getContext("2d"), spot.x, spot.y);
    });
    let levelWaves = levelsJSONCopy[index].waves.map((wave) => {
      return new Wave(wave.timing, wave.enemies);
    });
    let nbTurtles = levelsJSON[index].nbTurtles;
    let startingGoldAmount = levelsJSON[index].startingGoldAmount;

    levels.push(
      new Level(
        levelImage,
        levelRoads,
        levelSpots,
        levelWaves,
        nbTurtles,
        startingGoldAmount
      )
    );
  }

  return levels;
}

function getCanvases() {
  const roads = document.getElementById("roads");
  const spots = document.getElementById("spots");
  const enemies = document.getElementById("enemies");
  const towers = document.getElementById("towers");
  return { roads, spots, enemies, towers };
}

window.audioController = new AudioController();

window.imageController = new ImageController();

async function init() {
  const promises = [];
  promises.push(window.audioController.init(soundsJSON, "menu"));

  promises.push(window.imageController.init(animationsJSON));

  await Promise.all(promises);
}

window.onload = () => {
  const canvases = getCanvases();
  resizeCanvases(canvases);

  const levels = loadLevels(canvases);

  const gameController = new GameController(levels, canvases);

  const uiController = new UIController(gameController, levels);

  uiController.init();
  init();
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../sw.js");
}
