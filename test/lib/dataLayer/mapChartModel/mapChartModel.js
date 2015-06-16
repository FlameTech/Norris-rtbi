/**
 * name : mapChartModel.js
 * Location : /norris/test/dataLayer/mapChartModel
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

var should = require('should');

var MapChartModel = require('../../../../lib/dataLayer/MapChartModel.js');

describe('TU82 - MapChartModel()', function() {
  
  it('Should execute correctly when called', function() {
    var options = { pathName: "path names"
                  , pathMode: "path mode"
		  , colors: "colors"
		  , zoom: "zoom"
                  , legend: "the legend"
                  , mapLegendPosition: "map mid"
                  };
    var mapChartModel = new MapChartModel(5, "map chart title", "paths", "points", "map center", options);
    should.exist(mapChartModel);
    mapChartModel._id.should.be.exactly(5);
    mapChartModel._title.should.be.exactly("map chart title");
    mapChartModel._points.should.be.exactly("points");
    mapChartModel._paths.should.be.exactly("paths");
    mapChartModel._center.should.be.exactly("map center");
    mapChartModel._pathName.should.be.exactly("path names");
    mapChartModel._pathMode.should.be.exactly("path mode");
    mapChartModel._legend.should.be.exactly("the legend");
    mapChartModel._mapLegendPosition.should.be.exactly("map mid");
    mapChartModel._colors.should.be.exactly("colors");
    mapChartModel._zoom.should.be.exactly("zoom");
  });
});