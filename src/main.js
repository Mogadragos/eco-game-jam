import { AudioController } from "./controller/AudioController.mjs";
import { GameController } from "./controller/GameController.mjs";
import { UIController } from "./controller/UIController.mjs";
import { Level } from "./model/Level.mjs";
import { Road } from "./model/Road.mjs";
import { Spot } from "./model/Spot.mjs";
import { Wave } from "./model/Wave.mjs";
import { levelsJSON } from "./datas/levels.js";

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
  for (let index in levelsJSON) {
    let levelImage = levelsJSON[index].image;
    let levelRoads = levelsJSON[index].roads.map((road) => {
      return new Road(road);
    });

    let levelSpots = levelsJSON[index].spots.map((spot) => {
      return new Spot(canvases.spots.getContext("2d"), spot.x, spot.y, "");
    });
    let levelWaves = levelsJSON[index].waves.map((wave) => {
      return new Wave(wave.timing, wave.enemies);
    });

    levels.push(new Level(levelImage, levelRoads, levelSpots, levelWaves));
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

const audioController = new AudioController();

window.onload = () => {
  const canvases = getCanvases();
  resizeCanvases(canvases);

  const levels = loadLevels(canvases);

  const gameController = new GameController(levels, canvases);

  const uiController = new UIController(gameController, levels);

  uiController.init();
  audioController.init();
};
