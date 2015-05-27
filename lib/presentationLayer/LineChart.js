/**
 * Name : LineChart.js 
 * Module : Norris::Lib::PresentationLayer
 * Location : /norris/lib/presentationLayer
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/12      Cardin Andrea
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var lineChartController = require('../businessLayer/LineChartController.js')

/**
 * Description this class rappresent a LineChart Object and its methods
 * @class LineChart
 * @param {String} title
 * @param {String} xAxisName
 * @param {String} yAxisName
 * @param {Array} labels
 * @param {Array} data
 * @param {JSON} options
 * @return LineChart
 */
function LineChart(title, xAxisName, yAxisName, labels, data, options) {
  
  //Private LineChart ID, will be used to call LineChartController methods
  var _lineChartID = lineChartController.createLineChart(title, xAxisName, yAxisName, labels, data, options);
  
  //Public methods, use controller methods to change or get the model
  /**
   * Description this function return this LineChart's ID
   * @method getChartInfo
   * @return CallExpression
   */
  this.getChartInfo = function() {
    return lineChartController.getChartInfo(_lineChartID);
  };
  
  /**
   * Description this function update a graph with new values
   * @method updateInPlace
   * @param {Array} label
   * @param {Number} set
   * @param {JSON} newValue
   * @return void
   */
  this.updateInPlace = function(label, set, newValue) {
    lineChartController.updateInPlace(_lineChartID, label, set, newValue);
  };
  
  /**
   * Description this function update a graph with new values
   * @method updateStream
   * @param {Array} newLabel
   * @param {JSON} newValue
   * @return void
   */
  this.updateStream = function(newLabel, newValue) {
    lineChartController.updateStream(_lineChartID, newLabel, newValue);
  };
};

module.exports = LineChart;
