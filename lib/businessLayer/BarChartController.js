/**
 * Name : BarChartController.js 
 * Module : Norris::Lib::BusinessLayer
 * Location : /norris/lib/businessLayer
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.2     2015/05/12    Cardin Andrea
 * -------------------------------------------------
 *  Revisione modulo
 * =================================================
 *  0.0.1     2015/05/05    Cardin Andrea
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

var BarChartModel = require('../dataLayer/BarChartModel.js');

var ProgressiveID = require('../utils/ProgressiveID.js');
var NorrisError = require('../utils/NorrisError.js');
var colorManager = require('../utils/ColorManager.js');

var updater = require('./SocketController.js').sendUpdate;
var activeResourcesController = require('./ActiveResourcesController.js');
var dataConsistency = require('./DataConsistency.js');

/**
 * Description: this function prepares the template for the bar chart's options
 * @method buildTempl
 * @return Object
 */
var buildTempl = function() {
  var barOptions = { "series": []
                   , "orientation": ["vertical", "horizontal"]
                   , "grid": [true, false]
                   , "legend": [true, false]
                   , "legendPosition": ["right", "left", "top", "bottom"]
                   , "colors" : []
                   , "valueType": ["euro", "dollars", "pounds"]
                   , "decimals": 2
                   };
  return barOptions;
};

/**
 * Description: this function fills barOptions with default options
 * @method fillDefaultOpts
 * @param { Object } barOptions
 * @param { Number } seriesNum
 * @return void
 */
var fillDefaultOpts = function(barOptions, seriesNum) {
  var series = [];
  for(var i = 0; i<seriesNum; i++) {
    series.push("Serie "+(i+1));
  }
  barOptions.series = series;
  barOptions.orientation = "vertical";
  barOptions.grid = true;
  barOptions.legend = true;
  barOptions.legendPosition = "right";
  barOptions.colors = colorManager.colorGenerator(seriesNum);
  barOptions.valueType = null;
  barOptions.decimals = 2;
};

/**
 * Description: this function fills barOptions with the dev's options
 * @method fillDevOpts
 * @param { Object } barOptions
 * @param { Object } options
 * @param { Number } seriesNum
 * @return void
 */
var fillDevOpts = function(barOptions, options, seriesNum) {
  if(options.series != undefined) {
    dataConsistency.labelConsistency(options.series);
    if(options.series.length !== seriesNum)
     new NorrisError(4011);
    barOptions.series = options.series;
  }
  else {
    var series = [];
    for(var i = 0; i<seriesNum; i++) 
      series.push("Serie "+(i+1));
    barOptions.series = series;
  }
  if(options.orientation != undefined)
      barOptions.orientation = options.orientation; 
  else
    barOptions.orientation = "vertical";
  if(options.grid != undefined)
    barOptions.grid = options.grid;
  else
    barOptions.grid = true;
  if(options.legend != undefined)
    barOptions.legend = options.legend;
  else
    barOptions.legend = true;
  if(options.legendPosition != undefined)
    barOptions.legendPosition = options.legendPosition;
  else
    barOptions.legendPosition = "right";
  if(options.valueType != undefined)
    barOptions.valueType = options.valueType;
  else
    barOptions.valueType = null;
  if(options.decimals != undefined)
    barOptions.decimals = options.decimals;
  else
    barOptions.decimals = 2;
};

/**
 * Description: this function fills barOptions with the dev's color options
 * @method fillDevColorOpts
 * @param { Object } barOptions
 * @param { Object } options
 * @param { Number } seriesNum
 * @return void
 */
var fillDevColorOpts = function(barOptions, options, seriesNum) {
  if(options.colors != undefined){
    if(options.colors.length == seriesNum){
      var rgbColors = [];
      for(var i=0; i<options.colors.length; i++)
        rgbColors.push(colorManager.hexColorParse(options.colors[i]));
      barOptions.colors = rgbColors;
    }
    else
      new NorrisError(3006);
  }
  else
    barOptions.colors = colorManager.colorGenerator(seriesNum);
};

/**
 * Description: this method creates a bar chart with the specified parameters
 * @method createBarChart
 * @param { String } title
 * @param { String } xAxisName
 * @param { String } yAxisName
 * @param { Array } labels
 * @param { Array } data
 * @param { Object } options
 * @return Number
 */
exports.createBarChart = function(title, xAxisName, yAxisName, labels, data, options) {
  
    //Every graph is identified with a progressive ID code which is automatically generated
   var id = ProgressiveID();
    
   //Check default parameters
   if(title==null || typeof title !== "string") {new NorrisError(3000); }
   else if(xAxisName==null || typeof xAxisName !== "string") {new NorrisError(3001);}
   else if(yAxisName==null || typeof yAxisName !== "string") {new NorrisError(3002);}
   else if(!(labels instanceof Array)) {new NorrisError(3003);}
   else if(!(data instanceof Array)) {new NorrisError(3004);}
   else if(!(dataConsistency.seriesConsistency(labels, data))) {new NorrisError(3005);}
   else if(!dataConsistency.labelConsistency(labels)){new NorrisError(3007);}
   else {
     var barOptions = buildTempl();
     //check optional parameters 
     if(options===undefined) {
       fillDefaultOpts(barOptions, data.length);
     }
     else if(!dataConsistency.jsonConsistencyCheck(options, barOptions)) {
       new NorrisError(1001);
     }
     else {
       fillDevOpts(barOptions, options, data.length);
       fillDevColorOpts(barOptions, options, data.length);
     }
     var barChart = new BarChartModel(id, title, xAxisName, yAxisName, labels, data, barOptions);
     activeResourcesController.storeGraph(id, barChart);
     return id;
   }
};
  
/**
 * Description: this function returns graph's data and informations
 * @method getChartInfo
 * @param { Number } graphID
 * @return Object
 */
exports.getChartInfo = function(graphID) {
  var graph = activeResourcesController.retrieveGraph(graphID);
  var data = { "type": "BarChart"
             , "id": graph._id
             , "title": graph._title
             , "xAxisName": graph._xAxisName
             , "yAxisName": graph._yAxisName
             , "labels": graph._labels
             , "data": graph._data
             , "series": graph._series
             , "orientation": graph._orientation
             , "showGrid": graph._showGrid
             , "showLegend": graph._showLegend
             , "legendPosition": graph._legendPosition
             , "colors": graph._colors
             , "valueType": graph._valueType
             , "decimals": graph._decimals
             };
  return data;
};

/**
 * Description: this function allows to update a single value into data
 * @method updateInPlace
 * @param { Number } graphID
 * @param { String } label
 * @param { Number } set
 * @param { Number } newValue
 * @return void
 */
exports.updateInPlace = function(graphID, label, set, newValue) {
  var _barChartModel = activeResourcesController.retrieveGraph(graphID);
  if(set < _barChartModel._data.length && set >= 0) {
    var labelIndex = _barChartModel._labels.indexOf(label);
    if(labelIndex >-1){
      _barChartModel._data[set][labelIndex] = newValue;
      updater(_barChartModel._id,{type: "inPlace", label:labelIndex, set: set, data: newValue}); 
    }
    else {
      console.log("Warning: invalid label for BarChart inPlace update. \n Update rejected.");
    }
  }
  else {
    console.log("Warning: invalid data set for BarChart inPlace update. \n Update rejected.");
  }
};