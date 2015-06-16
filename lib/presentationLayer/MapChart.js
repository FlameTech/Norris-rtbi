/**
 * Name : MapChart.js 
 * Module : Norris::Lib::PresentationLayer
 * Location : /norris/lib/presentationLayer
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/12    Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var mapChartController = require('../businessLayer/MapChartController.js')

/**
 * Description: this class represent a MapChart Object and its methods
 * @class MapChart
 * @param {String} title
 * @param {Array} paths
 * @param {Array} points
 * @param {String} centerLatitude
 * @param {String} centerLongitude
 * @param {Object} options
 * @return MapChart
 */
function MapChart(title, paths, points, centerLatitude, centerLongitude, options) {
  
  //Private MapChartModel, will be modified with BarChartController methods
  var _mapChartID = mapChartController.createMapChart(title, paths, points, centerLatitude, centerLongitude, options);
  
  //Public methods, use controller methods to change or get the model
  /**
   * Description: this function returns this MapChart's ID
   * @method getChartInfo
   * @return CallExpression
   */
  this.getChartInfo = function() {
    return mapChartController.getChartInfo(_mapChartID);
  };
  
  /**
   * Description: this function updates a MapChart with a new position
   * @method updateInPlace
   * @param {Array} point
   * @param {String} latitude
   * @param {String} longitude
   * @return void 
   */
  this.updateInPlace = function(point, latitude, longitude) {
    mapChartController.updateInPlace(_mapChartID, point, latitude, longitude);
  };
  
  /**
   * Description: this function updates a MapChart with a new position
   * @method updateMovie
   * @param {Array} newPoints
   * @return void
   */
  this.updateMovie = function(newPoints) {
    mapChartController.updateMovie(_mapChartID, newPoints);
  };
};

module.exports = MapChart; 
