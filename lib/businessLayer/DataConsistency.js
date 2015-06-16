/**
 * Name : DataConsistency.js 
 * Module : Norris::Lib::Utils
 * Location : /norris/lib/utils
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.2     2015/05/13       Sartor Michele
 * -------------------------------------------------
 *  Estensione Modulo
 * =================================================
 *  0.0.1     2015/05/07       Sartor Michele
 * -------------------------------------------------
 *  Codifica Modulo
 * =================================================
 */

'use strict';

var NorrisError = require('../utils/NorrisError.js');

/**
 * Description: this method checks if the property opt is contained in the options template
 * @method checkTemplate
 * @param { String } opt
 * @param { Object } template
 * @return void
 */
var checkTemplate = function(opt, template) {
  if(!template.hasOwnProperty(opt)){
    new NorrisError(1000);
  }
};

/**
 * Description: this method checks if the orientation property has the correct form
 * @method checkOrientation
 * @param { String } obj
 * @return void
 */
var checkOrientation = function(obj) {
  if(obj != "vertical" && obj != "horizontal"){
    new NorrisError(1002);
  }
};

/**
 * Description: this method checks if the grid, legend or border properties have the correct form
 * @method checkPropertyShowing
 * @param { Boolean } obj
 * @return void
 */
var checkPropertyShowing = function(obj) {
  if(obj != true && obj != false){
    new NorrisError(1003);
  }
};

/**
 * Description: this method checks if the legend position for Line Charts and Bar Charts has the correct form
 * @method checkLegendPosition
 * @param { String } obj
 * @return void
 */
 var checkLegendPosition = function(obj) {
  if(obj != "right" && obj != "left" && obj != "top" && obj != "bottom"){
    new NorrisError(1004);
  }
};

/**
 * Description: this method checks if the legend position for Map Charts has the correct form
 * @method checkMapLegendPosition
 * @param { String } obj
 * @return void
 */
var checkMapLegendPosition = function(obj) {
  if(obj != "top-right" && obj != "top-left" && obj != "bottom-right" && obj != "bottom-left"){
    new NorrisError(1005);
  }
};

/**
 * Description: this method checks if the zoom level for Map Charts has the correct value
 * @method checkMapZoom
 * @param { Number } obj
 * @return void
 */
var checkMapZoom = function(obj) {
  if(obj < 0 || obj > 19){
    new NorrisError(1006);
  }
};

/**
 * Description: this method check if the pathMode value corresponds to the accepted ones
 * @method pathMode
 * @param { String } obj
 * @return void
 */
var pathMode = function(obj){
  if(obj != "driving" && obj != "walking" && obj != "bicycling" && obj != "transit")
    new NorrisError(1040);
}

/**
 * Description: this method checks if the orderBy property for Table has the correct form
 * @method checkOrderBy
 * @param { String } obj
 * @param { Object } template
 * @return void
 */
var checkOrderBy = function(obj, template) {
  //Column index must be defined
  if(obj.column === undefined) {
    new NorrisError(1008);
  }
  //Checks that nested properties are correct
  for(var nestedOpt in obj) {
    if(!template.orderBy.hasOwnProperty(nestedOpt)){
      new NorrisError(1007);
    }
    if(nestedOpt=="column") {
      if(typeof(obj[nestedOpt]) != "number"){
        new NorrisError(1008);
      }
    }
    else if(nestedOpt=="order") {
      if(obj[nestedOpt]!="ascending" && obj[nestedOpt]!="descending"){
        new NorrisError(1010);
      }
    }
  }
};

/**
 * Description: this method checks if the insertPosition property for Table has the correct form
 * @method checkInsertPosition
 * @param { String } obj
 * @return void
 */
var checkInsertPosition = function(obj) {
  if(obj!="top" && obj!="bottom"){
    new NorrisError(1011);
  }
};

/**
 * Description: this method checks if the displayedLines property for Table has the correct value
 * @method checkDisplayedLines
 * @param { Number } obj
 * @return void
 */
var checkDisplayedLines = function(obj) {
  if(obj<1){
    new NorrisError(1012);
  }
};

/**
 * Description: this method checks if the colors property has the correct hex form
 * @method checkColors
 * @param { Array } obj
 * @return void
 */
var checkColors = function(obj) {
  if(!(obj instanceof Array)) {
    new NorrisError(1013);
  }
  else {
    for(var i=0; i<obj.length; i++) {
      checkHex(obj[i]);
    }
  }
};

/**
 * Description: this method checks if the color property passed is a correct hex string
 * @method checkHex
 * @param { String } opt
 * @return void
 */
var checkHex = function(opt) {
if(typeof opt !== 'string') {
  new NorrisError(1031);
}
else {
  //checks if the string starts with the '#' character and assigns the correct regex
  var regex;
  if(opt.charAt(0) == "#") {
    regex = /^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
  }
  else {
    regex = /^([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
  }
  //executes the regex
  var result = regex.exec(opt);
  if(!result) {
    new NorrisError(1031);
  }
}
};

/**
 * Description: This method checks if the colorColumn, colorRow, colorColumnFont, colorRowFont properties
 *              for Table have the correct form
 * @method checkColorArray
 * @param { String } obj
 * @param { Object } opt
 * @return void
 */
var checkColorArray = function(obj, opt) {
  var nestedOpt = obj[opt];
  //Checks for nested properties
  if(nestedOpt instanceof Array) {
    for(var i=0; i<nestedOpt.length; i++) {
      if(!(typeof nestedOpt[i][0] == "number")) {
        if(opt == "colorColumn") {
          new NorrisError(1016);
        }
        else if(opt == "colorRow") {
          new NorrisError(1017);
        }
        else if(opt == "colorColumnFont") {
          new NorrisError(1029);
        }
        else if(opt == "colorRowFont") {
          new NorrisError(1030);
        }
      }
      checkHex(nestedOpt[i][1]);
    }
  }
  else {
    if(opt == "colorColumn") {
      new NorrisError(1016);
    }
    else if(opt == "colorRow") {
      new NorrisError(1017);
    }
    else if(opt == "colorColumnFont") {
      new NorrisError(1029);
    }
    else if(opt == "colorRowFont") {
      new NorrisError(1030);
    }
  }
};

/**
 * Description: this method checks if the colorFont and colorCell properties for Table have the correct form
 * @method checkColorMatrix
 * @param { String } obj
 * @param { Object } opt
 * @return void
 */
var checkColorMatrix = function(obj, opt) {
  var nestedOpt = obj[opt];
  //Checks for nested properties
  if(nestedOpt instanceof Array) {
    for(var i=0; i<nestedOpt.length; i++) {
      if(!(typeof nestedOpt[i][0] == "number") || !(typeof nestedOpt[i][1] == "number")) {
        if(opt == "colorFont") {
          new NorrisError(1019);
        }
        else if(opt == "colorCell") {
          new NorrisError(1018);
        }
      }
      checkHex(nestedOpt[i][2]);
    }
  }
  else {
    if(opt == "colorFont") {
      new NorrisError(1019);
    }
    else if(opt == "colorCell") {
      new NorrisError(1018);
    }
  }
};

/**
 * Description: this method checks if the series property has the correct type
 * @method checkSeries
 * @param { Array } obj
 * @return void
 */
var checkSeries = function(obj) {
  if(!(obj instanceof Array)) {
    new NorrisError(1015);
  }
};

/**
 * Description: this method checks if the valueType property for Line Charts and Bar Charts has the correct form
 * @method checkValueType
 * @param { String } obj
 * @return void
 */
var checkValueType = function(obj) {
  if(obj != "euro" && obj != "dollars" && obj != "pounds") {
    new NorrisError(1032);
  }
};

/**
 * Description: this method checks if the decimals property for Line Charts and Bar Charts has the correct form
 * @method checkDecimals
 * @param { Number } obj
 * @return void
 */
var checkDecimals = function(obj) {
  if(typeof(obj) != "number" || obj > 6 || obj < 0) {
    new NorrisError(1033);
  }
};

/**
 * Description: this method checks if the format property for Table has the correct form
 * @method checkTableFormat
 * @param { Object } obj
 * @return void
 */
var checkTableFormat = function(obj) {
  //Creates a format template
  var formatTemplate = { "column": 0
                       , "valueType": ""
                       , "decimals": 0                
                       };
  //Checks if the format property is an Array
  if(obj instanceof Array) {
    for(var i=0; i<obj.length; i++) {
      //Column must be defined for each format set
      if(obj[i].column === undefined || typeof obj[i].column !== "number") {
        new NorrisError(1034);
      }
      //Checks for nested properties of each format set
      for(var nestedOpt in obj[i]) {
        if(!(formatTemplate.hasOwnProperty(nestedOpt))) {
          new NorrisError(1000);
        }
        if(obj[i][nestedOpt] == "valueType") {
          if(obj[i][nestedOpt] != "euro" && obj[i][nestedOpt] == "dollars" && obj[i][nestedOpt] == "pounds") {
            new NorrisError(1032);
          }
        }
        else if(obj[i][nestedOpt] == "decimals") {
          if(typeof(obj[i][nestedOpt]) != "number" || obj[i][nestedOpt] > 6 || obj[i][nestedOpt] < 0) {
            new NorrisError(1033);
          }
        }
      }
    }
  }
  else {
    new NorrisError(1035);
  }
};

/**
 * Description: this method checks if the limit properties for Line Charts and Table have the correct value
 * @method checkBounds
 * @param { String } obj
 * @param { Object } opt
 * @return void
 */
var checkBounds = function(obj, opt) {
  if(typeof(obj[opt]) != "number" || obj[opt] <= 0) {
    if(opt == "labelsLimit") {
      new NorrisError(1036);
    }
    else {
      new NorrisError(1037);
    }
  }
};

/**
 * Description: this method calls the other methods that check the color options
 * @method checkAllColors
 * @param { String } obj
 * @param { Object} opt
 * @return void
 */
var checkAllColors = function(obj, opt) {
  if(opt=="colors"){
    checkColors(obj[opt]);
  }
  else if(opt=="colorColumn") {
    checkColorArray(obj, opt);
  }
  else if(opt=="colorRow") {
    checkColorArray(obj, opt);
  }
  else if(opt=="colorColumnFont") {
    checkColorArray(obj, opt);
  }
  else if(opt=="colorRowFont") {
    checkColorArray(obj, opt);
  }
  else if(opt=="colorFont") {
    checkColorMatrix(obj, opt);
  }
  else if(opt=="colorCell") {
    checkColorMatrix(obj, opt);
  }
};

/**
 * Description: this method checks if the charts options parameter has the correct form
 * @method jsonConsistencyCheck
 * @param { String } obj
 * @param { Object} template
 * @return Boolean
 */
exports.jsonConsistencyCheck = function(obj, template) {
  for(var opt in obj) {
    checkTemplate(opt, template);
    if(opt=="orientation") {
      checkOrientation(obj[opt]);
    }
    else if(opt=="grid" || opt=="legend" || opt=="border") {
      checkPropertyShowing(obj[opt]);
    }
    else if(opt=="legendPosition") {
      checkLegendPosition(obj[opt]);
    }
    else if(opt=="mapLegendPosition") {
      checkMapLegendPosition(obj[opt]);
    }
    else if(opt=="zoom") {
      checkMapZoom(obj[opt]);
    }
    else if(opt=="orderBy") {
      checkOrderBy(obj[opt], template);
    }
    else if(opt=="insertPosition") {
      checkInsertPosition(obj[opt]);
    }
    else if(opt=="displayedLines") {
      checkDisplayedLines(obj[opt]);
    }
    else if(opt=="series") {
      checkSeries(obj[opt]);
    }
    else if(opt=="valueType") {
      checkValueType(obj[opt]);
    }
    else if(opt=="decimals") {
      checkDecimals(obj[opt]);
    }
    else if(opt=="format") {
      checkTableFormat(obj[opt]);
    }
    else if(opt == "pathMode"){
      pathMode(obj[opt]);
    }
    else if(opt=="labelsLimit" || opt=="rowsLimit") {
      checkBounds(obj, opt);
    }
    else {
      checkAllColors(obj, opt);
    }
  }
  return true;
};

/**
 * Description: this method checks option parameter for inPlace update for Table
 * @method inPlaceTableOptionsConsistency
 * @param { Object } obj
 * @param { Object } template
 * @return Boolean
 */
exports.inPlaceTableOptionsConsistency = function(obj, template) {
  for(var opt in obj) {
    if(!template.hasOwnProperty(opt)){
      console.log("Warning: Some property in options does not exist.");
      return false;
    }
    if(opt == "colorFont" || opt == "colorCell") {
      if(typeof obj[opt] !== 'string') {
        console.log("Warning: Options color must be an hex string. \n Color not applied.");
        return false;
      }
      else {
        //checks if the string starts with the '#' character and assigns the correct regex
        var regex;
        if(obj[opt].charAt(0) == "#") {
          regex = /^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
        }
        else {
          regex = /^([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
        }
        //executes the regex
        var result = regex.exec(obj[opt]);
        if(!result) {
          console.log("Warning: Options color must be an hex string. \n Color not applied.");
          return false;
        }
      }
    }
  }
  return true;
};

/**
 * Description: this method checks if the string is an hex color
 * @method checkUpdateHex
 * @param { String } opt
 * @return Array
 */
var checkUpdateHex = function(opt) {
  //checks if the string starts with the '#' character and assigns the correct regex
  var regex;
  if(opt.charAt(0) == "#") {
    regex = /^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
  }
  else {
    regex = /^([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
  }
  //executes the regex
  var result = regex.exec(opt);
  return result;
};

/**
 * Description:  this method checks option parameter for stream update for Table
 * @method streamTableOptionsConsistency
 * @param { Object } obj
 * @param { Object } template
 * @return Boolean
 */
exports.streamTableOptionsConsistency = function(obj, template) {
  for(var opt in obj) {
    if(!template.hasOwnProperty(opt)){
      console.log("Warning: Some property in options does not exist.");
      return false;
    }
    if(opt == "colorRow" || opt == "colorRowFont") {
      if(typeof obj[opt] !== 'string') {
        console.log("Warning: Options color must be an hex string. \n Color not applied.");
        return false;
      }
      else {
        if(!(checkUpdateHex(obj[opt]))) {
          console.log("Warning: Options color must be an hex string. \n Color not applied.");
          return false;
        }
      }
    }
    else if(opt == "colorCell" || opt == "colorFont") {
      var nestedOpt = obj[opt];
      if(nestedOpt instanceof Array) {
        for(var i=0; i<nestedOpt.length; i++) {
          if(nestedOpt[i].length != 2 || !(typeof nestedOpt[i][0] == "number") || !(typeof nestedOpt[i][1] == "string")) {
            if(opt == "colorFont") {
              console.log("Warning: Option colorFont in updateStream for Table must be an array of this type: [ [colIndex, hexString], ... ]. /n Color not applied.");
            }
            else
              console.log("Warning: Option colorCell in updateStream for Table must be an array of this type: [ [colIndex, hexString], ... ]. /n Color not applied.");
            return false;
          }
          else {
            if(!(checkUpdateHex(nestedOpt[i][1]))) {
              console.log("Warning: Options color must be an hex string. \n Color not applied.");
              return false;
            }
          }
        }
      }
      else {
        if(opt == "colorFont") {
          console.log("Warning: Option colorFont in updateStream for Table must be an array of this type: [ [colIndex, hexString], ... ]. /n Color not applied.");
        }
        else
          console.log("Warning: Option colorCell in updateStream for Table must be an array of this type: [ [colIndex, hexString], ... ]. /n Color not applied.");
        return false;
      }
    }
  }
  return true;
};

/**
 * Description: this method checks if labels are consistent
 * @method labelConsistency
 * @param { Array } labels
 * @return Boolean
 */
exports.labelConsistency = function(labels) {
  for(var i = 0; i < labels.length; i++)
    for(var j = i+1; j < labels.length; j++)
      if(labels[i] == labels[j]){
        new NorrisError(1014);
      }
  return true;  
};

/**
 * Description: this method checks if labels length is consistent with series length
 * @method seriesConsistency
 * @param { Array } labels
 * @param { Array } series
 * @return Boolean
 */
exports.seriesConsistency = function(labels, series) {
  for(var i = 0; i < series.length; i++) {
    if(series[i].length !== labels.length) {
      return false;
    }
  }
  return true;
};