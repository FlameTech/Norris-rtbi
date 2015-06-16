/**
 * Name : TableModel.js 
 * Module : Norris::Lib::DataLayer
 * Location : /norris/lib/dataLayer
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.2     2015/05/12    Sartor Michele
 * -------------------------------------------------
 *  Revisone modulo
 * =================================================
 *  0.0.1     2015/04/05    Sartor Michele
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

/**
 * Description: this class represents a Table Object
 * @class TableModel
 * @param {Number} id
 * @param {String} title
 * @param {Array} headers
 * @param {Array} data
 * @param {Object} options
 * @return Table
 */
function TableModel(id, title, headers, data, options) {

  //Data model created by controller methods
  this._id = id;
  this._title = title;
  this._headers = headers;
  this._data = data;
  //Optional properties
  this._insertPosition = options.insertPosition;     //Either bottom or top
  this._orderBy = options.orderBy;
  this._displayedLines = options.displayedLines;
  this._showBorder = options.border;
  this._colorColumn = options.colorColumn;
  this._colorRow = options.colorRow;
  this._colorCell = options.colorCell;
  this._colorColumnFont = options.colorColumnFont;
  this._colorRowFont = options.colorRowFont;
  this._colorFont = options.colorFont;
  this._format = options.format;
  this._rowsLimit = options.rowsLimit;
} 

module.exports = TableModel;