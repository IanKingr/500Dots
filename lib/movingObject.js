var Util = require('./utils');

var MovingObject = function(options){
  this.pos = options.pos;
  this.velocity = options.velocity;
  this.radius = options.radius;
  // this.height = options.height;
  // this.length = options.length;
  this.color = options.color;
  this.game = options.game;
};

var FRAME_TIME = 1000/60;
MovingObject.prototype.move = function(timeDelta){
  var self = this;
  var velocityScale = (timeDelta/FRAME_TIME)/5;

  this.pos = this.pos.map(function(pos,idx){
    return pos + self.velocity[idx] * velocityScale;
  });

  if(this.game.isOutofBounds(this.pos)) {
    this.pos = this.game.wrap(this.pos);
    // this.game.remove(this);
  }
};

MovingObject.prototype.speed = function(){
  var xComponent = Math.pow(this.velocity[0],2);
  var yComponent = Math.pow(this.velocity[1],2);
  return Math.pow(xComponent + yComponent, 1/2);
};

MovingObject.prototype.draw = function(context){
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(
    this.pos[0], this.pos[1], 15, 15, 2 * Math.PI, true
  );
  context.fill();
};

MovingObject.prototype.isCollidedWith = function(otherObject){
  var centerDist = Util.distance(this.pos, otherObject.pos);
  return centerDist < 1.4*(this.radius + otherObject.radius); //1.4 fudge factor
};

MovingObject.prototype.collideWith = function(otherObject){
  if(this.type==="Ship"){
    otherObject.color = MovingObject.colors[Math.floor(Math.random()*MovingObject.colors.length)];
  }
};

MovingObject.colors = ["AliceBlue","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DodgerBlue","FireBrick","ForestGreen","Fuchsia"];

// ,"Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

window.MovingObject = MovingObject;

module.exports = MovingObject;
