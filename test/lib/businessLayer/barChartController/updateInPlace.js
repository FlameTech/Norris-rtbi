/**
 * name : updateInPlace.js
 * Location : /norris/test/businessLayer/barChartController
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
resourcesStub[2] = { _id: 2, _labels: [1,2], _data: [[3,4]] };
var updateCheck = undefined;

var stub = {
    './ActiveResourcesController.js' : { 
    
    retrieveGraph: function(id) { return resourcesStub[id]}
    },
    './SocketController.js': { 
    
    sendUpdate: function(id, options) { updateCheck = {}; updateCheck.id = id; 
      updateCheck.options = options; }}
};
  
var barChartController = proxyquire('../../../../lib/businessLayer/BarChartController.js', stub);

describe('TU11 - barChartController.updateInPlace()', function() {

  it('Should fail when called with an invalid label parameter', function() {
    barChartController.updateInPlace(2, 3, 0, 1);  //Label 3 doesn't exist
    should.not.exist(updateCheck);
  });
  
  it('Should fail when called with an invalid data set index parameter >= set.length', function() {
    barChartController.updateInPlace(2, 1, 2, 1);  //Set 2 doesn't exist
    should.not.exist(updateCheck);
  });
  
  it('Should fail when called with an invalid data set index parameter < 0', function() {
    barChartController.updateInPlace(2, 1, -1, 1);  //Set -1 doesn't exist
    should.not.exist(updateCheck);
  });
   
  it('Should execute correctly when called with valid parameters', function() {
    barChartController.updateInPlace(2, 1, 0, 1);  //Every parameter is valid
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(2);
    updateCheck.options.type.should.be.exactly("inPlace");
    updateCheck.options.label.should.be.exactly(0); //resourcesStub[2].indexOf(1)
    updateCheck.options.set.should.be.exactly(0); 
    updateCheck.options.data.should.be.exactly(1);
    resourcesStub[2]._data[0][0].should.be.exactly(1);
  });
});