/**
 * Name : PageController.js 
 * Module : Norris::Lib::businessLayer 
 * Location : /norris/lib/businessLayer
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.2     2015/05/12    Meneguzzo Francesco
 * -------------------------------------------------
 *  Revisone modulo
 * =================================================
 *  0.0.1     2015/05/06    Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

var NorrisError = require('../utils/NorrisError.js');
var ProgressiveID = require('../utils/ProgressiveID.js');

var barChartController = require('./BarChartController.js');
var lineChartController = require('./LineChartController.js');
var mapChartController = require('./MapChartController.js');
var tableController = require('./TableController.js');
var activeResourcesController = require('./ActiveResourcesController.js')

var PageModel = require('../dataLayer/PageModel.js');
var BarChartModel = require('../dataLayer/BarChartModel.js');
var MapChartModel = require('../dataLayer/MapChartModel.js');
var LineChartModel = require('../dataLayer/LineChartModel.js');
var TableModel = require('../dataLayer/TableModel.js');

var BarChart = require('../presentationLayer/BarChart.js');
var LineChart = require('../presentationLayer/LineChart.js');
var MapChart = require('../presentationLayer/MapChart.js');
var Table = require('../presentationLayer/Table.js');

/**
 * Description: this function create an object to set the page options
 * @method createPageOptions
 * @param { JSON } options
 * @return Object
 */
var createPageOptions = function(options) {
  var pageWidth = 0;
  var columns = 2;
  if(options !== undefined) {
    for(var property in options) {
      if(property == "pageWidth") {
        if(typeof options[property] !== "number" || options[property] < 800) {
          new NorrisError(2002);
        }
        else {
          pageWidth = options[property];
        }
      }
      else if(property == "columns") {
        if(typeof options[property] !== "number" || options[property]<1 || options[property]>12) {
          new NorrisError(2003);
        }
        else {
          columns = options[property];
        }
      }
      else {
        new NorrisError(2004);
      }
    }
  }
  return { "pageWidth": pageWidth
         , "columns": columns
         }
};

/**
 * Description: this function create a page with the specified parameters
 * @method createPage
 * @param { String } title
 * @param { Object } options
 * @return Number
 */
exports.createPage = function(title, options) {
  //A page must have a title
  if(title==null) {
    new NorrisError(2000);
  }
  var id = ProgressiveID();
  
  var pageOptions = createPageOptions(options);
  
  var page = new PageModel(id, title, pageOptions.pageWidth, pageOptions.columns);
  activeResourcesController.storePage(id, page);
  
  return id;
};
  
//Method for getting page properties
/**
 * Description: this function return page's data and information
 * @method getPageInfo
 * @param { Number } pageID
 * @return Object
 */
exports.getPageInfo = function(pageID) {
  
  var graphs = [];
  var page = activeResourcesController.retrievePage(pageID);
  //Get contained charts info
  for(var i = 0 ; i<page._data.length ; i++) {
    var graph = activeResourcesController.retrieveGraph(page._data[i]);
    if(graph instanceof LineChartModel) {
      graphs.push(lineChartController.getChartInfo(graph._id));
    }
    else if(graph instanceof BarChartModel) {
      graphs.push(barChartController.getChartInfo(graph._id));
    }
    else if(graph instanceof MapChartModel) {
      graphs.push(mapChartController.getChartInfo(graph._id));
    }
    else if(graph instanceof TableModel) {
      graphs.push(tableController.getChartInfo(graph._id));
    }
    else {
      new NorrisError(2001);
    }     
  }
  var data = { "type": "Page"
             , "id": page._id
             , "title": page._title
             , "data": graphs
             , "pageWidth": page._pageWidth
             , "columns": page._columns
             };
  return data;
};

//Method for adding a graph to a page
/**
 * Description: this method add a graph to a page
 * @method addGraphToPage
 * @param { Number } pageID
 * @param { Object } graph
 * @return void
 */
exports.addGraphToPage = function(pageID, graph) {
  if(  graph instanceof LineChart 
    || graph instanceof BarChart 
    || graph instanceof MapChart
    || graph instanceof Table
    ) { activeResourcesController.retrievePage(pageID)._data.push(graph.getChartInfo().id); }
  else {
    new NorrisError(2001); //graph parameter isn't of graph type
  }
};
