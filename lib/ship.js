var Ship = require('./ship');
var MovingObject = require('./movingObject');
var Util = require('./utils');

var Ship = function(options){
  options.length = Ship.length;
  options.height = Ship.height;
  options.velocity = options.velocity || [0, 0];
  options.color = "yellow";

  MovingObject.call(this, options);
};

Ship.length = 10;
Ship.height = 20;

Util.inherits(Ship, MovingObject);

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
  if(this.velocity[0] < 7){
    boostFactor = [3, 1];
    console.log("Boosting x! " + this.velocity[0]);
  } else if(this.velocity[1] < 7){
    boostFactor = [1, 3];
    console.log("Boosting y! " + this.velocity[1]);
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
