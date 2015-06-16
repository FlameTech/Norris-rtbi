/**
 * Name : Table.js 
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

var tableController = require('../businessLayer/TableController.js')

/**
 * Description: this class represents a Table Object and its methods
 * @class Table
 * @param {String} title
 * @param {Array} headers
 * @param {Array} data
 * @param {Object} options
 * @return Table
 */
function Table(title, headers, data, options) {
  
  //Private Table ID, will be used to call TableController methods
  var _tableID = tableController.createTable(title, headers, data, options);
  
  //Public methods, use controller methods to change or get the model
  /**
   * Description: this function returns the Table's ID
   * @method getChartInfo
   * @return CallExpression
   */
  this.getChartInfo = function() {
    return tableController.getChartInfo(_tableID);
  };
  
  /**
   * Description: this function updates a Table with new values, in place
   * @method updateInPlace
   * @param {Number} row
   * @param {Number} column
   * @param {String} newValue
   * @param {Object} options
   * @return void
   */
  this.updateInPlace = function(row, column, newValue, options) {
    tableController.updateInPlace(_tableID, row, column, newValue, options);
  };
  
  /**
   * Description: this function updates a Table with new values, stream
   * @method updateStream
   * @param {Array} data
   * @param {Object} options
   * @return void
   */
  this.updateStream = function(data, options) {
    tableController.updateStream(_tableID, data, options);
  };
};

module.exports = Table;
