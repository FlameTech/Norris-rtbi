/**
 * name : setOpts.js
 * Location : /norris/test/app/services/BarLineSvc/
 * 
 * History :
 * Version       Date           Programmer 
 * =================================================
 *  0.0.1     2015/05/13       Andrea Faggin
 * -------------------------------------------------
 *  Codifica modulo
 * =================================================
 */

'use strict';

describe('TU80 - BarLineSvc.setOpts()', function() {
  
  var BarLineSvc;
  
  var title = "test";
  var xAxisName = "testX";
  var yAxisName = "testY";
  var showGrid = true;
  var showLegend = true;
  var legendPosition = "left";
  var seriesCount = 3;
  var orientation = "vertical";
  
  beforeEach(angular.mock.module('Services'));
  
  beforeEach(function () {
    var colorsMock = {
        rgbToHex: function (r,g,b) {
            return "#FFFFFF";
        }
    };
    angular.mock.module(function ($provide) {
        $provide.value('ColorsSvc', colorsMock);
    });
  });
  
  beforeEach(inject(function (_BarLineSvc_) {
    BarLineSvc = _BarLineSvc_;  
  }));
  
  it('Should return options data', function () {
    var value = BarLineSvc.setOpts(title, xAxisName, yAxisName, showGrid, showLegend, legendPosition, seriesCount, orientation);
    expect(value).toBeDefined();
  });
  
  it('Should correctly set Title', function() {
    var value = BarLineSvc.setOpts(title, xAxisName, yAxisName, showGrid, showLegend, legendPosition, seriesCount, orientation);
    expect(value.title).toBe(title);
  });
  
  it('Should correctly set Axis names', function() {
    var value = BarLineSvc.setOpts(title, xAxisName, yAxisName, showGrid, showLegend, legendPosition, seriesCount, orientation);
    expect(value.hAxis.title).toBe(xAxisName);
    expect(value.vAxis.title).toBe(yAxisName);
  });
  
  it('Should correctly set grid status', function() {
    var value = BarLineSvc.setOpts(title, xAxisName, yAxisName, showGrid, showLegend, legendPosition, seriesCount, orientation);
    expect(value.hAxis.gridlines).toBeDefined();
    expect(value.vAxis.gridlines).toBeDefined();
    showGrid = false;
    var value = BarLineSvc.setOpts(title, xAxisName, yAxisName, showGrid, showLegend, legendPosition, seriesCount, orientation);
    expect(value.hAxis.gridlines.color).toBe("transparent");
    expect(value.vAxis.gridlines.color).toBe("transparent");
  });
  
  it('Should correctly set legend status', function() {
    var value = BarLineSvc.setOpts(title, xAxisName, yAxisName, showGrid, showLegend, legendPosition, seriesCount, orientation);
    expect(value.legend).toBeDefined();
    showLegend = false;
    var value = BarLineSvc.setOpts(title, xAxisName, yAxisName, showGrid, showLegend, legendPosition, seriesCount, orientation);
    expect(value.legend.position).toBe("none");
  });
  
  it('Should correctly set legend position', function() {
    showLegend = true;
    var value = BarLineSvc.setOpts(title, xAxisName, yAxisName, showGrid, showLegend, legendPosition, seriesCount, orientation);
    expect(value.legend.position).toBe(legendPosition);
    expect(value.series).toBeDefined();
  });
  
  it('Should not set left legend for horizontal BarChart', function() {
    showLegend = true;
    orientation = "horizontal";
    var value = BarLineSvc.setOpts(title, xAxisName, yAxisName, showGrid, showLegend, legendPosition, seriesCount, orientation);
    expect(value.legend.position).toBe(legendPosition);
    expect(value.series).toBeUndefined();
  });
  
  it('Should correctly set orientation', function() {
    showLegend = true;
    orientation = "vertical";
    var value = BarLineSvc.setOpts(title, xAxisName, yAxisName, showGrid, showLegend, legendPosition, seriesCount, orientation);
    expect(value.series).toBeDefined();
    expect(value.series[0].targetAxisIndex).toBe("1");
  });
});
