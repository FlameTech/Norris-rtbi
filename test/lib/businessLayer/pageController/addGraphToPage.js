/**
 * Name : addGraphToPage.js 
 * Location : /norris/test/businessLayer/pageController
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/06      Cardin Andrea
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var resourcesPageStub = [];

var BarChart = require('./barChartStub.js');
var LineChart = require('./lineChartStub.js');
var MapChart = require('./mapChartStub.js');
var Table = require('./tableStub.js');

var stub = {
  './ActiveResourcesController.js' : { 
    retrievePage: function(pageID) { return resourcesPageStub[pageID];}
  },
    
  '../presentationLayer/BarChart.js' : BarChart,
  
  '../presentationLayer/LineChart.js' : LineChart,
  
  '../presentationLayer/MapChart.js' : MapChart,
  
  '../presentationLayer/Table.js' : Table,
  
  '../utils/NorrisError.js' : require('../dataConsistencyTest/NorrisErrorStub.js')
};

var pageController = proxyquire('../../../../lib/businessLayer/PageController.js', stub);

describe('TU9 - PageController.addGraphToPage()', function() {
  
  it('Should work correctly when a BarChart is given', function() {
    resourcesPageStub[1] = {_id: 1, _data: []};
    var barChart = new BarChart();
    var errCheck = false;
    try {
      pageController.addGraphToPage(1, barChart);
    }catch(err) {
      errCheck = true;
    }
    errCheck.should.be.false;
    resourcesPageStub[1]._data.should.containDeep([1]);
    resourcesPageStub[1]._data.should.containDeepOrdered([1]);
  }),
  
  it('Should work correctly when a LineChart is given', function() 
  {
    resourcesPageStub[1] = {_id: 1, _data: []};
    var lineChart = new LineChart();
    var errCheck = false;
    try {
      pageController.addGraphToPage(1, lineChart);
    }catch(err) {
      errCheck = true;
    }
    errCheck.should.be.false;
    resourcesPageStub[1]._data.should.containDeep([2]);
    resourcesPageStub[1]._data.should.containDeepOrdered([2]);
  }),
  
  it('Should work correctly when a MapChart is given', function() 
  {
    resourcesPageStub[1] = {_id: 1, _data: []};
    var mapChart = new MapChart();
    var errCheck = false;
    try {
      pageController.addGraphToPage(1, mapChart);
    }catch(err) {
      errCheck = true;
    }
    errCheck.should.be.false;
    resourcesPageStub[1]._data.should.containDeep([3]);
    resourcesPageStub[1]._data.should.containDeepOrdered([3]);
  }),
  
  it('Should work correctly when a Table is given', function() 
  {
    resourcesPageStub[1] = {_id: 1, _data: []};
    var table = new Table();
    var errCheck = false;
    try {
      pageController.addGraphToPage(1, table);
    }catch(err) {
      errCheck = true;
    }
    errCheck.should.be.false;
    resourcesPageStub[1]._data.should.containDeep([4]);
    resourcesPageStub[1]._data.should.containDeepOrdered([4]);
  }),
  
  it('Should insert graphs in the right order (push) when the function is called more than one time on the same page', function() 
  {
    resourcesPageStub[1] = {_id: 1, _data: []};
    var barChart = new BarChart();
    var lineChart = new LineChart();
    var mapChart = new MapChart();
    var table = new Table();
    var barChart2 = new BarChart();
    var errCheck = false;
    try {
      pageController.addGraphToPage(1, barChart);
      pageController.addGraphToPage(1, lineChart);
      pageController.addGraphToPage(1, mapChart);
      pageController.addGraphToPage(1, table);
      pageController.addGraphToPage(1, barChart);
    }catch(err) {
      errCheck = true;
    }
    errCheck.should.be.false;
    resourcesPageStub[1]._data.should.containDeep([1]);
    resourcesPageStub[1]._data.should.containDeep([2]);
    resourcesPageStub[1]._data.should.containDeep([3]);
    resourcesPageStub[1]._data.should.containDeep([4]);
    resourcesPageStub[1]._data.should.containDeepOrdered([1, 2, 3, 4, 1]);
  }),
  
  it('Should fail and throw the error \'2001\' when a graph is not given', function() 
  {
    resourcesPageStub[1] = {_id: 1, _data: []};
    var errCheck = false;
    var errCode = undefined;
    try {
      pageController.addGraphToPage(1);
    }catch(err) {
      errCheck = true;
      errCode = err;
    }
    errCheck.should.be.true;
    errCode.should.be.exactly(2001);
    resourcesPageStub[1]._data.should.be.empty;
  }),
  
  it('Should fail and throw the error \'2001\' when a non graph parameter is given', function() 
  {
    resourcesPageStub[1] = {_id: 1, _data: []};
    var obj = {id: 99};
    var errCheck = false;
    var errCode = undefined;
    try {
      pageController.addGraphToPage(1, obj);
    }catch(err) {
      errCheck = true;
      errCode = err;
    }
    errCheck.should.be.true;
    errCode.should.be.exactly(2001);
    resourcesPageStub[1]._data.should.be.empty;
  })
});