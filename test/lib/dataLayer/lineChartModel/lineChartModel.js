/**
 * name : lineChartModel.js
 * Location : /norris/test/dataLayer/lineChartModel
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

var LineChartModel = require('../../../../lib/dataLayer/LineChartModel.js');

describe('TU80 - LineChartModel()', function() {
  
  it('Should execute correctly when called', function() {
    var options = { series: "series"
                  , grid: "grid"
                  , legend: "the legend"
                  , legendPosition: "mid"
                  , colors: "colors"
		  , valueType: "value"
		  , decimals: "decimals"
		  , labelsLimit: "labels limit"
                  };
    var lineChartModel = new LineChartModel(5, "line chart title", "xAxis name", "yAxis name", "labels", "data", options);
    should.exist(lineChartModel);
    lineChartModel._id.should.be.exactly(5);
    lineChartModel._title.should.be.exactly("line chart title");
    lineChartModel._xAxisName.should.be.exactly("xAxis name");
    lineChartModel._yAxisName.should.be.exactly("yAxis name");
    lineChartModel._labels.should.be.exactly("labels");
    lineChartModel._data.should.be.exactly("data");
    lineChartModel._series.should.be.exactly("series");
    lineChartModel._showGrid.should.be.exactly("grid");
    lineChartModel._showLegend.should.be.exactly("the legend");
    lineChartModel._legendPosition.should.be.exactly("mid");
    lineChartModel._colors.should.be.exactly("colors");
    lineChartModel._valueType.should.be.exactly("value");
    lineChartModel._decimals.should.be.exactly("decimals");
    lineChartModel._labelsLimit.should.be.exactly("labels limit");
  });
});