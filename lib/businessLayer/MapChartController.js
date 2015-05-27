/**
 * Name : MapChartController.js 
 * Module : Norris::Lib::BusinessLayer
 * Location : /norris/lib/businessLayer
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.2     2015/05/12      Sartor Michele
 * -------------------------------------------------
 *  Revisione modulo
 * =================================================
 *  0.0.1    2015/05/05       Faggin Andrea
 * -------------------------------------------------
 *  Codifica modulo modulo
 * =================================================
 */
'use strict';

var MapChartModel = require('../dataLayer/MapChartModel.js');

var ProgressiveID = require('../utils/ProgressiveID.js');
var NorrisError = require('../utils/NorrisError.js');
var colorManager = require('../utils/ColorManager.js');

var updater = require('./SocketController.js').sendUpdate;
var activeResourcesController = require('./ActiveResourcesController.js');
var dataConsistency = require('./DataConsistency.js');

/**
 * Description: this function create a map chart with the specified parameters
 * @method createMapChart
 * @param { String } title
 * @param { Array } paths
 * @param { Array } points
 * @param { Double } centerLatitude
 * @param { Double } centerLongitude
 * @param { JSON } options
 * @return  Object
 */
exports.createMapChart = function(title, paths, points, centerLatitude, centerLongitude, options) {
  //Every graph is identified with a progressive ID code which is automatically generated
  var id = ProgressiveID();
  //Check default parameters
  if(title == null || typeof title !== "string") //check if title is defined
    new NorrisError(5000);
  else if(centerLatitude == null || typeof centerLatitude !== "number" || centerLatitude<-90 || centerLatitude>90) //check latitude
    new NorrisError(5001);
  else if(centerLongitude == null || typeof centerLongitude !== "number" || centerLongitude<-180 || centerLongitude>180) //check longitude
    new NorrisError(5002);
  else if(!(paths instanceof Array)) //check paths data type
    new NorrisError(5003);
  else if(!(points instanceof Array))//check points data type
    new NorrisError(5003);
  else { //create JSON map center data
    var center = { "lat": centerLatitude
                 , "long": centerLongitude
                 };
    // create map options template
    var mapOptions = { "zoom": 0
                     , "legend": [true, false]
                     , "mapLegendPosition": ["top-right", "top-left", "bottom-right", "bottom-left"]
                     , "colors": []
                     , "pathName": []
                     , "pathMode": ["driving", "walking", "bicycling", "transit"]
                     };
   //optional parameters 
    if(options === undefined) {//default parameter setting
      mapOptions.zoom = 4;
      mapOptions.legend = true;
      mapOptions.mapLegendPosition = "top-right";
      if(paths != undefined)
        mapOptions.colors = colorManager.colorGenerator(paths.length);
    }
    else if(!dataConsistency.jsonConsistencyCheck(options, mapOptions)) // check optional parameter
      new NorrisError(1001);
    else {
      if(options.zoom != undefined) // zoom option setting
        mapOptions.zoom = options.zoom;
      else // zoom defualt option setting
        mapOptions.zoom = 4;
      if(options.legend != undefined) // legend option setting
        mapOptions.legend = options.legend;
      else // legend default option setting
        mapOptions.legend = true;
      if(options.mapLegendPosition != undefined) // legend position option setting
        mapOptions.mapLegendPosition = options.mapLegendPosition;
      else // legend position default option setting
        mapOptions.mapLegendPosition = "top-right";
      if(options.colors != undefined){ // path color option setting
        if(options.colors.length == paths.length) {
          var rgbColors = [];
          for(var i=0; i<options.colors.length; i++) {
            rgbColors.push(colorManager.hexColorParse(options.colors[i]));
          }
          mapOptions.colors = rgbColors;
        }
        else
          new NorrisError(5004);
      }
      else // path color default option setting
        mapOptions.colors = colorManager.colorGenerator(paths.length);
      if(options.pathName != undefined){ // path name option setting
        if(options.pathName.length != paths.length)
          new NorrisError(5008);
        else//CONTROLLIAMO SIA UN ARRAY DI STRINGHE
          mapOptions.pathName = options.pathName;
      }
      else{ // path name default option setting
        for(var i = 0; i < paths.length; i++){
          mapOptions.pathName.push("Path "+i); 
        }
      }
      if(options.pathMode != undefined)// path mode option setting
          mapOptions.pathMode= options.pathMode;
      else // path mode default option setting
          mapOptions.pathMode = "driving"; 
    }
    var mapChart = new MapChartModel(id, title, paths, points, center, mapOptions);
    activeResourcesController.storeGraph(id, mapChart);
    return id;
  }
};

//Method for getting graph type and properties
/**
 * Description: this function return graph's data and information
 * @method getChartInfo
 * @param { Object } graphID
 * @return JSON
 */
exports.getChartInfo = function(graphID) {
  var graph = activeResourcesController.retrieveGraph(graphID);
  //creating data to return
  var data = { "type": "MapChart"
             , "id": graph._id
             , "title": graph._title
             , "points": graph._points
             , "paths": graph._paths
             , "pathNames": graph._pathName
             , "pathMode": graph._pathMode
             , "center": graph._center
             , "colors": graph._colors
             , "zoom": graph._zoom
             , "showLegend": graph._legend
             , "mapLegendPosition": graph._mapLegendPosition
             };
  return data;
};

//Method for in place type updating
 /**
  * Description: this function permit to update a single marker coordinate
  * @method updateInPlace
  * @param { Object } graphID
  * @param { String } label
  * @param { Double } latitude
  * @param { Double } longitude
  * @return void
  */
 exports.updateInPlace = function(graphID, label, latitude, longitude) {
   var _mapChartModel = activeResourcesController.retrieveGraph(graphID);
   var j=-1;
   for(var i = 0; i < _mapChartModel._points.length && j == -1; i++) {
     if(_mapChartModel._points[i].id == label)
       j = i;
   }
   if(j != -1){    
     _mapChartModel._points[j].latitude = latitude;
     _mapChartModel._points[j].longitude = longitude;
     updater(_mapChartModel._id,{type: "inPlace" 
                                ,id: label
                                ,latitude: latitude
                                ,longitude: longitude}); 
   }
   else // point does not exist
     console.log("Warning: invalid point for MapChart inPlace update. \n Update rejected.");
};

//Method for in place type updating
/**
 * Description: this function permit to update all marker coordinate
 * @method updateMovie
 * @param { Object } graphID
 * @param { Array } newPoints
 * @return void
 */
exports.updateMovie = function(graphID, newPoints) {
  var _mapChartModel = activeResourcesController.retrieveGraph(graphID);
  //[{id="name", latitude=xValue, longitude=yValue},....]
  if(pointsConsistency(newPoints)) {
    _mapChartModel._points = newPoints;
    //Client update
    updater(_mapChartModel._id,{type: "movie", newPoints: newPoints});
  }
  else //Error in data: must be an array
    console.log("Warning: invalid newPoints format for MapChart inPlace update (must be Array). \n Update rejected.");
};

/**
 * Description: this function check if labels are not duplicated
 * @method pointsConsistency
 * @param { Array } points
 * @return Boolean
 */
var pointsConsistency = function(points){
  for(var i = 0; i < points.length; i++ ){
    if(points[i].id === undefined)
      return false;      
    else{
      for(var j = i+1; j < points.length; j++)
        if(points[i].id == points[j].id)
          return false; 
    }
    if(points[i].latitude === undefined)
      return false;
    if(points[i].longitude === undefined)
      return false;
  }
  return true;
};