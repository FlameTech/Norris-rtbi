 /**
 * Name : ActiveResourcesController.js 
 * Module : Norris::Lib::BusinessLayer
 * Location : /norris/Lib/businessLayer
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

//This method is used to store a graph reference when the object is created
/**
 * Description: this function add a graph to the list of active graph
 * @method storeGraph
 * @param { Number } id
 * @param { Object } graph
 * @return void
 */
exports.storeGraph = function(id, graph) {
  //If two graphs aren't the same object, their id is different
  activeResources.graphs[id]=graph;
};

//This method is used to store a page reference when the object is created
/**
 * Description: this function add a page to the list of active page
 * @method storePage
 * @param { Number } id
 * @param { Page } page
 * @return void 
 */
exports.storePage = function(id, page) {
  //If two pages aren't the same object, their id is different
  activeResources.pages[id]=page;
};

//This method returns the reference of a graph with a certain id
/**
 * Description: this function return a single graph
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

//This method returns the reference of a page with a certain id
/**
 * Description: this function return a single page
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