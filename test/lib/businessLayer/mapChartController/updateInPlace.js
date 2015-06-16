/**
 * name : updateInPlace.js
 * Location : /norris/test/businessLayer/mapChartController
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
resourcesStub[2] = { _id: 2, _points: [{id: "id", latitude:10, longitude:10}]};
var updateCheck = undefined;

var stub = {
    './ActiveResourcesController.js' : {
    retrieveGraph: function(id) { return resourcesStub[id]}
    },
    './SocketController.js': {
      sendUpdate: function(id, options) { updateCheck = {}; updateCheck.id = id; 
	updateCheck.options = options; }
    }
};
  
var mapChartController = proxyquire('../../../../lib/businessLayer/MapChartController.js', stub);

describe('TU11 - mapChartController.updateInPlace()', function() {
  
  it('Should fail when called with an invalid id', function() {
    mapChartController.updateInPlace(2, "invalid id", 15, 15);
    should.not.exist(updateCheck);
  });
  
  it('Should execute correctly when called with a valid id', function() {
    mapChartController.updateInPlace(2, "id", 15, 15);
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(2);
    updateCheck.options.type.should.be.exactly("inPlace");
    updateCheck.options.id.should.be.exactly("id"); 
    updateCheck.options.latitude.should.be.exactly(15);
    updateCheck.options.longitude.should.be.exactly(15);
    resourcesStub[2]._points[0].id.should.be.exactly("id");
    resourcesStub[2]._points[0].latitude.should.be.exactly(15);
    resourcesStub[2]._points[0].longitude.should.be.exactly(15);
  });
});