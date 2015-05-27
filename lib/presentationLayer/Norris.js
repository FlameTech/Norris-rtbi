/**
 * Name : Norris.js 
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

/**
 * Description this function exports a Norris Class
 * @method exports
 * @param {Socket} nsp
 * @return ObjectExpression
 */
module.exports = function(nsp) {
  
  //Manages the socket namespace with Norris events
  require('../businessLayer/SocketController.js').setSocket(nsp);
  
  //Require view modules to export them afterwards
  var Page = require('./Page.js');
  var LineChart = require('./LineChart.js');
  var BarChart = require('./BarChart.js');
  var MapChart = require('./MapChart.js');
  var Table = require('./Table.js');
  var PageRouter = require('./PageRouter.js');
  
  return { LineChart: LineChart
         , BarChart: BarChart
         , MapChart: MapChart
         , Table: Table
         , Page: Page
         , PageRouter: PageRouter
         }; 
};