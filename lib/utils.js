var Util = function(){

};


Util.inherits = function(childClass, parentClass){
  var Surrogate = function(){};
  Surrogate.prototype = parentClass.prototype;
  childClass.prototype = new Surrogate();
  childClass.prototype.constructor = childClass;
};

module.exports = Util;
