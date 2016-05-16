# 500 Dots

[500 Dots live][github]

[github]: iankingr.github.io/500Dots/ 

A graphical experiment utilizing javascript, canvas, and CSS. 500+ Dots zip across the screen, all attracted a lone white dot you control.

## Features & Implementation

![in motion screenshot](/docs/inMotion.png)

500 Dots provides a grand rendering of 500+ dots as they fly across the screen, trying to catch up with your cursor. Users can control the cursor and thereby influence the dots, by navigating it with the "WASD" and Spacebar keys. If the dots get too clumped up, blow them away! Hit spacebar to launch an explosion that sends the nearby dots flying away in beautiful patterns. Sometimes the best results occur after all the dots have gathered on the central cursor.

It features the following features and technical implementations.

* Web application built with Javascript, canvas, and CSS

* Dots are individual objects with their own velocity vectors, collision detection, size and colors.

* On collision with the cursor, dots change color.

* User can add more dots to the screen for a more vibrant experience (cap is around 1500 in current implementation)

* Onclick and keypress events allow the user to navigate the white dot (cursor) around the screen and pause and resume the animation at any time.

* Controls have been tuned to allow for quick movements in the four primary directions

* Path Correction function enables the 500+ smaller dots to follow the cursor

* Explosion algorithm alters the velocity vectors of all dots with an impulse that falls off cubic or quadratically with respect to distance from the cursor.

### Controls

To help with maneuvering, the velocity vectors were tweaked with braking factors to help keep the cursor from continuously increasing speed when switching directions. That said, they were also tweaked so the ship can quickly switch from left to right or up to down without having to completely decelerate first. To help overcome a slow start-up a boost factor was also applied when the ship's velocity is low.

```javascript
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

Ship.prototype.brake = function(){
  this.velocity[0] *= 0.4;
  this.velocity[1] *= 0.4;
};
```

### Explosion!

The dots often catch up and clump together around the cursor, making it difficult to achieve a beautiful array of dots. That's why an Explosion action was implemented to help blow the dots apart in a splendid display of color! The explosion utilizes cubic or quadratic falloff when applying force to surrounding dots - meaning that dots closer to the cursor get blown further away and those father away may hardly feel any effect at all! Plans to implement more algorithms and allow toggling between them is a future goal.

![blown away!](/docs/blownAway.png)

```javascript
MovingObject.prototype.explosion = function(ship){
  var xDistance = this.pos[0] - ship.pos[0];
  var yDistance = this.pos[1] - ship.pos[1];
  var normalDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2),1/2);

  // Prevents the explosion vector from spiraling out of control
  xDistance = xDistance < 0.5 && xDistance > 0 ? 0.5 : xDistance;
  xDistance = xDistance > -0.5 && xDistance < 0 ? -0.5 : xDistance;
  yDistance = yDistance < 0.5 && yDistance > 0 ? 0.5 : yDistance;
  yDistance = yDistance > -0.5 && yDistance < 0 ? -0.5 : yDistance;

  var explosiveForce = 10;

  //Various types of vectors that can be applied for different effects
  var explosionVectors = {
    //Small Star + cross on repeats
    0: [xDistance * Math.pow(explosiveForce/normalDistance, 1),
          yDistance * Math.pow(explosiveForce/normalDistance, 1)],

    //Atom
    1: [xDistance * Math.pow(explosiveForce/normalDistance, 2),
      yDistance * Math.pow(explosiveForce/normalDistance, 2)],

    //Square
    2: [explosiveForce / Math.pow(xDistance, 3),
      explosiveForce / Math.pow(yDistance, 3)]
  };

  //By default the Square style is being used. Plans to allow toggling between them planned for the future
  var explosionVector = explosionVectors[2];
  this.velocity = Util.sumArrays(explosionVector, this.velocity);
};
```

## Future Directions for the Project

In addition to the features already implemented, here are a few of the stretch goals I plan to work on.

* Toggling of additional explosion effects

* Altering of braking, size, and other dot parameters with sidebar buttons.

* Code optimization to push the upper limit of objects rendered.
