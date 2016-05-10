var Ship = require('./ship');

var Game = function(){
  var self = this;
  this.objects = [];
  // this.ships = [];



  this.objects.forEach(function(object){
    self.draw(context);
  });
};

Game.DIM_X = 800;
Game.DIM_Y = 1200;

Game.prototype.remove = function(object){
  var idx = this.store.indexOf(object);
  this.store.splice(idx,1);
};


Game.prototype.addObject = function(object){
  // if(object.type === "Ship") {
  //   this.ships.push(object)
  // }
  this.objects.push(object);
};

Game.prototype.addShip = function() {
  var ship = new Ship({
    pos: this.randomPosition(),
    game: this
  });

  this.add(ship);

  return ship;
};

Game.prototype.randomPosition = function(){
  var x = Math.round(Math.random()*Game.DIM_X);
  var y = Math.round(Math.random()*Game.DIM_Y);
  return [x , y];
};

Game.prototype.moveObjects = function(delta){
  this.objects.forEach(function(object){
    object.move(delta);
  });
};

Game.prototype.step = function(delta){
  this.moveObjects(delta);
  // this.checkCollisions();
};

Game.prototype.draw = function(context){
  context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  context.fillStyle = "#000000";
  context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.objects.forEach(function(object){
    object.draw(context);
  });
};

Game.prototype.isOutofBounds = function(pos){
  return (pos[0] > Game.DIM_X ||
          pos[0] < 0 ||
          pos[1]> Game.DIM_Y ||
          pos[1] < 0
         );
};

module.exports = Game;
