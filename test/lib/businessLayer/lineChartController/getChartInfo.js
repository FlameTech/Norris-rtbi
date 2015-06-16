/**
 * name : getChartInfo.js
 * Module : Norris::Lib::BusinessLayer
 * Location : /norris/lib/test/lineChartController
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
  './ActiveResourcesController.js': { retrieveGraph: function(graphID) { 
    graph = {};
    //Data model created by controller methods
    graph._id = graphID;
    graph._title = "test";
    graph._xAxisName = "xAxis";
    graph._yAxisName = "yAxis";
    graph._labels = ["x1"];
    graph._data = [10];
    //Optional properties
    graph._series = ["serie1"];
    graph._showGrid = true;
    graph._showLegend = true;
    graph._legendPosition = "left";
    graph._colors = [{red: 1, green: 1, blue: 1}];
    graph._valueType = null;
    graph._decimals = 2;  
    graph._labelsLimit = 300
    
    return graph;
    }
  }
};

var lineChartController = proxyquire('../../../../lib/businessLayer/LineChartController.js', stub);

describe('TU1 - lineChartController.getChartInfo()', function() {
  
  it('Should execute correctly when return the correct chart', function() {
    var check = true;
    try{
     lineChartController.getChartInfo(2); 
    } catch(err) {
      if(err === 7000)
        check = false;
    }
    check.should.be.exactly(true);
  });
});