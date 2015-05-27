/**
 * Name : ColorsSvc.js 
 * Module : Norris::App::Services
 * Location : /norris/app/script/services/
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/04/10      Sartor Michele
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

angular.module("Services")
  .factory('ColorsSvc', [function() {
    /**
     * Description
     * Converts a decimal (0-255) number into an Hex string
     * @method componentToHex
     * @param {Number} component
     * @return String
     */
    var componentToHex = function(component) {
      //To string!
      var hexComponent = component.toString(16);
      return hexComponent.length == 1 ? "0" + hexComponent : hexComponent;
    };
    return { 
          /**
            * Description
            * Converts an RGB syntax color into an Hex one
            * @method rgbToHex
            * @param {Number} r
            * @param {Number} g
            * @param {Number} b
            * @return String
            */
            rgbToHex: function(r, g, b) {
               return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b); 
             }
           };
  }]);
      
    