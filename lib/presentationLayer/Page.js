/**
 * Name : Page.js 
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

var pageController = require('../businessLayer/PageController.js');

/**
 * Description this class rappresent a Page Object and its method
 * @class Page
 * @param {String} title
 * @param {JSON} options
 * @return Page
 */
function Page(title, options) {
  
  //Private PageModel, will be modified with PageController methods
  var _pageID = pageController.createPage(title, options);
  
  //Public methods, use controller methods to change or get the model
  /**
   * Description this function return this Page's ID
   * @method getPageInfo
   * @return CallExpression
   */
  this.getPageInfo = function() {
    return pageController.getPageInfo(_pageID);
  };
  
  /**
   * Description this function add a graph to this Page.
   * @method addGraph
   * @param {Object} graph
   * @return void
   */
  this.addGraph = function(graph) {
    pageController.addGraphToPage(_pageID, graph);
  };
};

module.exports = Page; 
