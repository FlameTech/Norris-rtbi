/**
 * name : updateStream.js
 * Location : /norris/test/businessLayer/tableController
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/13     Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var proxyquire = require('proxyquire');
var should = require('should');

var resourcesStub = [];
resourcesStub[0] = { _id: 0, _title: "placeholder", _headers: ["a", "b"], _data: [[1, 2]], _insertPosition: "bottom", _rowsLimit: "2", _colorColumn: [["#33CC33"]], _colorRow: [], _colorCell: [["#ffffff", "#ff00ff"]], _colorColumnFont: [["FF0000"]], _colorRowFont: [], _colorFont: [["#00ffff", "#abffab"]], _colorHeaders: [], _colorHeadersFont: [] }; //placeholder table graph to test streamUpdate in position bottom

var updateCheck = undefined;

var stub = {
  './ActiveResourcesController.js' : {
    retrieveGraph: function(id) {return resourcesStub[id];}
  },
  './SocketController.js': {
    sendUpdate: function(id, options) {
      updateCheck = {}; 
      updateCheck.id = id;
      updateCheck.options = options;
    }
  },
  '../utils/ColorManager.js': {
    hexColorParse: function(color) {
      return true;
    }
  },
  './DataConsistency.js': {
    inPlaceTableOptionsConsistency: function(opts, template) {
      for(var opt in opts) {
	if(!template.hasOwnProperty(opt)){
	  console.log("Warning: Some property in options does not exist.");
	  return false;
	}
      }
      return true;
    }
  }
};

var tableController = proxyquire('../../../../lib/businessLayer/TableController.js', stub);

describe('TU11 - tableController.updateInPlace()', function() {
  
  it('Should fail when called with an invalid row index < 0', function() {
    tableController.updateInPlace(0, -1, 1, 1);
    should.not.exist(updateCheck);
  });
  
  it('Should fail when called with an invalid row index >= tableModel._data.length', function() {
    tableController.updateInPlace(0, 5, 1, 1);
    should.not.exist(updateCheck);    
  });
  
  it('Should fail when called with an invalid column index < 0', function() {
    tableController.updateInPlace(0, 0, -1, 1);
    should.not.exist(updateCheck);
  });
  
  it('Should fail when called with an invalid column index >= tableModel._data[row].length', function() {
    tableController.updateInPlace(0, 0, 5, 1);
    should.not.exist(updateCheck);
  });
  
  it('Should execute correctly when called with valid parameters and no options', function() {
    tableController.updateInPlace(0,0,0, 50);
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(0);
    updateCheck.options.type.should.be.exactly("inPlace");
    updateCheck.options.row.should.be.exactly(0);
    updateCheck.options.column.should.be.exactly(0);
    updateCheck.options.data.should.be.exactly(50);
    updateCheck.options.colorFont.should.be.exactly("#00ffff");
    updateCheck.options.colorCell.should.be.exactly("#ffffff");
    resourcesStub[0]._data[0][0].should.be.exactly(50);
  });
  
  it('Should execute correctly without changing any color when called with valid parameters and malformed options', function() {
    tableController.updateInPlace(0,0,0, 25, {property: "not valid"});
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(0);
    updateCheck.options.type.should.be.exactly("inPlace");
    updateCheck.options.row.should.be.exactly(0);
    updateCheck.options.column.should.be.exactly(0);
    updateCheck.options.data.should.be.exactly(25);
    updateCheck.options.colorFont.should.be.exactly("#00ffff");
    updateCheck.options.colorCell.should.be.exactly("#ffffff");
    resourcesStub[0]._data[0][0].should.be.exactly(25);
  });
  
  it('Should execute correctly and change colors when called with valid parameters and correct options', function() {
    tableController.updateInPlace(0,0,0, 40, {colorFont: "valid option", colorCell: "valid option"});
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(0);
    updateCheck.options.type.should.be.exactly("inPlace");
    updateCheck.options.row.should.be.exactly(0);
    updateCheck.options.column.should.be.exactly(0);
    updateCheck.options.data.should.be.exactly(40);
    updateCheck.options.colorFont.should.be.exactly(true);
    updateCheck.options.colorCell.should.be.exactly(true);
    resourcesStub[0]._data[0][0].should.be.exactly(40);
  });
});