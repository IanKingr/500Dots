var Ship = require('./ship');
var MovingObject = require('./movingObject');
var Util = require('./utils');

var Ship = function(options){
  options.radius = Ship.radius;
  options.velocity = options.velocity || [0, 0];
  options.color = "white";

  MovingObject.call(this, options);
};

Ship.radius = 5;

Util.inherits(Ship, MovingObject);

Ship.prototype.brake = function(){
  console.log("braking");
  this.velocity[0] *= 0.4;
  this.velocity[1] *= 0.4;
};

Ship.prototype.boost = function(movementDelta){
  var x_vel = this.velocity[0];
  var y_vel = this.velocity[1];
  var brakeFactor = 0.8;

  // Improves handling of ship for fast direction changes
  if ((x_vel < 0 && movementDelta[0] > 0) || (x_vel > 0 && movementDelta[0] < 0)){
    this.resetVelocity([-brakeFactor*x_vel, y_vel]);
  } else if ((y_vel < 0 && movementDelta[1] > 0) || (y_vel > 0 && movementDelta[1] < 0)) {
    this.resetVelocity([x_vel, -brakeFactor*y_vel]);
  }

  var boostFactor = [1, 1];
  if(Math.abs(this.velocity[0]) < 20){
    boostFactor = [10, 1];
  }

  if(Math.abs(this.velocity[1]) < 20){
    boostFactor = [1, 10];
  }

  this.velocity = this.velocity.map(function(velocity, idx){
    return velocity + movementDelta[idx] * boostFactor[idx];
  });
};

Ship.prototype.resetVelocity = function(newVelocity){
  this.velocity = newVelocity;
};

Ship.prototype.type = "Ship";

module.exports = Ship;
