/**
 * name : storeGraph.js
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

var graphsStub = [];

var stub = {
  '../dataLayer/ActiveResources.js' : {
    graphs : graphsStub 
  },
  '../utils/NorrisError.js' : require('../dataConsistencyTest/NorrisErrorStub.js')
};

var activeResourcesController = proxyquire('../../../../lib/businessLayer/ActiveResourcesController.js', stub);

describe('TU47 - activeResourcesController.storeGraph()', function() {
  
  it('Should execute correctly when called', function() {
    should.not.exist(graphsStub[2]);
    activeResourcesController.storeGraph(2, "this is a graph");
    should.exist(graphsStub[2]);
    graphsStub[2].should.be.exactly("this is a graph");
  });
});
