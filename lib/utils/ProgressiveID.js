/**
 * Name : ProgressiveID.js 
 * Module : Norris::Lib::Utils 
 * Location : /norris/lib/utils
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1    2015/04/05    Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

/**
 * Description: this function create a single ID
 * @method progressivID
 * @return Number 
 */
var ProgressiveID = (function() {
  
  //Setting default value
  var id = 0;

  //When called, returns the value of the current id and then increments itself
  return function() {
    return id++;
  };
})();

module.exports = ProgressiveID;