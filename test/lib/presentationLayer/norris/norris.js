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

var socketCheck = {};

var stub = {
  '../businessLayer/SocketController.js' : {
    setSocket : function(nsp) { socketCheck = nsp; }
  },
  './Page.js' : function() {this.type = "Page"},
  './LineChart.js': function() {this.type =  "Line Chart"},
  './BarChart.js': function() {this.type =  "Bar Chart"},
  './MapChart.js': function() {this.type =  "Map Chart"},
  './Table.js': function() {this.type =  "Table"},
  './PageRouter.js': function() {return "Page Router"},
};

var Norris = proxyquire('../../../../lib/presentationLayer/Norris.js', stub);

describe('TU43 - Norris()', function() {
  
  it('Should execute correctly when called', function() {
    var norris = Norris("socket namespace");
    socketCheck.should.be.exactly("socket namespace");
    should.exist(norris);
    new norris.Page().type.should.be.exactly("Page");
    new norris.LineChart().type.should.be.exactly("Line Chart");
    new norris.BarChart().type.should.be.exactly("Bar Chart");
    new norris.MapChart().type.should.be.exactly("Map Chart");
    new norris.Table().type.should.be.exactly("Table");
    norris.PageRouter().should.be.exactly("Page Router");
  });
});