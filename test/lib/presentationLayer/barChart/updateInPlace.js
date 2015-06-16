/**
 * name : updateInPlace.js
 * Location : /norris/test/presentationLayer/barChart
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

var updateCheck = undefined;

var stub = {
  '../businessLayer/BarChartController.js': {
    updateInPlace: function(id, label, set, newValue) {
      updateCheck = {};
      updateCheck.id = id;
      updateCheck.label = label;
      updateCheck.set = set;
      updateCheck.newValue = newValue;
    },
    createBarChart: function() { return 2; }
  }
}

var barChart = proxyquire('../../../../lib/presentationLayer/BarChart.js', stub);

describe('TU11 - barChart.updateInPlace()', function() {
  
  it('Should execute correctly when called with any parameter', function() {
    var graph = new barChart();
    graph.updateInPlace("label", "set", "newValue");
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(2);
    updateCheck.label.should.be.exactly("label");
    updateCheck.set.should.be.exactly("set");
    updateCheck.newValue.should.be.exactly("newValue");
  });
});