/**
 * Name : FrontSvc.js 
 * Module : Norris::App::Services
 * Location : /norris/app/script/services/
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/04/08      Cardin Andrea
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

angular.module("Services")
  .factory('FrontSvc', [ function () {
    /**
     * Description
     * Manipulates raw page data, and creates the row and column structure of the page
     * @method createRows
     * @param {Array} data
     * @param {Number} columns
     * @return Array
     */
    var createRows = function (data , columns) {
      var rowNumber = Math.ceil(data.length/columns);
      var outData = [];
      for(var i=0;i<rowNumber;i++){
        var util = [];
        for(var j=0;j<columns && data.length>0;j++)
          util.push(data.shift());
        outData.push(util);
      }
      return outData;
    };
    
    return { createRows : createRows }
  }]);