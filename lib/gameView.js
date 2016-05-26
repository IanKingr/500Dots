var Game = require('./game');
var Ship = require('./ship');

var GameView = function(game, context){
  this.game = game;
  this.context = context;
  this.ship = this.game.addShip();
};

var requestId;
GameView.prototype.start = function () {
  var self = this;
  this.bindKeyHandlers();
  this.lastTime = 0;
  //start the animation
  document.getElementById("pause-button").addEventListener("click", self.pause.bind(self));
  document.getElementById("explosion-type").addEventListener("click", self.toggleExplosionType.bind(self));
  document.getElementById("tutorial").addEventListener("click", self.toggleTutorialOff.bind(self));
  requestId = requestAnimationFrame(this.animate.bind(this));
};

//Pauses the game by stopping the requestAnimationFrame loop and applies CSS colorings to button
GameView.prototype.pause = function(){
  var button = document.getElementById("pause-button");
  if(requestId){
    requestId = undefined;
    button.className += " active";
    button.innerHTML = "Resume";
  } else {
    this.unpause = true;
    button.className = "pause-button";
    button.innerHTML = "Pause";
    requestId = requestAnimationFrame(this.animate.bind(this));
  }
  button.blur();
};

//Closes tutorial
GameView.prototype.toggleTutorialOff = function(){
  var button = document.getElementById("tutorial");
  this.game.tutorial = false;
  button.className = "inactive";
  button.blur();
};

// Changes among the types of explosions upon user input
GameView.prototype.toggleExplosionType = function(){
  var button = document.getElementById("explosion-type");
  var explosionVector = this.ship.explosionVector;
  explosionVector = (explosionVector + 1) % 3;
  this.ship.setExplosionType(explosionVector);
  button.innerHTML = explosionVector;
  button.blur();
};

GameView.prototype.animate = function(time){
  var timeDelta = this.unpause ? 0 : time - this.lastTime;
  if (timeDelta > 100) { timeDelta = 100; }
  this.unpause = false;
  this.game.step(timeDelta);
  this.game.draw(this.context);
  this.lastTime = time;

  //every call to animate requests causes another call to animate unless the requestId is set to undefined by #pause
  if(requestId){
    requestId = requestAnimationFrame(this.animate.bind(this));
  }
};

// Prevents page scrolling via spacebar, up, down, left, and right keys
window.addEventListener("keydown", function(e){
  var keys = [32, 37, 38, 39, 40];
  if(keys.includes(e.keyCode)){
    e.preventDefault();
  }
});

// Uses keymaster.js to bind keys to ship/game methods
GameView.prototype.bindKeyHandlers = function(){
  var ship = this.ship;
  var self = this;

  key('w', function(){ ship.boost([0, -1.5]); });
  key('a', function(){ ship.boost([-1, 0]); });
  key('s', function(){ ship.boost([0, 1.5]); });
  key('d', function(){ ship.boost([1, 0]); });
  key('up', function(){ ship.boost([0, -1.5]); });
  key('left', function(){ ship.boost([-1, 0]); });
  key('down', function(){ ship.boost([0, 1.5]); });
  key('right', function(){ ship.boost([1, 0]); });
  key('q', function(){ self.game.addDots(10); });
  key('space', function(){ ship.brake(); });
  key('enter', function(){ self.game.explosion(); });
  key('c', function(){ ship.center(); });
  key('p', function(){ self.pause(); });
  key('1', function(){ ship.setExplosionType(0); });
  key('2', function(){ ship.setExplosionType(1);});
  key('3', function(){ ship.setExplosionType(2); });
  key('x', function(){ self.toggleExplosionType(); });
};

module.exports = GameView;
