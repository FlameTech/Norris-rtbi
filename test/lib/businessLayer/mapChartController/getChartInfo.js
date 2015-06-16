/**
 * name : getChartInfo.js
 * Module : Norris::Lib::BusinessLayer
 * Location : /norris/lib/test/mapChartController
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
    graph._points = [];
    graph._paths = [];
    graph._center = { "lat": 20.0
                    , "long": 20.0
                    };
    //Optional properties
    graph._pathName = ["serie1"];
    graph._pathMode = "driving";
    graph._colors = [{red: 1, green: 1, blue: 1}];
    graph._zoom = 10;
    graph._legend = true;
    graph._mapLegendPosition = "top-left";
    
    return graph;
    }
  }
};

var mapChartController = proxyquire('../../../../lib/businessLayer/MapChartController.js', stub);

describe('TU1 - mapChartController.getChartInfo()', function() {
  
  it('Should succed when return the correct chart', function() {
    var check = true;
    try{
     mapChartController.getChartInfo(2); 
    } catch(err) {
      if(err === 7000)
        check = false;
    }
    check.should.be.exactly(true);
  });
});