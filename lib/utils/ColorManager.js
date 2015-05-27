/**
 * Name : ColorGenerator.js 
 * Module : Norris::Lib::Utils
 * Location : /norris/lib/utils
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/04/05       Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica Modulo
 * =================================================
 */

'use strict';

/**
 * Description: this function create an array of different colors
 * @method colorGenerator
 * @param {Number} num
 * @return Array 
 */
exports.colorGenerator = function(num) {
  var colors = new Array();
  //Creates 64 default colors
  for(var i = 0 ; i<4 ; i++) {
    for(var j = 0 ; j<4 ; j++) {
      for(var k = 0 ; k<4 ; k++) {
        colors.push({ "red": (i*100+(240-(k*60)))%255
                    , "green": (200+(j*100))%255
                    , "blue": (k*60)%255
                    });
      }
    }
  }
  //Fills an array with num default colors in order, if >64 it resets
  var dataColor = new Array();
  
  for(var i = 0 ; i<num ; i++) {
    dataColor.push(colors[i]);
  };
  
  return dataColor;
};

/**
 * Description: checks the consistency of an hexadecimal color and return an object with an RGB representation of the hex color; returns empty object otherwise
 * @method hexColorParse
 * @param {String} color
 * @return Object
 */
exports.hexColorParse = function(color) {
  var rgbcol = {};
  //checks if the parameter is a string, if not returns empty object
  if(typeof color !== 'string') {
    return rgbcol;
  }
  //checks if the string starts with the '#' character and assigns the correct regex
  var regex;
  if(color.charAt(0) == "#") {
    regex = /^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
  }
  else {
    regex = /^([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
  }
  //executes the regex
  var arr = regex.exec(color);
  //checks the result of the regex execution, if arr is empty it means that the regex didnt match, so the function returns empty object. otherwise converts the hex color into an object with its RGB representation and returns it
  if(!arr) {
    return rgbcol;
  }
  rgbcol.red = parseInt(arr[1], 16);
  rgbcol.green = parseInt(arr[2], 16);
  rgbcol.blue = parseInt(arr[3], 16);
  //return JSON.stringify(rgbcol);
  return rgbcol;
};
