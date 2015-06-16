/**
 * Name : getPageInfo.js 
 * Location : /norris/test/businessLayer/pageController
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/13      Meneguzzo Francesco
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var resourcesStub = [];
var resourcesPageStub = [];
resourcesPageStub[1] = { _id: 1
		       , _title: "title"
		       , _data: [0,1,2,3]
		       , _pageWidth: 1000
		       , _columns: 3
		       };
		      
//Checking all four cases
var BarChartModel = function(id) { this._id = id; };
var LineChartModel = function(id) { this._id = id; };
var MapChartModel = function(id) { this._id = id; };
var TableModel = function(id) { this._id = id; };

resourcesStub[0] = new BarChartModel(0);
resourcesStub[1] = new LineChartModel(1);
resourcesStub[2] = new MapChartModel(2);
resourcesStub[3] = new TableModel(3);

var getChartInfo = function(graphID) { return graphID; };

var Controller = { getChartInfo: getChartInfo };
		       
var stub = {
  './ActiveResourcesController.js' : { 
    retrievePage: function(pageID) { return resourcesPageStub[pageID];},
    retrieveGraph: function(graphID) { return resourcesStub[graphID];}
  },
    
  '../dataLayer/BarChartModel.js' : BarChartModel,
  
  '../dataLayer/LineChartModel.js' : LineChartModel,
  
  '../dataLayer/MapChartModel.js' : MapChartModel,
  
  '../dataLayer/TableModel.js' : TableModel,
  
  './BarChartController.js' : Controller, 
  
  './LineChartController.js' : Controller, 
  
  './MapChartController.js' : Controller, 
  
  './TableController.js' : Controller, 
  
  '../utils/NorrisError.js' : require('../dataConsistencyTest/NorrisErrorStub.js')
};

var pageController = proxyquire('../../../../lib/businessLayer/PageController.js', stub);

describe('TU1 - PageController.getPageInfo()', function() {
  
  it('Should execute correctly when called on a page containing valid graphs', function() {
    var pageInfo = pageController.getPageInfo(1);
    should.exist(pageInfo);
    pageInfo.type.should.be.exactly("Page");
    pageInfo.id.should.be.exactly(1);
    pageInfo.title.should.be.exactly("title");
    pageInfo.data.should.containDeepOrdered([0,1,2,3]);
    pageInfo.pageWidth.should.be.exactly(1000);
    pageInfo.columns.should.be.exactly(3);
  });
  
  it('Should fail when called on a page containing an invalid graph', function() {
    resourcesStub[4] = "not a graph";
    resourcesPageStub[1]._data.push(4); //Added the "graph" to the page
    var check = true;
    var pageInfo = undefined;
    try{
      pageInfo = pageController.getPageInfo(1);
    } catch (e) {
      if(e === 2001)
	check = false;
    }
    check.should.be.exactly(false);
    should.not.exist(pageInfo);
  });
});