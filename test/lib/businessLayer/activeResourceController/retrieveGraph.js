/**
 * name : retrieveGraph.js
 * Location : /norris/test/businessLayer/activeResourcesController
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

var graphsStub = ["not undefined"];

var stub = {
  '../dataLayer/ActiveResources.js' : {
    graphs : graphsStub 
  },
  '../utils/NorrisError.js' : require('../dataConsistencyTest/NorrisErrorStub.js')
};

var activeResourcesController = proxyquire('../../../../lib/businessLayer/ActiveResourcesController.js', stub);

describe('TU42 - activeResourcesController.retrieveGraph()', function() {
  
  it('Should fail when called with a wrong ID', function() {
    var check = true;
    var graph = "undefined";
    try{
      graph = activeResourcesController.retrieveGraph(1);
    } catch (e) {
      if(e === 7000)
	check = false;
    }
    check.should.be.exactly(false);
    graph.should.be.exactly("undefined");
  });
  
  it('Should execute correctly when called with a correct ID', function() {
    var check = true;
    var graph = "not a graph yet";
    try{
      graph = activeResourcesController.retrieveGraph(0);
    } catch (e) {
      if(e === 7000)
	check = false;
    }
    check.should.be.exactly(true);
    graph.should.be.exactly("not undefined");
  });
  
});
