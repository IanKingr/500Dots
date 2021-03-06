var Ship = require('./ship');
var Dot = require('./Dot');

var Game = function(){
  var self = this;
  this.dots = [];
  this.ships = [];
  this.keys = [];
  this.tutorial = true;
  var startingDots = 500;

  this.addDots(startingDots);
};

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.KEYS = [];
Game.HELPTEXT = 1;

Game.prototype.remove = function(object){
  var idx = this.store.indexOf(object);
  this.store.splice(idx,1);
};

Game.prototype.addObject = function(object){
  if(object.type === "Ship"){
    this.ships.push(object);
  } else if(object.type === "Dot"){
    this.dots.push(object);
  }
};

Game.prototype.addDots = function(number) {
  for (var i = 0; i < number; i++) {
    var dot = new Dot({
      pos: this.randomPosition(),
      game: this,
      velocity: [0, 0]
    });

    this.addObject(dot);
  }
};

// Adds a ship (the main white dot)
Game.prototype.addShip = function() {
  var ship = new Ship({
    pos: this.center(),
    game: this,
    velocity: [0, 0]
  });

  this.addObject(ship);

  return ship;
};

// Returns position at center of the canvas
Game.prototype.center = function(){
  var x = Math.round(Game.DIM_X/2);
  var y = Math.round(Game.DIM_Y/2);
  return [x, y];
};

// Returns a random position
Game.prototype.randomPosition = function(){
  var x = Math.round(Math.random()*Game.DIM_X);
  var y = Math.round(Math.random()*Game.DIM_Y);
  return [x , y];
};

Game.prototype.moveObjects = function(delta){
  var self = this;
  this.allObjects().forEach(function(object){
    if(object.type === "Dot"){
      object.correctPath(self.ships[0].pos);
    }
    object.move(delta);
  });
};

Game.prototype.wrap = function(pos){
  var x; var y;
  pos[0] >= Game.DIM_X || pos[0] <= 0 ? x = Math.abs(Game.DIM_X - Math.abs(pos[0])) : x = pos[0];
  pos[1] >= Game.DIM_Y || pos[1] <= 0 ? y = Math.abs(Game.DIM_Y - Math.abs(pos[1])) : y = pos[1];

  return [x, y];
};

Game.prototype.allObjects = function(){
  return this.ships.concat(this.dots);
};

Game.prototype.explosion = function(){
  var self = this;
  this.dots.forEach(function(obj){
    obj.explosion(self.ships[0]);
  });
};

Game.prototype.checkCollisions = function () {
  var game = this;

  // Code logic for calculating collisions between any 2 objects
  // this.allObjects().forEach(function (obj1) {
  //   game.allObjects().forEach(function (obj2) {
  //     if (obj1 == obj2) {
  //       // don't allow self-collision
  //       return;
  //     }
  //
  //     if (obj1.type === "Dot" && obj2.type === "Dot"){
  //       return;
  //     }
  //
  //     if (obj1.isCollidedWith(obj2)) {
  //       obj1.collideWith(obj2);
  //     }
  //   });
  // });

  // Logic for calculating collisions between the ship and dots
  this.allObjects().forEach(function(object){
    if(object.type === "Dot"){
      if (object.isCollidedWith(game.ships[0])) {
        game.ships[0].collideWith(object);
      }
    }
  });
};

Game.prototype.step = function(delta){
  this.moveObjects(delta);
  this.checkCollisions();
};

Game.prototype.draw = function(context){
  context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  context.fillStyle = "#000000";
  context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach(function(object){
    object.draw(context);
  });

  context.font = '20px Oleo Script';
  context.fillStyle = "#FFFFFF";
  context.fillText("Dots: " + this.dots.length, 10, 20);

  if(this.tutorial){
    context.font = '20px Roboto';
    context.fillText(this.instructions(), 20, Game.DIM_Y * 0.9);
  }
};

Game.prototype.incrementInstruction = function(e){
  if(Game.KEYS.includes(e.keyCode)){
    Game.HELPTEXT += 1;
    Game.KEYS = [];
  }
};

Game.prototype.instructions = function(){
  var self = this;
  var helptext = Game.HELPTEXT;
  var text;
  switch (helptext) {
    case 1:
      Game.KEYS = [87, 65, 83, 68];
      text = "Use W,A,S,D to move the main white dot";
      window.addEventListener("keydown", self.incrementInstruction);
      break;
    case 2:
      text = "Great! Now press and hold Spacebar to come to a stop";
      Game.KEYS = [32];
      break;
    case 3:
      text = "Press C. This will center your dot";
      Game.KEYS = [67];
      break;
    case 4:
      text = "Now wait a couple seconds and let the dots gather in real close to your dot... then press Enter multiple times";
      Game.KEYS = [13];
      break;
    case 5:
      text = "Explosion!";
      Game.KEYS = [13];
      break;
    case 6:
      text = "You can toggle between the explosion types for different effects with X or by clicking the button in the top right";
      Game.KEYS = [88];
      break;
    case 7:
      text = "Add more dots by holding Q! (Current max is ~4000)";
      Game.KEYS = [81];
      break;
    default:
      text = "Have fun!";
      window.removeEventListener("keydown", self.incrementInstruction);
  }

  return text;
};

Game.prototype.isOutofBounds = function(pos){
  return (pos[0] > Game.DIM_X ||
          pos[0] < 0 ||
          pos[1]> Game.DIM_Y ||
          pos[1] < 0
         );
};

window.Game = Game;

module.exports = Game;
