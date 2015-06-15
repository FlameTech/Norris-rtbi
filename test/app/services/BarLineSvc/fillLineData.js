/**
 * name : fillLineData.js
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

describe('TU78 - BarLineSvc.fillLineData()', function() {
  
  var BarLineSvc; 
  
  var series = ["a","b"];
  var labels = ["1","2","3","4"];
  var inData = [[11, 12, 13, 14], [21, 22, 23, 24]];
  
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
  
  it('Should return LineChart data', function () {
    var value = BarLineSvc.fillLineData(series,labels,inData);
    expect(value).toBeDefined();
  });
  
  it('Data should be divided in series', function() {
    var value = BarLineSvc.fillLineData(series,labels,inData);
    expect(value[0][1]).toBe(series[0]);
    expect(value[0][2]).toBe(series[1]);
  });
  
  it('Should correctly assign labels', function () {
    var value = BarLineSvc.fillLineData(series,labels,inData);
    expect(value[1][0]).toEqual("1");
    expect(value[2][0]).toEqual("2");
  });

  it('Should correctly assign data', function () {
    var value = BarLineSvc.fillLineData(series,labels,inData);
    expect(value[1][1]).toEqual(11);
    expect(value[2][2]).toEqual(22);
  });
    
});
