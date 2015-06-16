/**
 * name : createMapChart.js
 * Location : /norris/test/businessLayer/mapChartController
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
  '../dataLayer/MapChartModel.js': function(id, title, paths, points, center, mapOptions) {
    modelStub = {};
    modelStub.id = id;
    modelStub.title = title;
    modelStub.paths = paths;
    modelStub.points = points;
    modelStub.center = center;
    modelStub.mapOptions = mapOptions;
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
  './DataConsistency.js': { jsonConsistencyCheck: function(options, optionsTempl) { return optionsTempl.hasOwnProperty(Object.keys(options)[0]); }
  }
};

var mapChartController = proxyquire('../../../../lib/businessLayer/MapChartController.js', stub);

describe('TU5 - lineChartController.createLineChart()', function() {
  
  it('Should fail when called with no parameters - error 5000', function() {
    var check = true;
    try{
      mapChartController.createMapChart();
    } catch(e) {
      if(e === 5000)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with wrong title format - error 5000', function() {
    var check = true;
    try{
      mapChartController.createMapChart(2);
    } catch(e) {
      if(e === 5000)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with no paths parameter - error 5003', function() {
    var check = true;
    try{
      mapChartController.createMapChart("valid title");
    } catch(e) {
      if(e === 5003)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid paths parameter type - error 5003', function() {
    var check = true;
    try{
      mapChartController.createMapChart("valid title", "invalid paths");
    } catch(e) {
      if(e === 5003)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with no points parameter - error 5003', function() {
    var check = true;
    try{
      mapChartController.createMapChart("valid title", []);
    } catch(e) {
      if(e === 5003)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid points parameter type - error 5003', function() {
    var check = true;
    try{
      mapChartController.createMapChart("valid title", [], "invalid points");
    } catch(e) {
      if(e === 5003)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with no centerLatitude parameter - error 5001', function() {
    var check = true;
    try{
      mapChartController.createMapChart("valid title", [], []);
    } catch(e) {
      if(e === 5001)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid centerLatitude parameter (not a number) - error 5001', function() {
    var check = true;
    try{
      mapChartController.createMapChart("valid title", [], [], "invalid parameter");
    } catch(e) {
      if(e === 5001)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid centerLatitude parameter (>90) - error 5001', function() {
    var check = true;
    try{
      mapChartController.createMapChart("valid title", [], [], 100);
    } catch(e) {
      if(e === 5001)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid centerLatitude parameter (<-90) - error 5001', function() {
    var check = true;
    try{
      mapChartController.createMapChart("valid title", [], [], -100);
    } catch(e) {
      if(e === 5001)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with no centerLongitude parameter - error 5002', function() {
    var check = true;
    try{
      mapChartController.createMapChart("valid title", [], [], 45);
    } catch(e) {
      if(e === 5002)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid centerLongitude parameter (not a number) - error 5002', function() {
    var check = true;
    try{
      mapChartController.createMapChart("valid title", [], [], 45, "invalid parameter");
    } catch(e) {
      if(e === 5002)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid centerLongitude parameter (>180) - error 5002', function() {
    var check = true;
    try{
      mapChartController.createMapChart("valid title", [], [], 45, 200);
    } catch(e) {
      if(e === 5002)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with invalid centerLongitude parameter (<-180) - error 5002', function() {
    var check = true;
    try{
      mapChartController.createMapChart("valid title", [], [], 45, -200);
    } catch(e) {
      if(e === 5002)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent options - error 1001', function() {
    var check = true;
    try{
      mapChartController.createMapChart("valid title", [], [], 45, 90, {inconsistent: "option"});
    } catch(e) {
      if(e === 1001)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent color option - error 5004', function() {
    var check = true;
    try{
      mapChartController.createMapChart("valid title", [], [], 45, 90, {colors: ["#ffffff"]});
    } catch(e) {
      if(e === 5004)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should fail when called with inconsistent pathName option - error 5008', function() {
    var check = true;
    try{
      mapChartController.createMapChart("valid title", [], [], 45, 90, {pathName: ["there is no path"]});
    } catch(e) {
      if(e === 5008)
	check = false;
    }
    check.should.be.exactly(false);
  });
  
  it('Should execute correctly when called without options', function() {
    mapChartController.createMapChart("valid title", [[[10,10],[11,11]]], [{latitude:10, longitude:10, id: "id"}], 10, 15);
    should.exist(storeCheck);
    should.exist(storeCheck.graph);
    storeCheck.id.should.be.exactly(2);
    should.exist(modelStub);
    modelStub.id.should.be.exactly(2);
    modelStub.title.should.be.exactly("valid title");
    modelStub.center.lat.should.be.exactly(10);
    modelStub.center.long.should.be.exactly(15);
    modelStub.paths.length.should.be.exactly(1);
    modelStub.points[0].id.should.be.exactly("id");
    should.exist(modelStub.mapOptions);
    modelStub.mapOptions.pathName[0].should.be.exactly("Path 0");
    modelStub.mapOptions.zoom.should.be.exactly(4);
    modelStub.mapOptions.legend.should.be.exactly(true);
    modelStub.mapOptions.mapLegendPosition.should.be.exactly("top-right");
    modelStub.mapOptions.pathMode.should.be.exactly("driving");
  });
  
  it('Should execute correctly when called with valid options', function() {
    mapChartController.createMapChart("valid title", [[[10,10],[11,11]]], [{latitude:10, longitude:10, id: "id"}], 10, 15, { pathName:["first path"], zoom: 10, legend: false, mapLegendPosition: "top-left", pathMode: "transit"});
    should.exist(storeCheck);
    should.exist(storeCheck.graph);
    storeCheck.id.should.be.exactly(2);
    should.exist(modelStub);
    modelStub.id.should.be.exactly(2);
    modelStub.title.should.be.exactly("valid title");
    modelStub.center.lat.should.be.exactly(10);
    modelStub.center.long.should.be.exactly(15);
    modelStub.paths.length.should.be.exactly(1);
    modelStub.points[0].id.should.be.exactly("id");
    should.exist(modelStub.mapOptions);
    modelStub.mapOptions.pathName[0].should.be.exactly("first path");
    modelStub.mapOptions.zoom.should.be.exactly(10);
    modelStub.mapOptions.legend.should.be.exactly(false);
    modelStub.mapOptions.mapLegendPosition.should.be.exactly("top-left");
    modelStub.mapOptions.pathMode.should.be.exactly("transit");
  });
});