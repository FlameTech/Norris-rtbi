/**
 * Name : NorrisError.js 
 * Module : Norris::Lib::Utils
 * Location : /norris/lib/utils
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.3     2015/05/13    Meneguzzo Francesco
 * -------------------------------------------------
 *  Adeguamento modulo - throw new Error()
 * =================================================
 *  0.0.2     2015/05/12    Cardin Andrea
 * -------------------------------------------------
 *  Estensione modulo
 * =================================================
 *  0.0.1     2015/05/05    Faggin Andrea
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

/*
  ERROR CODES
  =================================================
  1xxx = General
  2xxx = ?????
  3xxx = profit
  =================================================
  1xxx = JSON Error
  2xxx = Page Error
  3xxx = Bar Chart Error
  4xxx = Line Chart Error
  5xxx = Map Chart Error
  6xxx = Table Error
  7xxx = Active Resources Error
  8xxx = Socket Controller Error
*/

var errorCode = { 1100: ["General Error", "Check EVERYTHING!"]
                , 1000: ["JSON Options Error", "You have tried to set a non existing option"]
                , 1001: ["JSON Options Error", "Warning : Invalid Json."]
                , 1002: ["JSON Options Error", "Orientation must be vertical or horizontal"]
                , 1003: ["JSON Options Error", "Options grid, legend and border value must be hidden or shown"]
                , 1004: ["JSON Options Error", "Options legendPosition value must be right, left, top, bottom"]
                , 1005: ["JSON Options Error", "Options mapLegendPosition value must be top-right, top-left, bottom-right, bottom-left"]
                , 1006: ["JSON Options Error", "Options zoom value must be between 0 and 19"]
                , 1007: ["JSON Options Error", "Order by error"]
                , 1008: ["JSON Options Error", "OrderBy.column option must be a number"]
                , 1009: ["JSON Options Error", "Order by type error"]
                , 1010: ["JSON Options Error", "Options.orderBy.order must be ascendent or descendet"]
                , 1011: ["JSON Options Error", "Options insertPosition must be top or bottom"]
                , 1012: ["JSON Options Error", "Options displayedLines value must be >= 1"]
                , 1013: ["JSON Options Error", "Option color must be an array of hex strings"]
                , 1014: ["JSON Options Error", "Label Consistency Error"]
                , 1015: ["JSON Options Error", "Options series must be an array"]
                , 1016: ["JSON Options Error", "Option colorColumn must be an array of this type: [ [colIndex, hexString], ... ]"]
                , 1017: ["JSON Options Error", "Option colorRow must be an array of this type: [ [rowIndex, hexString], ... ]"]
                , 1018: ["JSON Options Error", "Option colorCell must be an array of this type: [ [rowIndex, colIndex, hexString], ... ]"]
                , 1019: ["JSON Options Error", "Option colorFont must be an array of this type: [ [rowIndex, colIndex, hexString], ... ]"]
                , 1020: ["JSON Options Error", "Option colorCell in updateStream for Table must be an array of this type: [ [colIndex, {red: value, green: value, blue: value}], ... ]"]
                , 1021: ["JSON Options Error", "One or more index in option colorColumn doesn't match with any existing column"]
                , 1022: ["JSON Options Error", "One or more index in option colorRow doesn't match with any existing row"]
                , 1023: ["JSON Options Error", "One or more index in option colorFont doesn't match with any existing cell"]
                , 1024: ["JSON Options Error", "One or more index in option colorCell doesn't match with any existing cell"]
                , 1025: ["JSON Options Error", "One or more index in option colorHeaders doesn't match with any existing header"]
                , 1026: ["JSON Options Error", "One or more index in option colorHeadersFont doesn't match with any existing header"]
                , 1027: ["JSON Options Error", "One or more index in option colorColumnFont doesn't match with any existing column"]
                , 1028: ["JSON Options Error", "One or more index in option colorRowFont doesn't match with any existing row"]
                , 1029: ["JSON Options Error", "Option colorColumnFont must be an array of this type: [ [colIndex, hexString], ... ]"]
                , 1030: ["JSON Options Error", "Option colorRowFont must be an array of this type: [ [rowIndex, hexString], ... ]"]
                , 1031: ["JSON Options Error", "Color options must be given in hex string format"]
                , 1032: ["JSON Options Error", "Option valueType must be euro, pounds or dollars"]
                , 1033: ["JSON Options Error", "Option decimals is invalid"]
                , 1034: ["JSON Options Error", "Option format.column must be a number"]
                , 1035: ["JSON Options Error", "Option format must be an array of this type: [ {column: index, valueType: type, decimals: value}, ... ]"]
                , 1036: ["JSON Options Error", "Option labelsLimit must be a number greater than 0"]
                , 1037: ["JSON Options Error", "Option rowsLimit must be a number greater than 0"]
                , 1038: ["JSON Options Error", "One or more index in option orderBy doesn't match with any existing column"]
                , 1039: ["JSON Options Error", "One or more index in option format doesn't match with any existing column"]
                , 1040: ["Map Data Error", "Path route calculation mode invalid"]
                , 2000: ["Page Title Error", "Page must have a title"]
                , 2001: ["Page Unknown Error", "A graph is not a graph"]
                , 2002: ["Page Width Error", "Invalid value, must be a number greater than 800"]
                , 2003: ["Page Columns Error", "Invalid value, must be a number between 1 and 12"]
                , 2004: ["Page Options Error", "You have tried to set a non existing option"]
                , 3000: ["Bar Chart Title Error", "Bar Chart must have a title"]
                , 3001: ["Bar Chart Axis Error", "X axis must have a name"]
                , 3002: ["Bar Chart Axis Error", "Y axis must have a name"]
                , 3003: ["Bar Chart Label Error", "Labels parameter must be an array"]
                , 3004: ["Bar Chart Data Error", "Data parameter must be an array"]
                , 3005: ["Bar Chart Data Error", "Labels and data must have the same length"]
                , 3006: ["Bar Chart Data Error", "Colors length must have the same length of data"]
                , 3007: ["Bar Chart Data Error", "Label Consistency Error"]
                , 3008: ["Bar Chart Update Error", "Invalide update"]
                , 4000: ["Line Chart Title Error", "Line Chart must have a title"]
                , 4001: ["Line Chart Axis Error", "X axis must have a name"]
                , 4002: ["Line Chart Axis Error", "Y axis must have a name"]
                , 4003: ["Line Chart Label Error", "Labels parameter must be an array"]
                , 4004: ["Line Chart Data Error", "Data parameter must be an array"]
                , 4005: ["Line Chart Data Error", "Labels and data series must have the same length"]
                , 4006: ["Line Chart Data Error", "Colors array must have the same length of the data series array"]
                , 4007: ["Line Chart Data Error", "Label Consistency Error"]
                , 4008: ["Line Chart InPlace Update Error", "Data series does not exist"]
                , 4009: ["Line Chart Stream Update Error", "Missing data series"]
                , 4010: ["Line Chart Update Error", "New label already exists"]
                , 4011: ["Line Chart Data Error", "Series array must have the same length of the data series array"]
                , 5000: ["Map Chart Title Error", "Map Chart must have a title"]
                , 5001: ["Map Latitude Error", "Map Latitude Error. Value must be between -90 and 90"]
                , 5002: ["Map Longitude Error", "Map Longitude Error. Value must be between -180 and 180"]
                , 5003: ["Map Data Error", "Data must be an array"]
                , 5004: ["Map Data Error", "Colors length must have the same length of data"]
                , 5005: ["Map Movie Update Error", "Error in setting data: point already exists"]
                , 5006: ["Map Movie Update Error", "Error in setting data: point does not exist"]
                , 5007: ["Map Movie Update Error", "Error in data: must be an array of this type: [ {id: id, latitude: value, longitue: value}, ... ]"]
                , 5008: ["Map Data Error", "Number of path names does not match the paths"]
                , 6000: ["Table Title Error", "Table must have a title"]
                , 6001: ["Table Headers Error", "Headers must be an array, and can't be empty"]
                , 6002: ["Table Data Error", "Data must be an array"]
                , 6003: ["Table Data Error", "Headers and Data must have the same length of data"]
                , 6004: ["Table Data Error", "Label Consistency Error"]
                , 7000: ["Active Resources Data Error", "Active Resource Graph not found"]
                , 7001: ["Active Resources Page Error", "Active Resource Page not found"]
				        , 8000: ["Socket Controller Error", "Socket namespace not provided"]
				        , 8001: ["Socket Controller Error", "Parameter must be a socket namespace"]
                };


/**
 * Description: this function creates a NorrisError
 * @method NorrisError
 * @param {Number} err
 * @return void
 */
function NorrisError(err) {
  // Is it an Integer?
  if (err === parseInt(err)) {
    this.code = err;
    if (errorCode[err] === undefined) {
      this.title = "Unknown error";
      this.msg = "Code "+ err;
    } else {
      var error = errorCode[err];
      this.title = error[0];
      this.msg = error[1];
    }
  }
  else {
    this.code = '-1';
    this.title = "Unknown error";
    this.msg = err;
  }
  throw new Error(this.toString());
};


/**
 * Description: this function creates the NorrisError string 
 * @method toString
 * @return String 
 */
NorrisError.prototype.toString = function() {
  var str = "NorrisError -";
  str += " " + this.title;
  str += " [" + this.code + "]";
  if(this.msg != undefined){
    str += ": " + this.msg;
  }
  return str;
};

module.exports = NorrisError;