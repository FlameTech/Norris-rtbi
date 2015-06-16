/**
 * name : getChartInfo.js
 * Module : Norris::Lib::PresentationLayer
 * Location : /norris/lib/test/mapChart
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
  '../businessLayer/MapChartController.js': { getChartInfo: function(id){  
    return "map Chart n. " +id+ " info";
    },
    createMapChart: function(){
      return 1;
    }
  }
};

var mapChart = proxyquire('../../../../lib/presentationLayer/MapChart.js', stub);

describe('TU1 - mapChart.getChartInfo()', function() {
  
 it('Should execute correctly when called', function() {
    var graph = new mapChart();
    graph.getChartInfo().should.be.exactly("map Chart n. 1 info");
  }); 
});