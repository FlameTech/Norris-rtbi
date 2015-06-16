/**
 * name : updateMovie.js
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
resourcesStub[2] = { _id: 2, _points: []};
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

describe('TU11 - mapChartController.updateMovie()', function() {
  
  it('Should fail when called with invalid points format - not array', function() {
    mapChartController.updateMovie(2, "these points are not valid");
    should.not.exist(updateCheck);
  });
  
  it('Should fail when called with invalid points format - malformed array', function() {
    mapChartController.updateMovie(2, ["these points are not valid"]);
    should.not.exist(updateCheck);
  });
  
  it('Should fail when called with invalid points format - duplicate point id', function() {
    mapChartController.updateMovie(2, [{id: "2", latitude:10, longitude:10},{id:2, latitude:30, longitude:20}]);
    should.not.exist(updateCheck);
  });
  
  it('Should fail when called with invalid points format - no longitude', function() {
    mapChartController.updateMovie(2, [{id: "2", latitude:10}]);
    should.not.exist(updateCheck);
  });
  
  it('Should fail when called with invalid points format - no latitude', function() {
    mapChartController.updateMovie(2, [{id: "2", longitude:10}]);
    should.not.exist(updateCheck);
  });
  
  it('Should execute correctly when called with valid parameters', function() {
    mapChartController.updateMovie(2, [{latitude:10, longitude: 10, id: "2"}]);
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(2);
    updateCheck.options.type.should.be.exactly("movie");
    updateCheck.options.newPoints[0].id.should.be.exactly("2"); 
    updateCheck.options.newPoints[0].latitude.should.be.exactly(10);
    updateCheck.options.newPoints[0].longitude.should.be.exactly(10);
    resourcesStub[2]._points[0].id.should.be.exactly("2");
    resourcesStub[2]._points[0].latitude.should.be.exactly(10);
    resourcesStub[2]._points[0].longitude.should.be.exactly(10);
  });
});