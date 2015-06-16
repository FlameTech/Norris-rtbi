/**
 * name : addGraph.js
 * Location : /norris/test/presentationLayer/page
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/13       Cardin Andrea
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var should = require('should');
var proxyquire = require('proxyquire');

var containerStub = undefined;
var graphStub = undefined;

var stub = {
  '../businessLayer/PageController.js': {
    addGraphToPage: function(pageID, graph) {
      containerStub.id = pageID;
      containerStub.graph = graph;
    },
    createPage: function(title, options) { return 42;}
  }
};

var Page = proxyquire('../../../../lib/presentationLayer/Page.js', stub);

describe('TU9 - Page.addGraph()', function() {
  
  it('Should work correctly when a graph is passed', function() 
  {
    containerStub = {};
    var page = new Page();
    graphStub = {title: "stub"};
    page.addGraph(graphStub);
    should.exist(containerStub.id);
    containerStub.id.should.be.exactly(42);
    should.exist(containerStub.graph);
    should.exist(containerStub.graph.title);
    containerStub.graph.title.should.be.exactly("stub");
  }),
  
  it('Should work correctly when no graph is given', function() 
  {
    containerStub = {};
    var page = new Page();
    page.addGraph();
    should.exist(containerStub.id);
    containerStub.id.should.be.exactly(42);
    should.not.exist(containerStub.graph);
  });
});