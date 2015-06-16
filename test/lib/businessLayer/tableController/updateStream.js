/**
 * name : updateStream.js
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

var resourcesStub = [];
resourcesStub[0] = { _id: 0, _title: "placeholder1", _headers: ["a", "b"], _data: [[1, 2]], _insertPosition: "bottom", _rowsLimit: "2", _colorColumn: [["#33CC33"]], _colorRow: [], _colorCell: [["#ffffff"], ["#ff00ff"]], _colorColumnFont: [["FF0000"]], _colorRowFont: [], _colorFont: [["#00ffff"],["#abffab"]], _colorHeaders: [], _colorHeadersFont: [] }; //placeholder table graph to test streamUpdate in position bottom
resourcesStub[1] = { _id: 1, _title: "placeholder2", _headers: ["c", "d"], _data: [[3, 4]], _insertPosition : "top", _rowsLimit: "2", _colorColumn: [["#33CC33"]], _colorRow: [], _colorCell: [["#ffffff"], ["#ff00ff"]], _colorColumnFont: [["FF0000"]], _colorRowFont: [], _colorFont: [["#00ffff"],["#abffab"]], _colorHeaders: [], _colorHeadersFont: [] }; //placeholder table graph to test streamUpdate in position top

var updateCheck;

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
    hexColorParse : function(color) {
      return true;
    }
  }
};

var tableController = proxyquire('../../../../lib/businessLayer/TableController.js', stub);

describe('TU14 - tableController.updateStream()', function() {
  
  it('Should fail when data is not an instance of Array', function() 
  {
    updateCheck = undefined;
    tableController.updateStream(0, 1);
    should.not.exist(updateCheck);
    resourcesStub[0]._data.length.should.be.exactly(1);
    tableController.updateStream(0, "StringIsNotArray");
    should.not.exist(updateCheck);
    resourcesStub[0]._data.length.should.be.exactly(1);
    tableController.updateStream(0, {});
    should.not.exist(updateCheck);
    resourcesStub[0]._data.length.should.be.exactly(1);
  }),
  
  it('Should insert the new (second) row at the end of the array without removing the first row because rowslimit is 2', function() 
  {
    updateCheck = undefined;
    tableController.updateStream(0, [42, 24]);
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(0);
    updateCheck.options.type.should.be.exactly("stream");
    updateCheck.options.insertPosition.should.be.exactly("bottom");
    updateCheck.options.data.should.containDeep([42, 24]);
    resourcesStub[0]._data.length.should.be.exactly(2);
    resourcesStub[0]._data.should.containDeepOrdered([[1, 2],[42, 24]]);
  });
  
  it('Should insert the new (third) row at the end of the array and remove the first row because rowslimit is 2', function()
  {
    updateCheck = undefined;
    tableController.updateStream(0, [100, 101]);
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(0);
    updateCheck.options.type.should.be.exactly("stream");
    updateCheck.options.insertPosition.should.be.exactly("bottom");
    updateCheck.options.data.should.containDeep([100, 101]);
    resourcesStub[0]._data.length.should.be.exactly(2);
    resourcesStub[0]._data.should.not.containDeep([1, 2]);
    resourcesStub[0]._data.should.containDeepOrdered([[42, 24], [100, 101]]);
  }),
  
  it('Should work correctly if the passed data.length is bigger than header.length (values passed are more than table\'s column)', function() 
  {
    updateCheck = undefined;
    tableController.updateStream(0, [110, 111, 112]);
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(0);
    updateCheck.options.type.should.be.exactly("stream");
    updateCheck.options.insertPosition.should.be.exactly("bottom");
    updateCheck.options.data.should.containDeep([110, 111]);
    updateCheck.options.data.should.not.containDeep([110, 111, 112]);
    resourcesStub[0]._data.should.containDeepOrdered([[100, 101], [110, 111]]);
    resourcesStub[0]._data.should.not.containDeep([110, 111, 112]);
  });
});

describe('TU15 - tableController.updateStream()', function() {
  
  it('Should fail when data is not an instance of Array', function() 
  {
    updateCheck = undefined;
    tableController.updateStream(1, 1);
    should.not.exist(updateCheck);
    resourcesStub[1]._data.length.should.be.exactly(1);
    tableController.updateStream(1, "StringIsNotArray");
    should.not.exist(updateCheck);
    resourcesStub[1]._data.length.should.be.exactly(1);
    tableController.updateStream(1, {});
    should.not.exist(updateCheck);
    resourcesStub[1]._data.length.should.be.exactly(1);
  }),
  
  it('Should insert the new (second) row at the beginning of the array without removing the last row because rowslimit is 2)', function() 
  {
    updateCheck = undefined;
    tableController.updateStream(1, [42, 24]);
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(1);
    updateCheck.options.type.should.be.exactly("stream");
    updateCheck.options.insertPosition.should.be.exactly("top");
    updateCheck.options.data.should.containDeep([42, 24]);
    resourcesStub[1]._data.length.should.be.exactly(2);
    resourcesStub[1]._data.should.containDeepOrdered([[42, 24], [3, 4]]);
  });
  
  it('Should insert the new (third) row at the beginning of the array and remove the last row because rowslimit is 2', function()
  {
    tableController.updateStream(1, [100, 101]);
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(1);
    updateCheck.options.type.should.be.exactly("stream");
    updateCheck.options.insertPosition.should.be.exactly("top");
    updateCheck.options.data.should.containDeep([100, 101]);
    resourcesStub[1]._data.length.should.be.exactly(2);
    resourcesStub[1]._data.should.not.containDeep([3, 4]);
    resourcesStub[1]._data.should.containDeepOrdered([[100, 101], [42, 24]]);
  }),
  
  it('Should work correctly if the passed data.length is bigger than header.length (values passed are more than table\'s column)', function() 
  {
    updateCheck = undefined;
    tableController.updateStream(1, [110, 111, 112]);
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(1);
    updateCheck.options.type.should.be.exactly("stream");
    updateCheck.options.insertPosition.should.be.exactly("top");
    updateCheck.options.data.should.containDeep([110, 111]);
    updateCheck.options.data.should.not.containDeep([110, 111, 112]);
    resourcesStub[1]._data.should.containDeepOrdered([[110, 111], [100, 101]]);
    resourcesStub[1]._data.should.not.containDeep([110, 111, 112]);
  });
});