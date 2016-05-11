var Game = require('./game');
var Ship = require('./ship');

var GameView = function(game, context){
  this.game = game;
  this.context = context;
  this.ship = this.game.addShip();
  // this.game.addDot();
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  this.lastTime = 0;
  //start the animation
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function(time){
  var timeDelta = time - this.lastTime;

  this.game.step(timeDelta);
  this.game.draw(this.context);
  this.lastTime = time;

  //every call to animate requests causes another call to animate
  requestAnimationFrame(this.animate.bind(this));
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
};

module.exports = GameView;
