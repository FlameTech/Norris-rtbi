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
  '../businessLayer/BarChartController.js': { getChartInfo: function(id){  
    return "bar chart n. " +id+ " info";
    },
    createBarChart: function(){
      return 1;
    }
  }
};

var barChart = proxyquire('../../../../lib/presentationLayer/BarChart.js', stub);

describe('TU1 - barChart.getChartInfo()', function() {
  
  it('Should execute correctly when called', function() {
    var graph = new barChart();
    graph.getChartInfo().should.be.exactly("bar chart n. 1 info");
  });  
});