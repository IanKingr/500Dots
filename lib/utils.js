var Util = {

  distance: function(obj1Pos, obj2Pos){
    return Math.pow(Math.pow(obj1Pos[0] - obj2Pos[0],2) + Math.pow(obj1Pos[1] - obj2Pos[1],2), 1/2);
  },

  inherits: function(childClass, parentClass){
    var Surrogate = function(){};
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  },

  sumArrays: function(array1, array2){
    return array1.map(function (num, idx) {
      return num + array2[idx];
    });
  }
};




module.exports = Util;
