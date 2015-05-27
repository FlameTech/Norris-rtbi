/**
 * name : LineChartController.js 
 * Module : Norris::Lib::BusinessLayer
 * Location : /norris/lib/businessLayer
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.2     2015/05/12    Sartor Michele
 * -------------------------------------------------
 *  Revisone modulo
 * =================================================
 *  0.0.1     2015/05/05    Sartor Michele
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */
'use strict';

var LineChartModel = require('../dataLayer/LineChartModel.js');

var ProgressiveID = require('../utils/ProgressiveID.js');
var NorrisError = require('../utils/NorrisError.js');
var colorManager = require('../utils/ColorManager.js');

var updater = require('./SocketController.js').sendUpdate;
var activeResourcesController = require('./ActiveResourcesController.js');
var dataConsistency = require('./DataConsistency.js');

/**
 * Description: this method create a bar chart with the specified parameters
 * @method createLineChart
 * @param { String } title
 * @param { String } xAxisName
 * @param { String } yAxisName
 * @param { Array } labels
 * @param { Array } data
 * @param { JSON } options
 * @return Number
 */
exports.createLineChart = function(title, xAxisName, yAxisName, labels, data, options) {
  
  //Every graph is identified with a progressive ID code which is automatically generated
  var id = ProgressiveID();
  
  //Check default parameters
  if(title==null || typeof title !== "string") {new NorrisError(4000);}
  else if(xAxisName==null || typeof xAxisName !== "string") {new NorrisError(4001);}
  else if(yAxisName==null || typeof yAxisName !== "string") {new NorrisError(4002);}
  else if(!(labels instanceof Array)) {new NorrisError(4003);}
  else if(!(data instanceof Array)) {new NorrisError(4004);}
  else if(!(dataConsistency.seriesConsistency(labels, data))){new NorrisError(4005);}
  else if(!(dataConsistency.labelConsistency(labels))){new NorrisError(4007);}
  else {
    var lineOptions = { "series": []
                      , "grid": [true, false]
                      , "legend": [true, false]
                      , "legendPosition": ["right", "left", "top", "bottom"]
                      , "colors": []
                      , "valueType": ["euro","dollars","pounds"]
                      , "decimals": 2
                      , "labelsLimit": 300
                      };
  //check optional parameters 
    if(options===undefined) {
      var series = [];
      for(var i = 0; i<data.length; i++)
        series.push("Serie "+(i+1));
      lineOptions.series = series;
      lineOptions.grid = true;
      lineOptions.legend = true;
      lineOptions.legendPosition = "right";
      lineOptions.colors = colorManager.colorGenerator(data.length);
      lineOptions.valueType = null;
      lineOptions.decimals = 2;
      lineOptions.labelsLimit = 300;
    }
    else if(!(dataConsistency.jsonConsistencyCheck(options, lineOptions))) {
      new NorrisError(1001);
    }
    else {
      if(options.series) {
        dataConsistency.labelConsistency(options.series);
        if(options.series.length !== data.length) 
          new NorrisError(4011);
        lineOptions.series = options.series;
      }
      else {
        var series = [];
        for(var i = 0; i<data.length; i++) 
          series.push("Serie "+(i+1));
        lineOptions.series = series;
      }
      if(options.grid != undefined)
        lineOptions.grid = options.grid;
      else
        lineOptions.grid = true;
      if(options.legend != undefined) 
        lineOptions.legend = options.legend;
      else
        lineOptions.legend = true;
      if(options.legendPosition != undefined) 
        lineOptions.legendPosition = options.legendPosition;
      else{
        lineOptions.legendPosition = "right";
      }
      if(options.colors != undefined){
        if(options.colors.length == data.length) {
          var rgbColors = [];
          for(var i=0; i<options.colors.length; i++)
            rgbColors.push(colorManager.hexColorParse(options.colors[i]));
          lineOptions.colors = rgbColors;
        }
        else
           new NorrisError(4006);
      }
      else
        lineOptions.colors = colorManager.colorGenerator(data.length);
      if(options.valueType != undefined)
        lineOptions.valueType = options.valueType;
      else
        lineOptions.valueType = null;
      if(options.decimals != undefined)
        lineOptions.decimals = options.decimals;
      else
        lineOptions.decimals = 2;
      if(options.labelsLimit != undefined)
        lineOptions.labelsLimit = options.labelsLimit;
      else
        lineOptions.labelsLimit = 300;
    }
    if(labels.length > lineOptions.labelsLimit) {
      var excess = labels.length-lineOptions.labelsLimit;
      labels.splice(0, excess);
      for(var i = 0; i< data.length; i++)
        data[i].splice(0, excess);
    }
    var lineChart = new LineChartModel(id, title, xAxisName, yAxisName, labels, data, lineOptions);
    activeResourcesController.storeGraph(id, lineChart);
    return id;
  }
};

/**
 * Description: this function return graph's data and information
 * @method getChartInfo
 * @param { Number } graphID
 * @return JSON
 */
exports.getChartInfo = function(graphID) {
  var graph = activeResourcesController.retrieveGraph(graphID);
  var data = { "type": "LineChart"
             , "id": graph._id
             , "title": graph._title
             , "xAxisName": graph._xAxisName
             , "yAxisName": graph._yAxisName
             , "labels": graph._labels
             , "data": graph._data
             , "series": graph._series
             , "showGrid": graph._showGrid
             , "showLegend": graph._showLegend
             , "legendPosition": graph._legendPosition
             , "colors": graph._colors
             , "valueType": graph._valueType
             , "decimals": graph._decimals
             , "labelsLimit": graph._labelsLimit
             };
  return data;
};

/**
 * Description: this function permit to update a single value into data
 * @method updateInPlace
 * @param { Number } graphID
 * @param { String } label
 * @param { Number } set
 * @param { Number } newValue
 * @return void
 */
exports.updateInPlace = function(graphID, label, set, newValue) {
  var _lineChartModel = activeResourcesController.retrieveGraph(graphID);
  if(set > _lineChartModel._data.length) {
    cosole.log("Warning: invalid data set for LineChart inPlace update. \n Update rejected.");
  }
  var labelIndex = _lineChartModel._labels.indexOf(label);
  if(labelIndex>-1){
    _lineChartModel._data[set][labelIndex] = newValue;
    updater(_lineChartModel._id,{type: "inPlace", label:labelIndex, set: set, data: newValue}); 
  }
  else {
    console.log("Warning: invalid label for LineChart inPlace update. \n Update rejected.");
  }
};

/**
 * Description: this function permit to insert a new value into data
 * @method updateStream
 * @param { Number } graphID
 * @param { String } newLabel
 * @param { Number } newValues
 * @return void
 */
exports.updateStream = function(graphID, newLabel, newValues) {
  var _lineChartModel = activeResourcesController.retrieveGraph(graphID);
  
  if(_lineChartModel._labels.indexOf(newLabel)===-1) {
    if(newValues.length === _lineChartModel._data.length) {
      _lineChartModel._labels.push(newLabel);
      for(var i = 0; i < newValues.length; i++)
        _lineChartModel._data[i].push(newValues[i]);

      updater(_lineChartModel._id,{type: "stream", label:newLabel, data: newValues}); 
      
      if(_lineChartModel._labels.length > _lineChartModel._labelsLimit) {
        _lineChartModel._labels.shift();
        for(var i = 0; i< _lineChartModel._data.length; i++) {
          _lineChartModel._data[i].shift();
        }
      }
    }
    else {
      console.log("Warning: invalid length of new values for LineChart stream update. \n Update rejected.");
    }      
  }
  else {
    console.log("Warning: label already existant for LineChart stream update. \n Update rejected.");
  }    
};
