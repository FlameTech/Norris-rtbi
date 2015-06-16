/**
 * name : getChartInfo.js
 * Module : Norris::Lib::PresentationLayer
 * Location : /norris/lib/test/barChart
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/05    Sartor Michele
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var proxyquire = require('proxyquire');
var should = require('should');

var stub = {
  '../businessLayer/LineChartController.js': { getChartInfo: function(id){  
    return "line chart n. " +id+ " info";
    },
    createLineChart: function(){
      return 1;
    }
  }
};

var lineChart = proxyquire('../../../../lib/presentationLayer/LineChart.js', stub);

describe('TU1 - lineChart.getChartInfo()', function() {
  
 it('Should execute correctly when called', function() {
    var graph = new lineChart();
    graph.getChartInfo().should.be.exactly("line chart n. 1 info");
  }); 
});