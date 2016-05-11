var MovingObject = require('./movingObject');
var Util = require('./utils');

var Missile = function(options){
  options.length = Missile.length;
  options.height = Missile.height;
  options.velocity = options.velocity || [Math.random()*10, Math.random()*10];
  options.color = "yellow";

  MovingObject.call(this, options);
};

Util.inherits(Missile, MovingObject);

Missile.prototype.correctPath = function(shipPos){
  var correctionFactor = 1;
  var x_vel = this.velocity[0];
  var y_vel = this.velocity[1];
  // if(this.speed() < 50){ correctionFactor = 1;}
  // 30 seems like a good max speed
  // add missiles when count hits certain points (# destroyed, time elapsed, score count)

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

Missile.prototype.brake = function(velocity){
  var brakeFactor = 0.95;
  return velocity * brakeFactor;
};

Missile.prototype.speed = function(){
  var xComponent = Math.pow(this.velocity[0],2);
  var yComponent = Math.pow(this.velocity[1],2);
  return Math.pow(xComponent + yComponent, 1/2);
};

// Missile.prototype.boost = function(movementDelta){
//   var x_vel = this.velocity[0];
//   var y_vel = this.velocity[1];
//
//   // Improves handling of ship for fast direction changes
//   if ((x_vel < 0 && movementDelta[0] > 0) || (x_vel > 0 && movementDelta[0] < 0)){
//     this.resetVelocity([-0.8*x_vel, y_vel]);
//   } else if ((y_vel < 0 && movementDelta[1] > 0) || (y_vel > 0 && movementDelta[1] < 0)) {
//     this.resetVelocity([x_vel, -0.8*y_vel]);
//   }
//
//   var boostFactor = [1, 1];
//   if(this.velocity[0] < 3){
//     boostFactor = [1.5, 1];
//     console.log("Boosting! " + this.velocity[0]);
//   } else if(this.velocity[1] < 3){
//     boostFactor = [1, 1.5];
//     console.log("Boosting! " + this.velocity[1]);
//   }
//
//   this.velocity = this.velocity.map(function(move, idx){
//     return movementDelta[idx] * boostFactor[idx] + move;
//   });
// };

Missile.length = 4;
Missile.height = 4;
Missile.prototype.type = "Missile";

module.exports = Missile;
