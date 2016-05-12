var Ship = require('./ship');
var Dot = require('./Dot');

var Game = function(){
  var self = this;
  this.objects = [];
  this.dots = [];
  this.ships = [];
  var starting10xDots = 50;

  for (var i = 0; i < starting10xDots; i++) {
    this.add10dots();
  }
};

Game.DIM_X = 1000;
Game.DIM_Y = 600;

Game.prototype.remove = function(object){
  var idx = this.store.indexOf(object);
  this.store.splice(idx,1);
};


Game.prototype.addObject = function(object){
  if(object.type === "Ship"){
    this.ships.push(object);
  } else if(object.type === "Dot"){
    console.log("Dot Added");
    this.dots.push(object);
  }
};

Game.prototype.add10dots = function() {
  for (var i = 0; i < 10; i++) {
    var dot = new Dot({
      pos: this.randomPosition(),
      game: this,
      velocity: [0, 0]
    });

    this.addObject(dot);
  }
};


Game.prototype.addShip = function() {
  var ship = new Ship({
    pos: this.randomPosition(),
    game: this,
    velocity: [0, 0]
  });

  this.addObject(ship);

  return ship;
};

Game.prototype.randomPosition = function(){
  var x = Math.round(Math.random()*Game.DIM_X);
  var y = Math.round(Math.random()*Game.DIM_Y);
  return [x , y];
};

Game.prototype.moveObjects = function(delta){
  var self = this;
  this.allObjects().forEach(function(object){
    // console.log("moving Objects");
    if(object.type === "Dot"){
      // debugger;
      // console.log("Correcting Path");
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

  this.allObjects().forEach(function (obj1) {
    game.allObjects().forEach(function (obj2) {
      if (obj1 == obj2) {
        // don't allow self-collision
        return;
      }

      if (obj1.type === "Dot" && obj2.type === "Dot"){
        return;
      }

      if (obj1.isCollidedWith(obj2)) {
        obj1.collideWith(obj2);
      }
    });
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

  context.font = '20px Audiowide';
  context.fillStyle = "#FFFFFF";
  context.fillText("Number of Dots: " + this.dots.length, 10, 20);
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
