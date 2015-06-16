/**
 * name : barChartModel.js
 * Location : /norris/test/dataLayer/barChartModel
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

var BarChartModel = require('../../../../lib/dataLayer/BarChartModel.js');

describe('TU81 - BarChartModel()', function() {
  
  it('Should execute correctly when called', function() {
    var options = { series: "series"
                  , orientation: "orientation"
                  , grid: "grid"
                  , legend: "the legend"
                  , legendPosition: "mid"
                  , colors: "colors"
		  , valueType: "value"
		  , decimals: "decimals"
                  };
    var barChartModel = new BarChartModel(5, "bar chart title", "xAxis name", "yAxis name", "labels", "data", options);
    should.exist(barChartModel);
    barChartModel._id.should.be.exactly(5);
    barChartModel._title.should.be.exactly("bar chart title");
    barChartModel._xAxisName.should.be.exactly("xAxis name");
    barChartModel._yAxisName.should.be.exactly("yAxis name");
    barChartModel._labels.should.be.exactly("labels");
    barChartModel._data.should.be.exactly("data");
    barChartModel._series.should.be.exactly("series");
    barChartModel._orientation.should.be.exactly("orientation");
    barChartModel._showGrid.should.be.exactly("grid");
    barChartModel._showLegend.should.be.exactly("the legend");
    barChartModel._legendPosition.should.be.exactly("mid");
    barChartModel._colors.should.be.exactly("colors");
    barChartModel._valueType.should.be.exactly("value");
    barChartModel._decimals.should.be.exactly("decimals");
  });
});