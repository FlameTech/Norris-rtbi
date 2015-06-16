 /**
 * Name : ActiveResourcesController.js 
 * Module : Norris::Lib::BusinessLayer
 * Location : /norris/lib/businessLayer
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/14    Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

var activeResources = require('../dataLayer/ActiveResources.js');
var NorrisError = require('../utils/NorrisError.js');

/**
 * Description: this function adds a graph to the list of active graphs
 * @method storeGraph
 * @param { Number } id
 * @param { Object } graph
 * @return void
 */
exports.storeGraph = function(id, graph) {
  //If two graphs aren't the same object, their IDs are different
  activeResources.graphs[id]=graph;
};

/**
 * Description: this function adds a page to the list of active pages
 * @method storePage
 * @param { Number } id
 * @param { Page } page
 * @return void 
 */
exports.storePage = function(id, page) {
  //If two pages aren't the same object, their IDs are different
  activeResources.pages[id]=page;
};

/**
 * Description: this function returns a single graph
 * @method retrieveGraph
 * @param { Number } id
 * @return Object
 */
exports.retrieveGraph = function(id) {
  var graph = activeResources.graphs[id]
  if(graph === undefined)
    new NorrisError(7000);
  return graph;
}

/**
 * Description: this function returns a single page
 * @method retrievePage
 * @param { Number } id
 * @return Page
 */
exports.retrievePage = function(id) {
  var page = activeResources.pages[id];
  if(page === undefined)
    new NorrisError(7001);
  return page;
}