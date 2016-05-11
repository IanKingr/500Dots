/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var Game = __webpack_require__(5);
	var GameView = __webpack_require__(9);

	document.addEventListener("DOMContentLoaded", function(){
	  var canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;

	  var context = canvasEl.getContext("2d");
	  var game = new Game();
	  new GameView(game, context).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {\n    background: lightgray;\n}\n\n.main {\n  display: flex;\n  flex-direction: row;\n}\n\n.info {\n  margin: 10px;\n  font-family: 'Roboto', sans-serif;\n  font-weight: 300;\n}\n\nh2 {\n  font-family: 'Roboto', sans-serif;\n  font-weight: 400;\n}\n\nli {\n  margin: 5px;\n}\n\nul {\n    /*-webkit-padding-start: 1px;*/\n}\n\nh1 {\n  font-family: 'Oleo Script', cursive;\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Ship = __webpack_require__(6);
	var Dot = __webpack_require__(11);

	var Game = function(){
	  var self = this;
	  this.objects = [];
	  this.dots = [];
	  this.ships = [];

	  this.addDot();
	  this.addDot();
	};

	Game.DIM_X = 1000;
	Game.DIM_Y = 600;

	Game.prototype.remove = function(object){
	  var idx = this.store.indexOf(object);
	  this.store.splice(idx,1);
	};


	Game.prototype.addObject = function(object){
	  if(object.type === "Ship"){
	    this.ships.push(object);
	  } else if(object.type === "Dot"){
	    console.log("Dot Added");
	    this.dots.push(object);
	  }
	  // this.objects.push(object);
	};

	Game.prototype.addDot = function() {
	  var dot = new Dot({
	    pos: this.randomPosition(),
	    game: this,
	    velocity: [0, 0]
	  });

	  this.addObject(dot);
	  return dot;
	};


	Game.prototype.addShip = function() {
	  var ship = new Ship({
	    pos: this.randomPosition(),
	    game: this,
	    velocity: [0, 0]
	  });

	  this.addObject(ship);

	  return ship;
	};

	Game.prototype.randomPosition = function(){
	  var x = Math.round(Math.random()*Game.DIM_X);
	  var y = Math.round(Math.random()*Game.DIM_Y);
	  return [x , y];
	};

	Game.prototype.moveObjects = function(delta){
	  var self = this;
	  this.allObjects().forEach(function(object){
	    // console.log("moving Objects");
	    if(object.type === "Dot"){
	      // debugger;
	      // console.log("Correcting Path");
	      object.correctPath(self.ships[0].pos);
	    }
	    object.move(delta);
	  });
	};

	Game.prototype.wrap = function(pos){
	  var x; var y;
	  pos[0] >= Game.DIM_X || pos[0] <= 0 ? x = Math.abs(Game.DIM_X - Math.abs(pos[0])) : x = pos[0];
	  pos[1] >= Game.DIM_Y || pos[1] <= 0 ? y = Math.abs(Game.DIM_Y - Math.abs(pos[1])) : y = pos[1];

	  return [x, y];
	};

	Game.prototype.allObjects = function(){
	  return this.ships.concat(this.dots);
	};

	Game.prototype.checkCollisions = function () {
	  var game = this;

	  this.allObjects().forEach(function (obj1) {
	    game.allObjects().forEach(function (obj2) {
	      if (obj1 == obj2) {
	        // don't allow self-collision
	        return;
	      }

	      if (obj1.type === "Dot" && obj2.type === "Dot"){
	        return;
	      }

	      if (obj1.isCollidedWith(obj2)) {
	        obj1.collideWith(obj2);
	      }
	    });
	  });
	};

	Game.prototype.step = function(delta){
	  this.moveObjects(delta);
	  this.checkCollisions();
	};

	Game.prototype.draw = function(context){
	  context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  context.fillStyle = "#000000";
	  context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  this.allObjects().forEach(function(object){
	    object.draw(context);
	  });

	  context.font = '20px Audiowide';
	  context.fillStyle = "#FFFFFF";
	  context.fillText("Number of Dots: " + this.dots.length, 10, 20);
	};

	Game.prototype.isOutofBounds = function(pos){
	  return (pos[0] > Game.DIM_X ||
	          pos[0] < 0 ||
	          pos[1]> Game.DIM_Y ||
	          pos[1] < 0
	         );
	};

	window.Game = Game;

	module.exports = Game;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Ship = __webpack_require__(6);
	var MovingObject = __webpack_require__(7);
	var Util = __webpack_require__(8);

	var Ship = function(options){
	  // options.length = Ship.length;
	  // options.height = Ship.height;
	  options.radius = Ship.radius;
	  options.velocity = options.velocity || [0, 0];
	  options.color = "white";

	  MovingObject.call(this, options);
	};

	Ship.length = 10;
	Ship.height = 20;
	Ship.radius = 5;

	Util.inherits(Ship, MovingObject);

	Ship.prototype.brake = function(){
	  this.velocity[0] *= 0.8;
	  this.velocity[1] *= 0.8; 
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
	  // debugger;
	  if(Math.abs(this.velocity[0]) < 20){
	    boostFactor = [10, 1];
	    // console.log("Boosting x! " + this.velocity[0]);
	  }

	  if(Math.abs(this.velocity[1]) < 20){
	    boostFactor = [1, 10];
	    // console.log("Boosting y! " + this.velocity[1]);
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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(8);

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


/***/ },
/* 8 */
/***/ function(module, exports) {

	var Util = {

	  distance: function(obj1Pos, obj2Pos){
	    return Math.pow(Math.pow(obj1Pos[0] - obj2Pos[0],2) + Math.pow(obj1Pos[1] - obj2Pos[1],2), 1/2);
	  },

	  inherits: function(childClass, parentClass){
	    var Surrogate = function(){};
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  }
	};




	module.exports = Util;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(5);
	var Ship = __webpack_require__(6);

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


/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(7);
	var Util = __webpack_require__(8);

	var Dot = function(options){
	  // options.length = Dot.length;
	  // options.height = Dot.height;
	  options.radius = Dot.radius;
	  options.velocity = options.velocity || [Math.random()*10, Math.random()*10];
	  options.color = "red";

	  MovingObject.call(this, options);
	};

	Util.inherits(Dot, MovingObject);

	Dot.prototype.correctPath = function(shipPos){
	  var correctionFactor = 1;
	  var x_vel = this.velocity[0];
	  var y_vel = this.velocity[1];
	  // if(this.speed() < 50){ correctionFactor = 1;}
	  // 30 seems like a good max speed
	  // add dots when count hits certain points (# destroyed, time elapsed, score count)
	  // set a speed cap on dots


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



	// Dot.prototype.boost = function(movementDelta){
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

	Dot.length = 4;
	Dot.height = 4;
	Dot.radius = 3;
	Dot.prototype.type = "Dot";

	module.exports = Dot;


/***/ }
/******/ ]);