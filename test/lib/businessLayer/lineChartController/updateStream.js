/**
 * name : updateInPlace.js
 * Location : /norris/test/businessLayer/lineChartController
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
resourcesStub[2] = { _id: 2, _labels: [1,2], _data: [[3,4]], _labelsLimit: 5}; //normal test
resourcesStub[1] = { _id: 1, _labels: [1,2], _data: [[4,3]], _labelsLimit: 2}; // labelsLimit test
var updateCheck = undefined;

var stub = {
    './ActiveResourcesController.js' : { 
      retrieveGraph: function(id) { return resourcesStub[id]}
    },
    './SocketController.js': {
    sendUpdate: function(id, options) { updateCheck = {}; updateCheck.id = id; 
      updateCheck.options = options;
    }}
};

var lineChartController = proxyquire('../../../../lib/businessLayer/LineChartController.js', stub);
  
describe('TU11 - lineChartController.updateStream()', function() {
  
  it('Should fail when called with an invalid label parameter', function()
  {
    lineChartController.updateStream(2, 1, [5]); //Label 1 already exists
    should.not.exist(updateCheck);
  });
  
  it('Should fail when called with an invalid newValue length', function()
  {
    lineChartController.updateStream(2,3,[4,5]);
    should.not.exist(updateCheck);
  });
  
  it('Should execute correctly when called with valid parameters', function() {
    lineChartController.updateStream(2,3,[5]);
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(2);
    updateCheck.options.type.should.be.exactly("stream");
    updateCheck.options.label.should.be.exactly(3);
    updateCheck.options.data.should.containDeep([5]);
    resourcesStub[2]._data[0].should.containDeep([3,4,5]);
  });
  
  it('Should execute correctly when called with valid parameters exceeding labelsLimit', function() {
    lineChartController.updateStream(1, 3, [5]); 
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(1);
    updateCheck.options.type.should.be.exactly("stream");
    updateCheck.options.label.should.be.exactly(3);
    updateCheck.options.data.should.containDeep([5]);
    resourcesStub[1]._data[0].length.should.be.exactly(2);
    resourcesStub[1]._data[0].should.containDeep([3,5]);
  });
}); 