/**
 * Name : TableController.js 
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

var TableModel = require('../dataLayer/TableModel.js');

var ProgressiveID = require('../utils/ProgressiveID.js');
var NorrisError = require('../utils/NorrisError.js');
var colorManager = require('../utils/ColorManager.js');

var activeResourcesController = require('./ActiveResourcesController.js');
var dataConsistency = require('./DataConsistency.js');
var updater = require('./SocketController.js').sendUpdate;

/**
 * Description: this function prepares the template for the table's options
 * @method buildTempl
 * @return Object
 */
var buildTempl = function() {
  var tableOptions = { "insertPosition": ["top", "bottom"]
                     , "orderBy": { "column": 0
                                  , "order": ["ascending", "descending"]
                                  }
                     , "displayedLines": 20
                     , "border": [true, false]
                     , "colorColumn" : []
                     , "colorRow" : []
                     , "colorCell" : []
                     , "colorColumnFont" : []
                     , "colorRowFont" : []
                     , "colorFont" : []
                     , "format": []
                     , "rowsLimit": 300
                     };
  return tableOptions;
};

/**
 * Description: this function fills tableOptions with default options
 * @method fillDefaultOpts
 * @param { Object } tableOptions
 * @return void
 */
var fillDefaultOpts = function(tableOptions) {
  tableOptions.insertPosition = "bottom";
  tableOptions.orderBy = {};
  tableOptions.displayedLines = 20;
  tableOptions.border = true;
  tableOptions.colorColumn = [];
  tableOptions.colorRow = [];
  tableOptions.colorCell = [];
  tableOptions.colorColumnFont = [];
  tableOptions.colorRowFont = [];
  tableOptions.colorFont = [];
  tableOptions.format = [];
};

/**
 * Description: this function fills tableOptions with the dev's options
 * @method fillDevOpts
 * @param { Object } options
 * @param { Object } tableOptions
 * @param { Number } columns
 * @return void
 */
var fillDevOpts = function(options, tableOptions, columns) {
  if(options.insertPosition != undefined)
    tableOptions.insertPosition = options.insertPosition;
  else
    tableOptions.insertPosition = "bottom";
  if(options.orderBy != undefined) {
    if(options.orderBy.column < 0 || options.orderBy.column>columns)
      new NorrisError(1038);
    else
      tableOptions.orderBy = options.orderBy;
  }
  else
    tableOptions.orderBy = {};
  if(options.displayedLines != undefined)
    tableOptions.displayedLines = options.displayedLines;
  else
    tableOptions.displayedLines = 20;
  if(options.border != undefined)
    tableOptions.border = options.border;
  else
    tableOptions.border = true;
  if(options.format != undefined) {
    for(var i=0; i<options.format.length; i++) {
      if(options.format[i].column >= columns || options.format[i].column < 0)
        new NorrisError(1039);
    }
    tableOptions.format = options.format;
  }
  if(options.rowsLimit != undefined)
    tableOptions.rowsLimit = options.rowsLimit;
  else
    tableOptions.rowsLimit = 300;
};

/**
 * Description: this function fills tableOptions with default color options
 * @method fillDefaultColorOpts
 * @param { Object } tableOptions
 * @param { Number } rows
 * @param { Number } columns
 * @return void
 */
var fillDefaultColorOpts = function(tableOptions, rows, columns) {
  for(var i=0; i<rows; i++) {
    var fontColor = [];
    var cellColor = [];
    for(var j=0; j<columns; j++) {
      fontColor.push({"red": 0, "green": 0, "blue": 0});
      cellColor.push({"red": 255, "green": 255, "blue": 255});
    }
    tableOptions.colorFont.push(fontColor);
    tableOptions.colorCell.push(cellColor);
  }
  for(var i=0; i<columns; i++) {
    tableOptions.colorColumn.push({"red": 255, "green": 255, "blue": 255});
    tableOptions.colorColumnFont.push({"red": 0, "green": 0, "blue": 0});
  }
  for(var i=0; i<rows; i++) {
    tableOptions.colorRow.push({"red": 255, "green": 255, "blue": 255});
    tableOptions.colorRowFont.push({"red": 0, "green": 0, "blue": 0});
  }
};

/**
 * Description: this function fills tableOptions with the dev's cellBackGround color options
 * @method fillDevBgColorOpts
 * @param { Object } options
 * @param { Object } tableOptions
 * @param { Number } rows
 * @param { number } columns
 * @return void
 */
var fillDevBgColorOpts = function(options, tableOptions, rows, columns) {
  //colorColumn and colorRow are arrays of this type: [ [index, hexColor], ... ]
  if(options.colorColumn != undefined) {
    for(var i=0; i<options.colorColumn.length; i++) {
      if(options.colorColumn[i][0] >= columns || options.colorColumn[i][0] < 0)
        new NorrisError(1021);
      else {
        tableOptions.colorColumn[options.colorColumn[i][0]] = colorManager.hexColorParse(options.colorColumn[i][1]);
        for(var j=0; j<tableOptions.colorCell.length; j++)
          tableOptions.colorCell[j][options.colorColumn[i][0]] = colorManager.hexColorParse(options.colorColumn[i][1]);
      }
    }
  }
  if(options.colorRow != undefined) {
    for(var i=0; i<options.colorRow.length; i++) {
      if(options.colorRow[i][0] >= rows || options.colorRow[i][0] < 0)
        new NorrisError(1022);
      else {
        tableOptions.colorRow[options.colorRow[i][0]] = colorManager.hexColorParse(options.colorRow[i][1]);
        for(var j=0; j<tableOptions.colorCell[options.colorRow[i][0]].length; j++)
          tableOptions.colorCell[options.colorRow[i][0]][j] = colorManager.hexColorParse(options.colorRow[i][1]);
      }
    }
  }
  //colorCell is an array of this type: [ [rowIndex, colIndex, hexColor], ... ]
  if(options.colorCell != undefined) {
    for(var i=0; i<options.colorCell.length; i++) {
      if(options.colorCell[i][0] >= rows || options.colorCell[i][0] < 0 || options.colorCell[i][1] >= columns || options.colorCell[i][1] < 0)
        new NorrisError(1024);
      else
        tableOptions.colorCell[options.colorCell[i][0]][options.colorCell[i][1]] = colorManager.hexColorParse(options.colorCell[i][2]);
    }
  }
};

/**
 * Description: this function fills tableOptions with the dev's font color options
 * @method fillDevFontColorOpts
 * @param { Object } options
 * @param { Object } tableOptions
 * @param { Number } rows
 * @param { Number } columns
 * @return void
 */
var fillDevFontColorOpts = function(options, tableOptions, rows, columns) {
  //colorColumn and colorRow are arrays of this type: [ [index, hexColor], ... ]
  if(options.colorColumnFont != undefined) {
    for(var i=0; i<options.colorColumnFont.length; i++) {
      if(options.colorColumnFont[i][0] >= columns || options.colorColumnFont[i][0] < 0)
        new NorrisError(1027);
      else {
        tableOptions.colorColumnFont[options.colorColumnFont[i][0]] = colorManager.hexColorParse(options.colorColumnFont[i][1]);
        for(var j=0; j<tableOptions.colorFont.length; j++)
          tableOptions.colorFont[j][options.colorColumnFont[i][0]] = colorManager.hexColorParse(options.colorColumnFont[i][1]);
      }
    }
  }
  if(options.colorRowFont != undefined) {
    for(var i=0; i<options.colorRowFont.length; i++) {
      if(options.colorRowFont[i][0] >= rows || options.colorRowFont[i][0] < 0)
        new NorrisError(1028);
      else {
        tableOptions.colorRowFont[options.colorRowFont[i][0]] = colorManager.hexColorParse(options.colorRowFont[i][1]);
        for(var j=0; j<tableOptions.colorFont[options.colorRowFont[i][0]].length; j++)
          tableOptions.colorFont[options.colorRowFont[i][0]][j] = colorManager.hexColorParse(options.colorRowFont[i][1]);
      }
    }
  }
  //colorFont is an array of this type: [ [rowIndex, colIndex, hexColor], ... ]
  if(options.colorFont != undefined) {
    for(var i=0; i<options.colorFont.length; i++) {
      if(options.colorFont[i][0] >= rows || options.colorFont[i][0] < 0 || options.colorFont[i][1] >= columns || options.colorFont[i][1] < 0)
        new NorrisError(1023);
      else
        tableOptions.colorFont[options.colorFont[i][0]][options.colorFont[i][1]] = colorManager.hexColorParse(options.colorFont[i][2]);
    }
  }
};

/**
 * Description: this method creates a table with the specified parameters
 * @method createTable
 * @param { String } title
 * @param { Array } headers
 * @param { Array } data
 * @param { Object } options
 * @return Number
 */
exports.createTable = function (title, headers, data, options) {
  
    //Every graph is identified with a progressive ID code which is automatically generated
   var id = ProgressiveID();
    
   //Check default parameters
   var tableOptions = {};
   if(title==null || typeof title !== "string") {new NorrisError(6000);}
   else if(!(headers instanceof Array) || headers.length == 0) {new NorrisError(6001);}
   else if(!(data instanceof Array)) {new NorrisError(6002);}
   else if(!(dataConsistency.seriesConsistency(headers, data))) {new NorrisError(6003);}
   else if(!(dataConsistency.labelConsistency(headers))) {new NorrisError(6004);}
   else {
     tableOptions = buildTempl();
     
     //check optional parameters 
     if(options===undefined)
       fillDefaultOpts(tableOptions);
     else if(!dataConsistency.jsonConsistencyCheck(options, tableOptions))
       new NorrisError(1001);
     else {
       fillDevOpts(options, tableOptions, headers.length);
       fillDefaultColorOpts(tableOptions, data.length, headers.length);
       fillDevBgColorOpts(options, tableOptions, data.length, headers.length);
       fillDevFontColorOpts(options, tableOptions, data.length, headers.length);
     }
     var table = new TableModel(id, title, headers, data, tableOptions);
     activeResourcesController.storeGraph(id, table);
     return id;
   }
};

/**
 * Description:  this function return graph's data and informations
 * @method getChartInfo
 * @param { Number } graphID
 * @return Object
 */
exports.getChartInfo = function(graphID){
  var graph = activeResourcesController.retrieveGraph(graphID);
  var data = { "type": "Table"
             , "id": graph._id
             , "title": graph._title
             , "headers": graph._headers
             , "data": graph._data
             , "insertPosition" : graph._insertPosition
             , "orderBy": graph._orderBy
             , "displayedLines": graph._displayedLines
             , "showBorder": graph._showBorder
             , "colors": getColors(graphID, graph._data.length, graph._headers.length)
             , "format": graph._format
             , "rowsLimit": graph._rowsLimit
             };
  return data;
};

/**
 * Description: this function allows to update a single value into data
 * options can contain colorCell and colorFont, that are hex strings and they are optional
 * @method updateInPlace
 * @param { Number } graphID
 * @param { Number } row
 * @param { Number } column
 * @param { Object } newValue
 * @param { Object } options
 * @return void
 */
exports.updateInPlace = function(graphID, row, column, newValue, options) {
  var _tableModel = activeResourcesController.retrieveGraph(graphID);
  if(row > -1 && row < _tableModel._data.length) {
    if(column > -1 && column < _tableModel._data[row].length) {
      var optTempl = { "colorFont": ""
                     , "colorCell": ""
                     };
      if(options !== undefined) {
        if(!dataConsistency.inPlaceTableOptionsConsistency(options, optTempl))
          console.log("Warning: Options not applied. \n See previous log for detailed informations.");
        else {
          if(options.colorFont != undefined)
            _tableModel._colorFont[row][column] = colorManager.hexColorParse(options.colorFont);
          if(options.colorCell != undefined)
            _tableModel._colorCell[row][column] = colorManager.hexColorParse(options.colorCell);
        }
      }
      _tableModel._data[row][column] = newValue;
      updater(_tableModel._id,{type: "inPlace", row: row, column: column, data: newValue, colorFont: _tableModel._colorFont[row][column], colorCell: _tableModel._colorCell[row][column], border: _tableModel._showBorder});
    }
    else
      console.log("Norris Warning: Column index of the selected cell for in place update does not exist. \n Update rejected.");
  }
  else
    console.log("Norris Warning: Row index of the selected cell for in place update does not exist. \n Update rejected.");
};

/**
 * Description: this function fills the color arrays with the options specified by the dev
 * @method fillDevUpdateOpts
 * @param { Object } options
 * @param { Number } columns
 * @param { String } fontColor
 * @param { String } cellColor
 * @param { String } rowColor
 * @param { String } rowFontColor
 * @return void
 */
var fillDevUpdateOpts = function(options, columns, fontColor, cellColor, rowColor, rowFontColor) {
  if(options.colorRowFont != undefined) {
    rowFontColor = colorManager.hexColorParse(options.colorRowFont);
    for(var j = 0; j < columns; j++)
      fontColor[j] = colorManager.hexColorParse(options.colorRowFont);
  }
  if(options.colorRow != undefined) {
    rowColor = colorManager.hexColorParse(options.colorRow);
    for(var j = 0; j < columns; j++)
      cellColor[j] = colorManager.hexColorParse(options.colorRow);
  }
  if(options.colorFont != undefined) {
    for(var j = 0; j < options.colorFont.length; j++) {
      if(options.colorFont[j][0] >= columns || options.colorFont[j][0] < 0)
        console.log("Warning: Index " + options.colorFont[j][0] + " in option colorFont doesn't match with any existing cell. \n Color will not be applied.");
      else
        fontColor[options.colorFont[j][0]] = colorManager.hexColorParse(options.colorFont[j][1]);
    }
  }
  if(options.colorCell != undefined) {
    for(var j = 0; j < options.colorCell.length; j++) {
      if(options.colorCell[j][0] >= columns || options.colorCell[j][0] < 0)
        console.log("Warning: Index " + options.colorCell[j][0] + " in option colorCell doesn't match with any existing cell. \n Color will not be applied.");
      else
        cellColor[options.colorCell[j][0]] = colorManager.hexColorParse(options.colorCell[j][1]);
    }
  }
};

/**
 * Description: this function inserts the new data in the model
 * @method dataModelPush
 * @param { Table } _tableModel
 * @param { String } data
 * @param { String  } fontColor
 * @param { String } cellColor
 * @param { String } rowColor
 * @param { String } rowFontColor
 * @return void
 */
var dataModelPush = function(_tableModel, data, fontColor, cellColor, rowColor, rowFontColor) {
//dataModel push (adds as last row)
  if(_tableModel._insertPosition === "bottom") {
    _tableModel._data.push(data);
    _tableModel._colorFont.push(fontColor);
    _tableModel._colorCell.push(cellColor);
    _tableModel._colorRow.push(rowColor);
    _tableModel._colorRowFont.push(rowFontColor);
  }
  //dataModel unshift (adds as first row)
  else{
    _tableModel._data.unshift(data);
    _tableModel._colorFont.unshift(fontColor);
    _tableModel._colorCell.unshift(cellColor);
    _tableModel._colorRow.unshift(rowColor);
    _tableModel._colorRowFont.unshift(rowFontColor);
  }
};

/**
 * Description: this function constructs the colors array for the client
 * @method fillClientColors
 * @param { Table } _tableModel
 * @param { Number } columns
 * @return Array
 */
var fillClientColors = function(_tableModel, columns) {
  var colors = [];
  if(_tableModel._insertPosition === "bottom") {
    for(var j = 0; j < columns; j++)
      colors.push([ _tableModel._colorCell[(_tableModel._data.length)-1][j], _tableModel._colorFont[(_tableModel._data.length)-1][j] ]);
  }
  else {
    for(var j=0; j<columns; j++)
      colors.push([ _tableModel._colorCell[0][j], _tableModel._colorFont[0][j] ]);
  }
  return colors;
};

/**
 * Description: this function removes a row in the model
 * @method removeRow
 * @param { Table } _tableModel
 * @return void
 */
var removeRow = function(_tableModel) {
  if(_tableModel._insertPosition === "bottom") {
    _tableModel._data.shift();
    _tableModel._colorRow.shift();
    _tableModel._colorRowFont.shift();
    _tableModel._colorFont.shift();
    _tableModel._colorCell.shift();
  }
  else {
    _tableModel._data.pop();
    _tableModel._colorRow.pop();
    _tableModel._colorRowFont.pop();
    _tableModel._colorFont.pop();
    _tableModel._colorCell.pop();
  }
};

/**
 * Description: function for stream type updating
 * options can contain colorRowFont and colorRow, that are hex strings and they are optional
 * options can contain also colorFont and colorCell, that are array [ [cellIndex, #hexString], ... ] and they are optional
 * @method updateStream
 * @param { Number } graphID
 * @param { Array } data
 * @param { Object } options
 * @return void
 */
exports.updateStream = function (graphID, data, options) {
  var _tableModel = activeResourcesController.retrieveGraph(graphID);
  if(!(data instanceof Array))
    console.log("Warning: Second parameter of the table stream update must be the data array. \n Update rejected.");
  else {
    if(data.length > _tableModel._headers.length) {
      for(var i = _tableModel._headers.length; i < data.length; i++)
        data.pop();
    }
    var fontColor = [];
    var cellColor = [];
    var rowColor = {"red": 255, "green": 255, "blue": 255};
    var rowFontColor = {"red": 0, "green": 0, "blue": 0};
    for(var j=0; j<_tableModel._headers.length; j++) {
      fontColor.push(_tableModel._colorColumnFont[j]);
      cellColor.push(_tableModel._colorColumn[j]);
    }
    var optTempl = { "colorRow": ""
                   , "colorRowFont": ""
                   , "colorFont": []
                   , "colorCell": []
                   };
    if(options !== undefined) {
      if(!dataConsistency.streamTableOptionsConsistency(options, optTempl))
        console.log("Warning: Options not applied. \n See previous log for detailed informations.");
      else
        fillDevUpdateOpts(options, _tableModel._headers.length, fontColor, cellColor, rowColor, rowFontColor);
    }
    dataModelPush(_tableModel, data, fontColor, cellColor, rowColor, rowFontColor);
    //color array for client update
    var colors = fillClientColors(_tableModel, data.length);
    updater(_tableModel._id, { type: "stream"
                             , insertPosition: _tableModel._insertPosition
                             , data: data
                             , colors: colors
                             , border: _tableModel._showBorder
                             });
    // Too many rows after the update
    if(_tableModel._data.length > _tableModel._rowsLimit)
      removeRow(_tableModel);
  }
};

/**
 * Description: creates an array of colors [ [ [colorbg, colorfont], ... ], ... ]
 * @method getColors
 * @param { Number } graphID
 * @param { Number } rows
 * @param { Number } columns
 * @return Array
 */
var getColors = function(graphID, rows, columns) {
  var _tableModel = activeResourcesController.retrieveGraph(graphID);
  var colors = [];
  for(var i = 0; i < rows; i++) {
    var color = [];
    for(var j = 0; j < columns; j++)
      color.push([ _tableModel._colorCell[i][j], _tableModel._colorFont[i][j] ]);
    colors.push(color);
  }
  return colors;
};