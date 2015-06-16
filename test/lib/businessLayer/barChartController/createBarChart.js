/**
 * name : createBarChart.js
 * Location : /norris/test/businessLayer/barChartController
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

var storeCheck = undefined;
var modelStub = undefined;

var stub = {
  '../dataLayer/BarChartModel.js': function(id, title, xAxisName, yAxisName, labels, data, barOptions) {
    modelStub = {};
    modelStub.id = id;
    modelStub.title = title;
    modelStub.xAxisName = xAxisName;
    modelStub.yAxisName = yAxisName;
    modelStub.labels = labels;
    modelStub.data = data;
    modelStub.barOptions = barOptions;
  },
  '../utils/ProgressiveID.js': function() { return 2; },
  '../utils/NorrisError.js': require('../dataConsistencyTest/NorrisErrorStub.js'),
  '../utils/ColorManager.js': { colorGenerator: function(num) { return num; },
    hexColorParse: function(color) {return color;}
  },
  './ActiveResourcesController.js': { storeGraph: function(id, graph) { storeCheck = {};
  storeCheck.id = id;
  storeCheck.graph = graph;
  }},
  './DataConsistency.js': { seriesConsistency: function(labels, data) { return labels.length === data.length ; },
  labelConsistency: function(labels) { return labels[0] !== labels[1]; },
  jsonConsistencyCheck: function(options, optionsTempl) { return optionsTempl.hasOwnProperty(Object.keys(options)[0]); }
  }
};

var barChartController = proxyquire('../../../../lib/businessLayer/BarChartController.js', stub);

describe('TU5 - barChartController.createBarChart()', function() {
  
  it('Should fail when called with no parameters - error 3000', function() {
    var check = true;
    try{
      barChartController.createBarChart();
    } catch(e) {
      if(e === 3000)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with wrong title format - error 3000', function() {
    var check = true;
    try{
      barChartController.createBarChart(2);
    } catch(e) {
      if(e === 3000)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with no xAxisName parameter - error 3001', function() {
    var check = true;
    try{
      barChartController.createBarChart("valid title");
    } catch(e) {
      if(e === 3001)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid xAxisName parameter - error 3001', function() {
    var check = true;
    try{
      barChartController.createBarChart("valid title", 0);
    } catch(e) {
      if(e === 3001)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with no yAxisName parameter - error 3002', function() {
    var check = true;
    try{
      barChartController.createBarChart("valid title", "valid xAxisName");
    } catch(e) {
      if(e === 3002)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid yAxisName parameter - error 3002', function() {
    var check = true;
    try{
      barChartController.createBarChart("valid title", "valid yAxisName");
    } catch(e) {
      if(e === 3002)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid labels type - error 3003', function() {
    var check = true;
    try{
      barChartController.createBarChart("valid title", "valid xAxisName", "valid yAxisName", "not an array");
    } catch(e) {
      if(e === 3003)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid data type - error 3004', function() {
    var check = true;
    try{
      barChartController.createBarChart("valid title", "valid xAxisName", "valid yAxisName", ["labels"], "not an array");
    } catch(e) {
      if(e === 3004)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent labels-data - error 3005', function() {
    var check = true;
    try{
      barChartController.createBarChart("valid title", "valid xAxisName", "valid yAxisName", ["labels"], ["inconsistent", "data"]);
    } catch(e) {
      if(e === 3005)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent labels - error 3007', function() {
    var check = true;
    try{
      barChartController.createBarChart("valid title", "valid xAxisName", "valid yAxisName", ["inconsistent label", "inconsistent label"], ["consistent", "data"]);
    } catch(e) {
      if(e === 3007)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent options - error 1001', function() {
    var check = true;
    try{
      barChartController.createBarChart("valid title", "valid xAxisName", "valid yAxisName", ["consistent label", "another consistent label"], ["consistent", "data"], {inconsistent: "option"});
    } catch(e) {
      if(e === 1001)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with an inconsistent color option - error 3006', function() {
    var check = true;
    try{
      barChartController.createBarChart("valid title", "valid xAxisName", "valid yAxisName", ["consistent label"], ["consistent data"], {series: ["first series"], colors: ["#ffffff","#ffffff"]});
    } catch(e) {
      if(e === 3006)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with an inconsistent series option - error 4011', function() {
    var check = true;
    try{
      barChartController.createBarChart("valid title", "valid xAxisName", "valid yAxisName", ["consistent label"], ["consistent data"], {series: ["first series", "second series?"]});
    } catch(e) {
      if(e === 4011)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should execute correctly when called without options', function() {
    barChartController.createBarChart("valid title", "valid xAxisName", "valid yAxisName", ["consistent label"], ["consistent data"]);
    should.exist(storeCheck);
    should.exist(storeCheck.graph);
    storeCheck.id.should.be.exactly(2);
    should.exist(modelStub);
    modelStub.id.should.be.exactly(2);
    modelStub.title.should.be.exactly("valid title");
    modelStub.xAxisName.should.be.exactly("valid xAxisName");
    modelStub.yAxisName.should.be.exactly("valid yAxisName");
    modelStub.labels[0].should.be.exactly("consistent label");
    modelStub.data[0].should.be.exactly("consistent data");
    should.exist(modelStub.barOptions);
    modelStub.barOptions.series[0].should.be.exactly("Serie 1");
    modelStub.barOptions.orientation.should.be.exactly("vertical");
    modelStub.barOptions.grid.should.be.exactly(true);
    modelStub.barOptions.legend.should.be.exactly(true);
    modelStub.barOptions.legendPosition.should.be.exactly("right");
    modelStub.barOptions.colors.should.be.exactly(1);
    should.equal(modelStub.barOptions.valueType, null);
    modelStub.barOptions.decimals.should.be.exactly(2);
  });
  
  it('Should execute correctly when called with valid options', function() {
    barChartController.createBarChart("valid title", "valid xAxisName", "valid yAxisName", ["consistent label"], ["consistent data"], {series: ["series name"], orientation: "horizontal", grid: false, legend: false, legendPosition: "left", valueType: "dollars", decimals: 0, colors: ["#ffffff"]});
    should.exist(storeCheck);
    should.exist(storeCheck.graph);
    storeCheck.id.should.be.exactly(2);
    should.exist(modelStub);
    modelStub.id.should.be.exactly(2);
    modelStub.title.should.be.exactly("valid title");
    modelStub.xAxisName.should.be.exactly("valid xAxisName");
    modelStub.yAxisName.should.be.exactly("valid yAxisName");
    modelStub.labels[0].should.be.exactly("consistent label");
    modelStub.data[0].should.be.exactly("consistent data");
    should.exist(modelStub.barOptions);
    modelStub.barOptions.series[0].should.be.exactly("series name");
    modelStub.barOptions.orientation.should.be.exactly("horizontal");
    modelStub.barOptions.grid.should.be.exactly(false);
    modelStub.barOptions.legend.should.be.exactly(false);
    modelStub.barOptions.legendPosition.should.be.exactly("left");
    modelStub.barOptions.colors[0].should.be.exactly("#ffffff");
    modelStub.barOptions.valueType.should.be.exactly("dollars");
    modelStub.barOptions.decimals.should.be.exactly(0);
  });
});