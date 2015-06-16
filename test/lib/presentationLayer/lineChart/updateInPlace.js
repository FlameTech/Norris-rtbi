/**
 * name : updateInPlace.js
 * Location : /norris/test/presentationLayer/lineChart
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
  '../businessLayer/LineChartController.js': {
    updateInPlace: function(id, label, set, newValue) {
      updateCheck = {};
      updateCheck.id = id;
      updateCheck.label = label;
      updateCheck.set = set;
      updateCheck.newValue = newValue;
    },
    createLineChart: function() { return 2; }
  }
}

var lineChart = proxyquire('../../../../lib/presentationLayer/LineChart.js', stub);

describe('TU11 - lineChart.updateInPlace()', function() {
  
  it('Should execute correctly when called with any parameter', function() {
    var graph = new lineChart();
    graph.updateInPlace("label", "set", "newValue");
    should.exist(updateCheck);
    updateCheck.id.should.be.exactly(2);
    updateCheck.label.should.be.exactly("label");
    updateCheck.set.should.be.exactly("set");
    updateCheck.newValue.should.be.exactly("newValue");
  });
});