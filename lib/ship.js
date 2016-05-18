// The ship is the main white dot that the user directs

var Ship = require('./ship');
var MovingObject = require('./movingObject');
var Util = require('./utils');

var Ship = function(options){
  options.radius = Ship.radius;
  options.velocity = options.velocity || [0, 0];
  options.color = "white";
  this.explosionVector = 2;

  MovingObject.call(this, options);
};

Ship.radius = 5;

Util.inherits(Ship, MovingObject);

// Brake method reduces the velocity of the ship to 40%
Ship.prototype.brake = function(){
  this.velocity[0] *= 0.4;
  this.velocity[1] *= 0.4;
};

// Moves the ship given user input (movementDelta)
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

  // To increase initial speed, arbitrary boost factor is applied when the ship's velocity is below a certain limit
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

// Assigns the ship a new velocity
Ship.prototype.resetVelocity = function(newVelocity){
  this.velocity = newVelocity;
};

// Centers the ship in the middle of the canvas and stops it in place
Ship.prototype.center = function (){
  this.pos = this.game.center();
  this.resetVelocity([0,0]);
};

Ship.prototype.toggleExplosion = function (num){
  this.explosionVector = num;
};

Ship.prototype.type = "Ship";

module.exports = Ship;
