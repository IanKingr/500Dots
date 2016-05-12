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
  requestId = requestAnimationFrame(this.animate.bind(this));
};

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
};

GameView.prototype.animate = function(time){
  var timeDelta = this.unpause ? 0 : time - this.lastTime;
  this.unpause = false;

  this.game.step(timeDelta);
  this.game.draw(this.context);
  this.lastTime = time;

  //every call to animate requests causes another call to animate
  if(requestId){
    requestId = requestAnimationFrame(this.animate.bind(this));
  }
};


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
  key('q', function(){ self.game.addDot(); });
  key('space', function(){ ship.brake(); });
  key('enter', function(){ self.game.explosion(); });
  key('p', function(){ self.pause(); });  
};

module.exports = GameView;
