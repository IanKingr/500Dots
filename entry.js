require("./style.css");
var Game = require("./lib/game");
var GameView = require("./lib/gameView");

document.addEventListener("DOMContentLoaded", function(){
  var canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  var context = canvasEl.getContext("2d");
  var game = new Game();
  new GameView(game, context).start();
});
