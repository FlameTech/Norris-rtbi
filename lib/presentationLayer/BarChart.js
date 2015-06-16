/**
 * Name : BarChart.js 
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

var barChartController = require('../businessLayer/BarChartController.js')

/**
 * Description: this class represents a BarChart Object and its methods
 * @class BarChart
 * @param {String} title
 * @param {String} xAxisName
 * @param {String} yAxisName
 * @param {Array} labels
 * @param {Array} data
 * @param {Object} options
 * @return BarChart
 */
function BarChart(title, xAxisName, yAxisName, labels, data, options) {
  
  //Private BarChart ID, will be used to call BarChartController methods
  var _barChartID = barChartController.createBarChart(title, xAxisName, yAxisName, labels, data, options);
  
  //Public methods, use controller methods for updating or getting the model
  /**
   * Description: this function returns this BarChart's ID
   * @method getChartInfo
   * @return Number
   */
  this.getChartInfo = function() {
    return barChartController.getChartInfo(_barChartID);
  };
  
  /**
   * Description: this function updates a graph with new values
   * @method updateInPlace
   * @param {Array} label
   * @param {Number} set
   * @param {Object} newValue
   * @return void
   */
  this.updateInPlace = function(label, set, newValue) {
    barChartController.updateInPlace(_barChartID, label, set, newValue);
  };
};

module.exports = BarChart;
