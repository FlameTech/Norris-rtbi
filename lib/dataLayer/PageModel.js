/**
 * name : PageModel.js 
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
 * Description this class rappresent a Page Object
 * @class PageModel
 * @param {Number} id
 * @param {String} title
 * @param {Number} pageWidth
 * @param {Number} columns
 * @return Page
 */
function PageModel(id, title, pageWidth, columns) {
  
  //Data model created by controller methods
  this._id = id
  this._title = title;
  this._data = [];
  this._pageWidth = pageWidth;
  this._columns = columns;
}

module.exports = PageModel;