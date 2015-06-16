/**
 * name : createTable.js
 * Location : /norris/test/businessLayer/tableController
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/13     Cardin Andrea
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var proxyquire = require('proxyquire');
var should = require('should');

var storeCheck = undefined;
var modelStub = undefined;

var stub = {
  '../dataLayer/TableModel.js': function(id, title, headers, data, tableOptions) {
    modelStub = {};
    modelStub.id = id;
    modelStub.title = title;
    modelStub.headers = headers;
    modelStub.data = data;
    modelStub.tableOptions = tableOptions;
  },
  '../utils/ProgressiveID.js' : function() { return 1; },
  
  '../utils/ColorManager.js' : {
    colorGenerator: function(num) { return num; },
    hexColorParse: function(color) { return color; }
  },
  
  './DataConsistency.js' : {
    seriesConsistency: function(labels, data) { return labels.length === data.length ;},
    labelConsistency: function(labels) { return labels[0] !== labels[1]; },
    jsonConsistencyCheck: function(options, optionsTempl) { return optionsTempl.hasOwnProperty(Object.keys(options)[0]); },
    checkHex: function(opt) {},
    checkColors: function(obj) {},
    checkColorArray: function(obj, opt) {},
    checkColorMatrix: function(obj, opt) {},
    checkAllColors: function(obj, opt) {}
  },
  
  './ActiveResourcesController.js' : {
    retrieveGraph: function(id) {return resourcesStub[id];},
    storeGraph: function(id, graph) { 
      storeCheck = {};
      storeCheck.id = id;
      storeCheck.graph = graph;
    }
  },
  
  '../utils/NorrisError.js' : require('../dataConsistencyTest/NorrisErrorStub.js')
};

var tableController = proxyquire('../../../../lib/businessLayer/TableController.js', stub);

describe('TU5 - tableController.createTable()', function() {
  
  it('Should fail when called with no parameters - error 6000', function() {
    var check = true;
    try{
      tableController.createTable();
    } catch(e) {
      if(e === 6000)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with wrong title format - error 6000', function() {
    var check = true;
    try{
      tableController.createTable(2);
    } catch(e) {
      if(e === 6000)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid headers type - error 6001', function() {
    var check = true;
    try{
      tableController.createTable("valid title", "not an array");
    } catch(e) {
      if(e === 6001)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with empty headers array - error 6001', function() {
    var check = true;
    try{
      tableController.createTable("valid title", []);
    } catch(e) {
      if(e === 6001)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid data type - error 6002', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"]);
    } catch(e) {
      if(e === 6002)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent headers-data - error 6003', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["inconsistent", "data"]);
    } catch(e) {
      if(e === 6003)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent headers - error 6004', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["inconsistent header", "inconsistent header"], ["consistent", "data"]);
    } catch(e) {
      if(e === 6004)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent options - error 1001', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {inconsistent: "option"});
    } catch(e) {
      if(e === 1001)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent orderBy option (column<0)- error 1038', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {orderBy: {column: -1}});
    } catch(e) {
      if(e === 1038)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent orderBy option (column>=headers.length)- error 1038', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {orderBy: {column: 4}});
    } catch(e) {
      if(e === 1038)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent format option (column<0)- error 1039', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {format: [{column: -1}]});
    } catch(e) {
      if(e === 1039)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent format option (column>=headers.length)- error 1039', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {format: [{column: 5}]});
    } catch(e) {
      if(e === 1039)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent colorColumn option (<0)- error 1021', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {colorColumn: [[-1]]});
    } catch(e) {
      if(e === 1021)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent colorColumn option (>=headers.length)- error 1021', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {colorColumn: [[10]]});
    } catch(e) {
      if(e === 1021)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent colorRow option (<0)- error 1022', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {colorRow: [[-1]]});
    } catch(e) {
      if(e === 1022)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent colorRow option (>=headers.length)- error 1022', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {colorRow: [[10]]});
    } catch(e) {
      if(e === 1022)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent colorColumnFont option (<0)- error 1027', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {colorColumnFont: [[-1]]});
    } catch(e) {
      if(e === 1027)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent colorColumnFont option (>=headers.length)- error 1027', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {colorColumnFont: [[10]]});
    } catch(e) {
      if(e === 1027)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent colorRowFont option (<0)- error 1028', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {colorRowFont: [[-1]]});
    } catch(e) {
      if(e === 1028)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent colorRowFont option (>=data.length)- error 1028', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {colorRowFont: [[10]]});
    } catch(e) {
      if(e === 1028)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent colorFont option (row<0)- error 1023', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {colorFont: [[-1,0]]});
    } catch(e) {
      if(e === 1023)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent colorFont option (row>=data.length)- error 1023', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {colorFont: [[10,0]]});
    } catch(e) {
      if(e === 1023)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent colorFont option (column<0)- error 1023', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {colorFont: [[0,-1]]});
    } catch(e) {
      if(e === 1023)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent colorFont option (column>=header.length)- error 1023', function() {
    var check = true;
    try{
      tableController.createTable("valid title", ["valid header"], ["consistent data"], {colorFont: [[0,10]]});
    } catch(e) {
      if(e === 1023)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should execute correctly when called without options', function() {
    tableController.createTable("valid title", ["valid header"], ["consistent data"]);
    should.exist(storeCheck);
    should.exist(storeCheck.graph);
    storeCheck.id.should.be.exactly(1);
    should.exist(modelStub);
    modelStub.id.should.be.exactly(1);
    modelStub.title.should.be.exactly("valid title");
    modelStub.headers[0].should.be.exactly("valid header");
    modelStub.data[0].should.be.exactly("consistent data");
    should.exist(modelStub.tableOptions);
    modelStub.tableOptions.insertPosition.should.be.exactly("bottom");
    modelStub.tableOptions.orderBy.should.be.empty;
    modelStub.tableOptions.displayedLines.should.be.exactly(20);
    modelStub.tableOptions.border.should.be.exactly(true);
    modelStub.tableOptions.colorColumn.should.be.empty;
    modelStub.tableOptions.colorRow.should.be.empty;
    modelStub.tableOptions.colorCell.should.be.empty;
    modelStub.tableOptions.colorColumnFont.should.be.empty;
    modelStub.tableOptions.colorRowFont.should.be.empty;
    modelStub.tableOptions.colorFont.should.be.empty;
    modelStub.tableOptions.format.should.be.empty;
    modelStub.tableOptions.rowsLimit.should.be.exactly(300);
  });
  
  it('Should execute correctly when called with valid options', function() {
    tableController.createTable("title", ["header"], ["data"], {insertPosition: "top", displayedLines: 2, orderBy: {column: 0}, border: false, format: [{column:0}], colorColumn: [[0,"#ffffff"]], colorRow: [[0,"#ffffff"]], colorCell: [[0,0,"#ffffff"]], colorColumnFont:[[0,"#ffffff"]], colorRowFont: [[0,"#ffffff"]], colorFont: [[0,0,"#ffffff"]], rowsLimit:200});
    should.exist(storeCheck);
    should.exist(storeCheck.graph);
    storeCheck.id.should.be.exactly(1);
    should.exist(modelStub);
    modelStub.id.should.be.exactly(1);
    modelStub.title.should.be.exactly("title");
    modelStub.headers[0].should.be.exactly("header");
    modelStub.data[0].should.be.exactly("data");
    should.exist(modelStub.tableOptions);
    modelStub.tableOptions.insertPosition.should.be.exactly("top");
    modelStub.tableOptions.orderBy.should.not.be.empty;
    modelStub.tableOptions.displayedLines.should.be.exactly(2);
    modelStub.tableOptions.border.should.be.exactly(false);
    modelStub.tableOptions.colorColumn.should.not.be.empty;
    modelStub.tableOptions.colorRow.should.not.be.empty;
    modelStub.tableOptions.colorCell.should.not.be.empty;
    modelStub.tableOptions.colorColumnFont.should.not.be.empty;
    modelStub.tableOptions.colorRowFont.should.not.be.empty;
    modelStub.tableOptions.colorFont.should.not.be.empty;
    modelStub.tableOptions.format.should.not.be.empty;
    modelStub.tableOptions.rowsLimit.should.be.exactly(200);
  });
  
});

describe('TU16 - tableController.createTable()', function() {
  
  it('Should create a Table Chart with the correct _colorCell option', function() 
  {
    tableController.createTable("Title", ["column A", "column B"], [[1, 2], [3, 4]], {"colorCell" : [[0, 0, "#ffffff"], [0, 1, "#aaaaaa"], [1, 0, "#bbbbbb"], [1, 1, "#cccccc"]]});
    should.exist(storeCheck);
    should.exist(storeCheck.graph);
    storeCheck.id.should.be.exactly(1);
    should.exist(modelStub);
    modelStub.tableOptions.colorCell.length.should.be.exactly(2);
    modelStub.tableOptions.colorCell[0].length.should.be.exactly(2);
    modelStub.tableOptions.colorCell[1].length.should.be.exactly(2);
    modelStub.tableOptions.colorCell[0][0].should.be.exactly("#ffffff");
    modelStub.tableOptions.colorCell[0][1].should.be.exactly("#aaaaaa");
    modelStub.tableOptions.colorCell[1][0].should.be.exactly("#bbbbbb");
    modelStub.tableOptions.colorCell[1][1].should.be.exactly("#cccccc");
  }),
  
  it('Should fail when colorCell addresses a cell that does not exist', function() {
    var check = true;
    try{
      tableController.createTable("Title", ["column A", "column B"], [1, 2], {"colorCell" : [[0, 0, "#ffffff"], [0, 1, "#aaaaaa"], [50, 0, "#bbbbbb"]]});
    } catch(e) {
      if(e === 1024)
	check = false;
    }
    check.should.be.exactly(false);
  });
});