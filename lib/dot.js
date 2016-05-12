var MovingObject = require('./movingObject');
var Util = require('./utils');

var Dot = function(options){
  options.radius = Dot.radius;
  options.velocity = options.velocity || [Math.random() * 10, Math.random() * 10];
  options.color = "red";

  MovingObject.call(this, options);
};

Util.inherits(Dot, MovingObject);

Dot.prototype.correctPath = function(shipPos){
  var correctionFactor = 1;
  var x_vel = this.velocity[0];
  var y_vel = this.velocity[1];

  if(shipPos[0] < this.pos[0]){
    //If it overshoots ship, it brakes and starts moving in the other direction
    if(x_vel > 0){ x_vel = this.brake(x_vel); }
    this.velocity[0] = x_vel - correctionFactor;
  } else if (shipPos[0] > this.pos[0]){
    if(x_vel < 0){ x_vel = this.brake(x_vel); }
    this.velocity[0] = x_vel + correctionFactor;
  }

  if(shipPos[1] < this.pos[1]){
    if(y_vel > 0){ y_vel = this.brake(y_vel); }
    this.velocity[1] = y_vel - correctionFactor;
  } else if (shipPos[1] > this.pos[1]){
    if(y_vel < 0){ y_vel = this.brake(y_vel); }
    this.velocity[1] = y_vel + correctionFactor;
  }
};

Dot.prototype.brake = function(velocity){
  var brakeFactor = 0.97;
  return velocity * brakeFactor;
};

Dot.radius = 1.5;
Dot.prototype.type = "Dot";

module.exports = Dot;
