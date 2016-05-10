var Util = require('./utils');

var MovingObject = function(options){
  this.pos = options.pos;
  this.velocity = options.velocity;
  this.height = options.height;
  this.length = options.length;
  this.color = options.color;
  this.game = options.game;
};

var FRAME_TIME = 1000/60;
MovingObject.prototype.move = function(timeDelta){
  var self = this;
  var velocityScale = timeDelta/FRAME_TIME;

  this.pos = this.pos.map(function(pos,idx){
    return pos + self.velocity[idx] * velocityScale;
  });

  if(this.game.OutOfBounds(this.pos)) {
    this.game.remove();
  }
};

MovingObject.prototype.draw = function(context){
  context.fillStyle = "blue";
  var x_pos = context.pos[0];
  var y_pos = context.pos[1];
  var length = context.length;
  var height = context.height;

  context.fillRect(x_pos,y_pos,length,height);
};

MovingObject.prototype.isCollidedWith = function(otherObject){
  if ((otherObject.y_pos < this.pos[1] + (this.height/2.0)) &&
      (otherObject.y_pos > this.pos[1] - (this.height/2.0))) {
        return ((otherObject.x_pos > this.pos[0] + this.length/2.0) &&
                (otherObject.x_pos < this.pos[0] - this.length/2.0));
  }
  return false;
};
